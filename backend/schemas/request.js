const { z } = require("zod");

/**
 * Esquemas de validación de datos para los servicios
 */
const requestSchema = z.object({
    id: z.number().int().optional(),
    userId: z.number().int().positive({
        message: "User ID must be a positive integer / El ID del usuario debe ser un número entero positivo",
    }),
    serviceId: z.number().int().positive({
        message: "Service ID must be a positive integer / El ID del servicio debe ser un número entero positivo",
    }),
    description: z.string().max(10000, {
        message: "Description is too long / La descripción es demasiado larga",
    }).optional(),
    status: z.boolean().default(true),
});

module.exports = {
    requestSchema,
};