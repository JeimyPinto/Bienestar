/**
 * @swagger
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           description: ID del usuario solicitante
 *           example: 2
 *         serviceId:
 *           type: integer
 *           description: ID del servicio solicitado
 *           example: 3
 *         createdBy:
 *           type: integer
 *           description: ID del usuario que creó la solicitud
 *           example: 1
 *         description:
 *           type: string
 *           description: Descripción de la solicitud
 *           example: Solicito asesoría psicológica
 *         status:
 *           type: boolean
 *           description: Estado de la solicitud (activa/inactiva)
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T12:00:00.000Z"
 *         applicant:
 *           $ref: '#/components/schemas/User'
 *         service:
 *           $ref: '#/components/schemas/Service'
 *         creator:
 *           $ref: '#/components/schemas/User'
 */
const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request.js");
/**
 * @swagger
 * /request:
 *   get:
 *     summary: Obtiene todas las solicitudes, incluyendo el usuario solicitante y el servicio asociado
 *     tags: [Request]
 *     responses:
 *       200:
 *         description: Solicitudes recuperadas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Requests retrieved successfully / Solicitudes recuperadas con éxito
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 requests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Request'
 *       404:
 *         description: No se encontraron solicitudes
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
 *                   example: No requests found / No se encontraron solicitudes
 *                 requests:
 *                   type: array
 *                   items: {}
 *                   example: []
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
 *                   example: Validation Error / Error de Validación ( ... )
 *                 requests:
 *                   type: array
 *                   items: {}
 *                   example: []
 *       500:
 *         description: Error interno o de base de datos al recuperar solicitudes
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
 *                   example: Error retrieving requests / Error al recuperar solicitudes ( ... )
 *                 requests:
 *                   type: array
 *                   items: {}
 *                   example: []
 */
router.get("/", requestController.getAll);
/**
 * @swagger
 * /request/active:
 *   get:
 *     summary: Obtiene todas las solicitudes activas, incluyendo el usuario solicitante y el servicio asociado
 *     tags: [Request]
 *     responses:
 *       200:
 *         description: Solicitudes activas recuperadas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Active requests retrieved successfully / Solicitudes activas recuperadas con éxito
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 requests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Request'
 *       404:
 *         description: No se encontraron solicitudes activas
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
 *                   example: No active requests found / No se encontraron solicitudes activas
 *                 requests:
 *                   type: array
 *                   items: {}
 *                   example: []
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
 *                   example: Validation Error / Error de Validación ( ... )
 *                 requests:
 *                   type: array
 *                   items: {}
 *                   example: []
 *       500:
 *         description: Error interno o de base de datos al recuperar solicitudes activas
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
 *                   example: Error retrieving active requests / Error al recuperar solicitudes activas
 *                 requests:
 *                   type: array
 *                   items: {}
 *                   example: []
 */
router.get("/active", requestController.getAllActive);
/**
 * @swagger
 * /request/{id}:
 *   get:
 *     summary: Obtiene una solicitud por ID, incluyendo el usuario solicitante y el servicio asociado
 *     tags: [Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la solicitud a consultar
 *     responses:
 *       200:
 *         description: Solicitud recuperada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Request retrieved successfully / Solicitud recuperada con éxito
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 request:
 *                   $ref: '#/components/schemas/Request'
 *       404:
 *         description: Solicitud no encontrada
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
 *                   example: Request not found / Solicitud no encontrada ( {id} )
 *                 request:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: Error interno al recuperar la solicitud
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
 *                   example: Error retrieving request / Error al recuperar solicitud ( ... )
 *                 request:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.get("/:id", requestController.getById);
/**
 * @swagger
 * /request:
 *   post:
 *     summary: Crea una nueva solicitud
 *     tags: [Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - serviceId
 *               - description
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
 *               serviceId:
 *                 type: integer
 *                 example: 3
 *               description:
 *                 type: string
 *                 example: Solicito asesoría psicológica
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Solicitud creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Request created successfully / Solicitud creada con éxito
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 request:
 *                   $ref: '#/components/schemas/Request'
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
 *                   example: Validation Error / Error de Validación ( ... )
 *                 request:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: Error interno al crear la solicitud
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
 *                   example: Error creating request / Error al crear solicitud ( ... )
 *                 request:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.post("/", requestController.create);
/**
 * @swagger
 * /request/{id}:
 *   put:
 *     summary: Actualiza una solicitud existente
 *     tags: [Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la solicitud a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - serviceId
 *               - description
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
 *               serviceId:
 *                 type: integer
 *                 example: 3
 *               description:
 *                 type: string
 *                 example: Solicito asesoría psicológica
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Solicitud actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Request updated successfully / Solicitud actualizada con éxito
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 request:
 *                   $ref: '#/components/schemas/Request'
 *       404:
 *         description: Solicitud no encontrada
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
 *                   example: Request not found / Solicitud no encontrada ( {id} )
 *                 request:
 *                   type: string
 *                   nullable: true
 *                   example: null
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
 *                   example: Validation Error / Error de Validación ( ... )
 *                 request:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       500:
 *         description: Error interno al actualizar la solicitud
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
 *                   example: Error updating request / Error al actualizar solicitud ( ... )
 *                 request:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */
router.put("/:id", requestController.update);

module.exports = router;
