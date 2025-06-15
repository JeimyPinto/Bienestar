// ==================== LIBRERÍAS ====================
const bcrypt = require("bcrypt");

// ==================== CONSTANTES ====================
const enabledRoles = require("../constants/roles.js");
const saltRounds = 10;

// ==================== MODELOS ====================
const db = require("../models/index.js");
const User = db.User;
const UserAudit = db.user_audit;

// ==================== HERRAMIENTAS / UTILIDADES ====================
const { sendUserCreatedMail, sendUserUpdatedMail } = require("../utils/sendMail.js");

// ==================== ESQUEMAS DE VALIDACIÓN ====================
const {
  userUpdateSelfSchema,
  adminUpdateUserSchema,
  adminCreateUserSchema
} = require("../schemas/user.js");

// ==================== CONTROLADORES DE ERROR ====================
const ErrorController = require("./error.js");

class UsuarioController {
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        include: [
          { association: "services" },
          { association: "requests" },
        ]
      });

      if (users.length === 0) {
        throw new ErrorController(
          404,
          "No hay usuarios registrados",
          { users: [] }
        );
      }

      res.status(200).json({
        message: "Usuarios obtenidos correctamente",
        users,
      });

    } catch (error) {
      if (error instanceof ErrorController) {
        return res.status(error.status).json({
          message: error.message,
          details: error.details,
        });
      }
      // Error de base de datos de Sequelize
      if (error.name === "SequelizeDatabaseError") {
        return res.status(500).json({
          message: "Error de base de datos",
          details: error.message,
        });
      }
      // Otros errores
      console.error(error);
      return res.status(500).json({
        message: "Error interno del servidor",
        details: null,
      });
    }
  }

  async getAllActive(req, res) {
    try {
      const users = await User.findAll({
        include: [
          { association: "services" },
          { association: "requests" },
        ],
        where: { status: "activo" },
      });
      if (users.length === 0) {
        throw new ErrorController(
          404,
          "No hay usuarios activos registrados"
          , { users: [] }
        );
      }
      // Excluir la contraseña de los usuarios al devolver los datos
      const usersWithoutPassword = users.map(user => {
        const { password, ...userWithoutPassword } = user.get({ plain: true });
        return userWithoutPassword;
      });
        res.status(200).json({
          message:
            "Usuarios activos obtenidos correctamente / Active users retrieved successfully",
          users: usersWithoutPassword,
        });
      } catch (error) {
      if (error instanceof ErrorController) {
        return res.status(error.status).json({
          message: error.message,
          details: error.details,
        });
      }
      // Error de base de datos de Sequelize
    if (error.name === "SequelizeDatabaseError") {
        return res.status(500).json({
          message: "Error de base de datos",
          details: error.message,
        });
      }
      // Otros errores
      console.error(error);
      return res.status(500).json({
        message: "Error interno del servidor",
        details: null,
      });
    }
  }

  async getAllPaginated(req, res) {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { rows: users, count: totalUsers } = await User.findAndCountAll({
          limit,
          offset,
          include: {
            association: "services",
            required: false,
          },
        });
        const totalPages = Math.ceil(totalUsers / limit);
        res.status(200).json({
          message:
            "Usuarios obtenidos correctamente / Users retrieved successfully",
          error: null,
          users: users,
          currentPage: page,
          totalPages,
          totalUsers,
        });
      } catch (error) {
        if (error instanceof ErrorController) {
        return res.status(error.status).json({
          message: error.message,
          details: error.details,
        });
      }
      // Error de base de datos de Sequelize
    if (error.name === "SequelizeDatabaseError") {
        return res.status(500).json({
          message: "Error de base de datos",
          details: error.message,
        });
      }
      // Otros errores
      console.error(error);
      return res.status(500).json({
        message: "Error interno del servidor",
        details: null,
      });
    }
  }

  async getById(req, res) {
      try {
        const user = await User.findByPk(req.params.id, {
          include: [
            {
              association: [
                "services",
                "requests",
              ],
              required: false, // Permite que el usuario se devuelva incluso si no tiene servicios o solicitudes
            },
          ],
        });
        if (!user) {
          return res.status(404).json({
            message: null,
            error: "Usuario no encontrado / User not found",
            user: null,
          });
        }
        res.status(200).json({
          message: "Usuario obtenido correctamente / User retrieved successfully",
          error: null,
          user,
        });
      } catch (error) {
        if (error instanceof ErrorController) {
          return res.status(error.status).json({
            message: error.message,
            details: error.details,
          });
        }
        // Error de base de datos de Sequelize
        if (error.name === "SequelizeDatabaseError") {
          return res.status(500).json({
            message: "Error de base de datos",
            details: error.message,
          });
        }
        // Otros errores
        console.error(error);
        return res.status(500).json({
          message: "Error interno del servidor",
          details: null,
        });
      }
    }

  async create(req, res) {
      try {
        const userData = await adminCreateUserSchema.parseAsync(req.body);
        // Si password está vacío o no viene, usar documentNumber como password
        const plainPassword = userData.password && userData.password.trim() !== ""
          ? userData.password
          : userData.documentNumber;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        const user = await User.create({
          firstName: userData.firstName,
          lastName: userData.lastName,
          documentType: userData.documentType,
          documentNumber: userData.documentNumber,
          phone: userData.phone,
          email: userData.email,
          password: hashedPassword,
          status: "activo",
          role: userData.role,
          image: null // temporalmente null, para manejar la imagen después
        });

        // Si se proporciona una imagen, usar FileController para manejar la carga
        if (req.file) {
          // Normaliza la ruta para que funcione en Windows y Linux
          const fullPath = req.file.path.replace(/\\/g, "/");
          const uploadIndex = fullPath.indexOf("uploads");
          if (uploadIndex !== -1) {
            user.image = fullPath.substring(uploadIndex);
          } else {
            user.image = req.file.filename;
          }
          await user.update({ image: user.image });
        }

        // Enviar correo de bienvenida
        let mailSent = false;
        try {
          await sendUserCreatedMail({
            to: user.email,
            firstName: user.firstName,
            documentNumber: user.documentNumber,
            password: plainPassword
          });
          mailSent = true;
        } catch (mailError) {
          console.warn("Usuario creado, pero error enviando correo:", mailError.message);
        }
        // Auditoría: registrar creación desde backend
        try {
          await UserAudit.create({
            user_id: user.id,
            action: 'INSERT',
            new_data: user.toJSON(),
            changed_by: req.user ? req.user.email : null
          });
        } catch (auditError) {
          console.warn('No se pudo registrar auditoría de creación:', auditError.message);
        }
        res.status(201).json({
          message: `Usuario creado correctamente / User created successfully${mailSent ? " (Se ha enviado una notificación al usuario con su cuenta creada / A notification has been sent to the user with their account details)" : ""}`,
          error: null,
          user,
        });
      } catch (error) {
        if (error instanceof ErrorController) {
          return res.status(error.status).json({
            message: error.message,
            details: error.details,
          });
        }
        // Error de base de datos de Sequelize
        if (error.name === "SequelizeDatabaseError") {
          return res.status(500).json({
            message: "Error de base de datos",
            details: error.message,
          });
        }
        // Errores de validación de Zod
        if (error.errors) {
          return res.status(400).json({
            message: null,
            error:
              "Error de validación / Validation error: " +
              error.errors
                .map((e) => `${e.path?.join(".")}: ${e.message}`)
                .join("; "),
            user: null,
          });
        }
        // Otros errores
        console.error(error);
        res.status(500).json({
          message: null,
          error:
            "Error al crear el usuario / Error creating user (" +
            error.message +
            ")",
          user: null,
        });
      }
    }


  async update(req, res) {
      try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({
            message: null,
            error: "Usuario no encontrado / User not found",
          });
        }
        let userData;
        let updateFields = {};
        let isAdmin = enabledRoles.includes(req.user.role);

        //Si es admin permite actualizar todos los campos, si no, solo permite actualizar algunos
        if (isAdmin) {
          userData = await adminUpdateUserSchema.parseAsync(req.body);
          updateFields = {
            ...userData,
          };
          //Si el usuario no proporciona una contraseña, se usa el número de documento como contraseña sino se deja la anterior encontrada
          if (userData.password) {
            updateFields.password = await bcrypt.hash(userData.password, saltRounds);
          } else {
            updateFields.password = user.password; // Mantiene la contraseña anterior 
          }
          if (userData.image !== undefined) updateFields.image = userData.image;
        } else {
          userData = await userUpdateSelfSchema.parseAsync(req.body);
          if (userData.phone !== undefined) updateFields.phone = userData.phone;
          if (userData.email !== undefined) updateFields.email = userData.email;
          if (userData.image !== undefined) updateFields.image = userData.image;
        }

        // Manejo de archivo si se subió uno nuevo
        if (req.file) {
          const fullPath = req.file.path.replace(/\\/g, "/");
          const uploadIndex = fullPath.indexOf("uploads");
          updateFields.image = uploadIndex !== -1
            ? fullPath.substring(uploadIndex)
            : req.file.filename;
        }

        const oldUserData = user.get({ plain: true });
        await user.update(updateFields);
        await sendUserUpdatedMail({
          to: user.email,
          firstName: user.firstName,
        });
        // Auditoría: registrar actualización desde backend
        try {
          await UserAudit.create({
            user_id: user.id,
            action: 'UPDATE',
            old_data: oldUserData,
            new_data: user.get({ plain: true }),
            changed_by: req.user ? req.user.email : null
          });
        } catch (auditError) {
          console.warn('No se pudo registrar auditoría de actualización:', auditError.message);
        }
        // Excluir la contraseña del usuario al devolver los datos
        const { password, ...userWithoutPassword } = user.get({ plain: true });

        res.status(200).json({
          message: `Usuario actualizado correctamente por ${req.user.firstName} ${req.user.lastName} / User updated successfully by ${req.user.firstName} ${req.user.lastName} `,
          error: null,
          user: userWithoutPassword,
        });
      } catch (error) {
        if (error instanceof ErrorController) {
          return res.status(error.status).json({
            message: error.message,
            details: error.details,
          });
        }
        // Error de base de datos de Sequelize
        if (error.name === "SequelizeDatabaseError") {
          return res.status(500).json({
            message: "Error de base de datos",
            details: error.message,
          });
        }
        // Errores de validación de Zod
        if (error.errors) {
          res.status(400).json({
            message: null,
            error:
              "Error de validación / Validation error: " +
              error.errors
                .map((e) => `${e.path?.join(".")}: ${e.message}`)
                .join("; "),
            user: null,
          });
        } else {
          // Otros errores
          console.error(error);
          res.status(500).json({
            message: null,
            error:
              "Error al actualizar el usuario / Error updating user (" +
              error.message +
              ")",
            user: null,
          });
        }
      }
    }
  }

module.exports = new UsuarioController();
