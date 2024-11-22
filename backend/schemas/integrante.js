const { z } = require("zod");

const integranteSchema = z.object({
    area: z.string().nonempty('El área es requerida'),
    usuarioId: z.number().int().nonnegative()
});

module.exports = integranteSchema;