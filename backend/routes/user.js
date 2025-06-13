/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - status
 *         - role
 *         - image
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         documentType:
 *           type: string
 *         documentNumber:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         status:
 *           type: string
 *         role:
 *           type: string
 *         image:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         services:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Service'
 *         requests:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Request'
 *       example:
 *         id: 1
 *         firstName: John
 *         lastName: Doe
 *         documentType: CC
 *         documentNumber: "123456789"
 *         phone: "3001234567"
 *         email: example@gmail.com
 *         password: "$2b$10$hash"
 *         status: activo
 *         role: user
 *         image: "https://example.com/image.jpg"
 *         createdAt: "2023-01-01T00:00:00Z"
 *         updatedAt: "2023-01-01T00:00:00Z"
 */
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const { uploadUser } = require("../config/multer.js");
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Usuarios obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuarios obtenidos correctamente
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '404':
 *         description: No hay usuarios registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: No hay usuarios registrados
 *                 details:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items: {}
 *                   example:
 *                     users: []
 *       '400':
 *         description: Error de validación en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error de validación en los datos enviados
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["El campo email es requerido"]
 *       '500':
 *         description: Error interno del servidor o de base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *                 details:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.get("/", userController.getAll);
/**
 * @swagger
 * /users/active:
 *   get:
 *     summary: Obtener todos los usuarios activos
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Usuarios activos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuarios activos obtenidos correctamente
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserWithoutPassword'
 *       '404':
 *         description: No hay usuarios activos registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: null
 *                 details:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items: {}
 *                   example:
 *                     users: []
 *       '400':
 *         description: Error de validación en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error de validación en los datos enviados
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["El campo email es requerido"]
 *       '500':
 *         description: Error interno del servidor o de base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *                 details:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *
 * components:
 *   schemas:
 *     UserWithoutPassword:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         documentType:
 *           type: string
 *         documentNumber:
 *           type: string
 *         role:
 *           type: string
 *         status:
 *           type: string
 *         # ...otros campos que devuelvas, pero sin password
 */
router.get("/active", userController.getAllActive);

/**
 * @swagger
 * /users/paginated:
 *   get:
 *     summary: Obtiene usuarios paginados
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de usuarios por página
 *     responses:
 *       200:
 *         description: Lista paginada de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuarios obtenidos correctamente / Users retrieved successfully
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 totalUsers:
 *                   type: integer
 *                   example: 50
 *       500:
 *         description: Error del servidor al recuperar los usuarios paginados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Error al obtener los usuarios / Error retrieving users
 *                 users:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.get("/paginated", userController.getAllPaginated);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID, incluyendo sus servicios y solicitudes
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a consultar
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario obtenido correctamente / User retrieved successfully
 *                 error:
 *                   type: string
 *                   nullable: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado / User not found
 *                 user:
 *                   type: string
 *                   nullable: true
 *       500:
 *         description: Error del servidor al obtener el usuario
 */
router.get("/:id", userController.getById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - documentType
 *               - documentNumber
 *               - phone
 *               - email
 *               - role
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil del usuario (opcional)
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               documentType:
 *                 type: string
 *                 example: CC
 *               documentNumber:
 *                 type: string
 *                 example: "123456789"
 *               phone:
 *                 type: string
 *                 example: "3001234567"
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *                 description: Si se omite o está vacío, se usará el número de documento como contraseña
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario creado correctamente / User created successfully
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validación en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Error de validación / Validation error
 *                 user:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: Error interno al crear el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Error al crear el usuario / Error creating user
 *                 user:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.post("/", uploadUser.single("file"), userController.create);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil del usuario (opcional)
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               documentType:
 *                 type: string
 *               documentNumber:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: Si se envía, se actualizará la contraseña
 *               role:
 *                 type: string
 *                 description: Solo administradores pueden cambiar el rol
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario actualizado correctamente por admin / User updated successfully by admin
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validación en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Error de validación / Validation error
 *                 user:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado / User not found
 *       500:
 *         description: Error interno al actualizar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Error al actualizar el usuario / Error updating user
 *                 user:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.put("/:id", uploadUser.single("file"), userController.update);

module.exports = router;