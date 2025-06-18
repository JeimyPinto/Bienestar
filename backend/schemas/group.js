const { z } = require("zod");

/**
 * Esquema de validación para la creación de un grupo
 */
const createGroupSchema = z.object({
  fichaNumber: z.string().nonempty({ message: "El número de ficha es obligatorio" }),
  programName: z.string().nonempty({ message: "El nombre del programa es obligatorio" }),
  programType: z.enum(["tecnico", "tecnologia", "complementaria"], {
    message: "El tipo de programa debe ser 'tecnico', 'tecnologia' o 'complementaria'"
  }),
  instructorId: z.number({ message: "El id del gestor/instructor es obligatorio" }),
  fichaStatus: z.enum(["etapa lectiva", "etapa practica", "certificados"], {
    message: "El estado de la ficha debe ser 'etapa lectiva', 'etapa practica' o 'certificados'"
  })
});

/**
 * Esquema de validación para la actualización de un grupo
 */
const updateGroupSchema = z.object({
  fichaNumber: z.string().optional(),
  programName: z.string().optional(),
  programType: z.enum(["tecnico", "tecnologia", "complementaria"]).optional(),
  instructorId: z.number().optional(),
  fichaStatus: z.enum(["etapa lectiva", "etapa practica", "certificados"]).optional()
});

module.exports = {
  createGroupSchema,
  updateGroupSchema
};
