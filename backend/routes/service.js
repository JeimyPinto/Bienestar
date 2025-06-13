/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - creatorId
 *         - area
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the service
 *           example: 1
 *         name:
 *           type: string
 *           description: Name of the service
 *           example: "Taller de Yoga"
 *         description:
 *           type: string
 *           description: Description of the service
 *           example: "Sesiones semanales de yoga para estudiantes"
 *         creatorId:
 *           type: integer
 *           description: ID of the user who created the service
 *           example: 2
 *         area:
 *           type: string
 *           enum:
 *             - Salud
 *             - Arte y Cultura
 *             - Deporte y Recreación
 *             - Apoyo Socioeconomico y Reconocimiento a la Excelencia
 *             - Apoyo Psicosocial
 *           description: Area to which the service belongs
 *           example: "Salud"
 *         image:
 *           type: string
 *           description: URL or path to the service image
 *           example: "/uploads/services/yoga.png"
 *         status:
 *           type: string
 *           enum:
 *             - activo
 *             - inactivo
 *           description: Current status of the service
 *           example: "activo"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the service was created
 *           example: "2024-06-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the service was last updated
 *           example: "2024-06-02T15:30:00Z"
 */
const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.js");
const authMiddleware = require("../middlewares/auth.js");
const { uploadService } = require("../config/multer.js");
/**
 * @swagger
 * /service:
 *   get:
 *     summary: Obtiene todos los servicios, incluyendo el usuario creador
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Servicios recuperados con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Services retrieved successfully / Servicios recuperados con éxito
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *       404:
 *         description: No se encontraron servicios
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
 *                   example: No services found / No se encontraron servicios
 *                 services:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Error de validación en la consulta
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
 *                   example: "Validation Error / Error de Validación ( ... )"
 *                 services:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: Error interno o de base de datos al recuperar servicios
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
 *                   example: Error retrieving services / Error al recuperar servicios ...
 *                 services:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.get("/", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), serviceController.getAll)
/**
 * @swagger
 * /service/active:
 *   get:
 *     summary: Obtiene todos los servicios activos, incluyendo el usuario creador
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Servicios activos recuperados con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Active services retrieved successfully / Servicios activos recuperados con éxito
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *       404:
 *         description: No se encontraron servicios activos
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
 *                   example: No se encontraron servicios activos / No active services found
 *                 services:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Error de validación en la consulta
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
 *                   example: Validation Error / Error de Validación...
 *                 services:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: Error interno o de base de datos al recuperar servicios activos
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
 *                   example: Error retrieving active services / Error al recuperar servicios activos
 *                 services:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.get("/active", serviceController.getAllActive);
/**
 * @swagger
 * /service/{id}:
 *   get:
 *     summary: Obtiene un servicio por ID, incluyendo el usuario creador
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio a consultar
 *     responses:
 *       200:
 *         description: Servicio recuperado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service retrieved successfully / Servicio recuperado con éxito
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 service:
 *                   $ref: '#/components/schemas/Service'
 *       404:
 *         description: Servicio no encontrado
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
 *                   example: Service not found / Servicio no encontrado
 *                 service:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: Error interno al recuperar el servicio
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
 *                   example: Error retrieving service / Error al recuperar servicio (...)
 *                 service:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.get("/:id", authMiddleware.authorizeRole(), serviceController.getById);
/**
 * @swagger
 * /service:
 *   post:
 *     summary: Crea un nuevo servicio
 *     tags: [Service]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - creatorId
 *               - area
 *               - status
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del servicio (opcional)
 *               name:
 *                 type: string
 *                 example: "Taller de Yoga"
 *               description:
 *                 type: string
 *                 example: "Sesiones semanales de yoga para estudiantes"
 *               creatorId:
 *                 type: integer
 *                 example: 2
 *               area:
 *                 type: string
 *                 example: "Salud"
 *               status:
 *                 type: string
 *                 example: "activo"
 *     responses:
 *       201:
 *         description: Servicio creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service created successfully / Servicio creado con éxito
 *                 errors:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 service:
 *                   $ref: '#/components/schemas/Service'
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
 *                   example: "Validation Error / Error de Validación ( ... )"
 *                 service:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: Error interno al crear el servicio
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
 *                   example: Error al crear el usuario / Error creating user ( ... )
 *                 service:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.post("/", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), uploadService.single('file'), serviceController.create);
/**
 * @swagger
 * /service/{id}:
 *   put:
 *     summary: Actualiza un servicio existente
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio a actualizar
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
 *                 description: Imagen del servicio (opcional)
 *               name:
 *                 type: string
 *                 example: "Taller de Yoga"
 *               description:
 *                 type: string
 *                 example: "Sesiones semanales de yoga para estudiantes"
 *               creatorId:
 *                 type: integer
 *                 example: 2
 *               area:
 *                 type: string
 *                 example: "Salud"
 *               status:
 *                 type: string
 *                 example: "activo"
 *     responses:
 *       200:
 *         description: Servicio actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service updated successfully / Servicio actualizado con éxito
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 service:
 *                   $ref: '#/components/schemas/Service'
 *       400:
 *         description: Error de validación en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error de validación / Validation error
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: [{ path: ["name"], message: "Campo requerido" }]
 *                 service:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Servicio no encontrado
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
 *                   example: Service not found / Servicio no encontrado
 *                 service:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: Error interno al actualizar el servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al actualizar el usuario / Error updating user
 *                 error:
 *                   type: string
 *                   example: Error inesperado
 *                 service:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.put("/:id", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), uploadService.single('file'), serviceController.update);

module.exports = router;
