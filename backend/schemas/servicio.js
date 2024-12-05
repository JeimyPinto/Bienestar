const { z } = require("zod");


const servicioSchema = z.object({
    nombre: z.string().nonempty(),
    encargadoId: z.number().int(),
    imagen: z.string().optional(),
});

module.exports = servicioSchema;