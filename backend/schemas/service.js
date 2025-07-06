const { z } = require("zod");

/**
 * Esquemas de validación de datos para los servicios
 */
const serviceSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required / El nombre es obligatorio",
  }),
  description: z.string().optional(),
  creatorId: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().int().positive({
      message: "Creator ID must be a positive integer / El ID del creador debe ser un número entero positivo",
    })
  ),
  area: z.enum([
    "Salud",
    "Arte y Cultura",
    "Deporte y Recreación",
    "Apoyo Socioeconomico y Reconocimiento a la Excelencia",
    "Apoyo Psicosocial"
  ], {
    errorMap: () => ({ message: "Invalid area / Área inválida" }),
  }),
  image: z.string().optional(),
  detailUrl: z.string().url().optional().or(z.literal("")).transform(val => val === "" ? null : val),
  status: z.enum(["activo", "inactivo"]).default("activo"),
});

/**
 * Esquema para actualización de servicios (todos los campos opcionales excepto validaciones específicas)
 */
const updateServiceSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required / El nombre es obligatorio",
  }).optional(),
  description: z.string().optional(),
  area: z.enum([
    "Salud",
    "Arte y Cultura",
    "Deporte y Recreación",
    "Apoyo Socioeconomico y Reconocimiento a la Excelencia",
    "Apoyo Psicosocial"
  ], {
    errorMap: () => ({ message: "Invalid area / Área inválida" }),
  }).optional(),
  image: z.string().optional(),
  detailUrl: z.string().url().optional().or(z.literal("")).transform(val => val === "" ? null : val),
  status: z.enum(["activo", "inactivo"]).optional(),
});

module.exports = {
  serviceSchema,
  updateServiceSchema,
};