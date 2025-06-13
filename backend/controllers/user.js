const enabledRoles = require("../utils/enabledRoles.js");
const db = require("../models/index.js");
const bcrypt = require("bcrypt");
const User = db.User;
const { sendUserCreatedMail, sendUserUpdatedMail } = require("../utils/sendMail.js");
const {
  userUpdateSelfSchema,
  adminUpdateUserSchema, adminCreateUserSchema
} = require("../schemas/user.js");
const e = require("express");
const saltRounds = 10;

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
        return res.status(404).json({
          message: null,
          error: "No hay usuarios registrados / No users registered",
          users: [],
        });
      }
      res.status(200).json({
        message: "Usuarios obtenidos correctamente / Users retrieved successfully",
        error: null,
        users,
      });
    } catch (error) {
      return res.status(500).json({
        message: null,
        error: "Error al obtener los usuarios / Error retrieving users" + error.message,
        users: null,
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
        return res.status(404).json({
          message: null,
          error: "No hay usuarios activos / No active users found",
          users: null,
        });
      }
      res.status(200).json({
        message:
          "Usuarios activos obtenidos correctamente / Active users retrieved successfully",
        users: users,
        error: null,
      });
    } catch (error) {
      res.status(500).json({
        message: null,
        error: "Error al obtener los usuarios / Error retrieving users (" + error.message + ")",
        users: null,
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
      res.status(500).json({
        message: null,
        error: "Error al obtener los usuarios / Error retrieving users (" + error.message + ")",
        users: null,
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
      res.status(500).json({
        message: null,
        error: "Error al obtener el usuario / Error retrieving user (" + error.message + ")",
        user: null,
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
      res.status(201).json({
        message: `Usuario creado correctamente / User created successfully${mailSent ? " (Se ha enviado una notificación al usuario con su cuenta creada / A notification has been sent to the user with their account details)" : ""}`,
        error: null,
        user,
      });
    } catch (error) {
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
        }else {
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

      await user.update(updateFields);
      await sendUserUpdatedMail({
        to: user.email,
        firstName: user.firstName,
      });

      // Excluir la contraseña del usuario al devolver los datos
      const { password, ...userWithoutPassword } = user.get({ plain: true });

      res.status(200).json({
        message: `Usuario actualizado correctamente por ${req.user.firstName} ${req.user.lastName} / User updated successfully by ${req.user.firstName} ${req.user.lastName} `,
        error: null,
        user: userWithoutPassword,
      });
    } catch (error) {
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
