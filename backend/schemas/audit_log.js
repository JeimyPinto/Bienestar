const { z } = require("zod");

const auditLogSchema = z.object({
  entity_type: z.string().min(1, "El tipo de entidad es obligatorio"),
  entity_id: z.number().int().positive("El ID de la entidad debe ser un entero positivo"),
  action: z.enum(["CREATE", "UPDATE", "DELETE"], {
    errorMap: () => ({ message: "Acción inválida" }),
  }),
  old_data: z.any().nullable(),
  new_data: z.any().nullable(),
  changed_by: z.string().nullable(),
  changed_at: z.date().optional(),
});

module.exports = { auditLogSchema };