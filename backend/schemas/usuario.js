const { z } = require('zod');

const usuarioSchema = z.object({
  nombre: z.string().nonempty("El nombre es obligatorio"),
  apellido: z.string().nonempty("El apellido es obligatorio"),
  documento: z.string().nonempty("El documento es obligatorio").refine(async (documento) => {
    // Assuming you have a function `isDocumentoUnique` that checks the uniqueness of the document
    return await isDocumentoUnique(documento);
  }, {
    message: "El documento ya está en uso"
  }),
  telefono: z.string().nonempty("El teléfono es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  contrasena: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
    .regex(/[0-9]/, "La contraseña debe tener al menos un número")
    .regex(/[^A-Za-z0-9]/, "La contraseña debe tener al menos un carácter especial")
    .nonempty("La contraseña es obligatoria"),
  estado: z.enum(['inactiva', 'activa', 'congelada', 'cerrada']).default('activa')
});

module.exports = usuarioSchema;