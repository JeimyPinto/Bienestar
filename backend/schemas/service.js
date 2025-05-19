const { z } = require("zod");

/**
 * Esquemas de validación de datos para los servicios
 */
const serviceCreateSchema = z.object({
  name: z.string().nonempty("Name is required / El nombre es obligatorio"),
  description: z.string().nonempty("Description is required / La descripción es obligatoria"),
  creatorId: z.number().int().positive("Creator ID must be a positive integer / El ID del creador debe ser un número entero positivo"),
  area: z.enum([
    'Salud',
    'Arte y Cultura',
    'Deporte y Recreación',
    'Apoyo Socioeconomico y Reconocimiento a la Excelencia',
    'Apoyo Psicosocial'
  ], "Area is required / El área es obligatoria"),
  image: z.string().optional(),
  status: z.enum(['activo', 'inactivo']).default('activo'),
});

module.exports = {
  serviceCreateSchema,
};