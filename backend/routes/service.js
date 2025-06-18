// =======================
// Librerías de terceros
// =======================
const express = require("express");

// =======================
// Middlewares
// =======================
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const { uploadService } = require("../middlewares/fileUpload.js");

// =======================
// Controladores
// =======================
const serviceController = require("../controllers/service.js");
const ROLES = require("../constants/roles.js");
const { serviceSchema } = require("../schemas/service.js");

// =======================
// Inicialización de Router
// =======================
const router = express.Router();

/**
 * @openapi
 * /services:
 *   get:
 *     summary: Obtiene todos los servicios, incluyendo el usuario creador
 *     tags:
 *       - Service
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN o SUPERADMIN.
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
 *       400:
 *         description: Error de validación en la consulta
 *       500:
 *         description: Error interno o de base de datos al recuperar servicios
 **/
router.get("/", authenticateToken, authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), serviceController.getAll);

/**
 * @openapi
 * /services/active:
 *   get:
 *     summary: Obtiene todos los servicios activos, incluyendo el usuario creador
 *     tags:
 *       - Service
 *     description: Público, no requiere autenticación.
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
 *       400:
 *         description: Error de validación en la consulta
 *       500:
 *         description: Error interno o de base de datos al recuperar servicios activos
 */
router.get("/active", serviceController.getAllActive);

/**
 * @openapi
 * /services/user/{id}:
 *   get:
 *     summary: Obtiene todos los servicios creados por un usuario específico
 *     tags:
 *       - Service
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN o SUPERADMIN. Devuelve todos los servicios cuyo campo creatorId coincide con el id proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario creador de los servicios
 *     responses:
 *       200:
 *         description: Servicios del usuario recuperados con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *       404:
 *         description: No se encontraron servicios para este usuario
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol insuficiente)
 *       500:
 *         description: Error interno del servidor
 */
router.get("/user/:id", authenticateToken, authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), serviceController.getByUserId);

/**
 * @openapi
 * /services/{id}:
 *   get:
 *     summary: Obtiene un servicio por ID, incluyendo el usuario creador
 *     tags:
 *       - Service
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN, SUPERADMIN o INSTRUCTOR.
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
 *       500:
 *         description: Error interno al recuperar el servicio
 */
router.get(":id", authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR), serviceController.getById);

/**
 * @openapi
 * /services:
 *   post:
 *     summary: Crea un nuevo servicio
 *     tags:
 *       - Service
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN o SUPERADMIN. Permite subir una imagen junto con los datos del servicio.
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
 *       500:
 *         description: Error interno al crear el servicio
 */
router.post(
  "/",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  uploadService.single("file"),
  validateRequestSchema(serviceSchema),
  serviceController.create
);

/**
 * @openapi
 * /services/{id}:
 *   put:
 *     summary: Actualiza un servicio existente
 *     tags:
 *       - Service
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN o SUPERADMIN. Permite subir una imagen junto con los datos del servicio.
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
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error interno al actualizar el servicio
 */
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  uploadService.single("file"),
  validateRequestSchema(serviceSchema),
  serviceController.update
);

// =======================
// Exportación del router
// =======================
module.exports = router;
