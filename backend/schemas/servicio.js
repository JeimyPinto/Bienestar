const { z } = require("zod");


const servicioSchema = z.object({
    nombre: z.string().nonempty(),
    encargadoId: z.number().int()
});

module.exports = servicioSchema;