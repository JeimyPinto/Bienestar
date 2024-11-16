const { z } = require("zod");

const usuarioSchema = z.object({
  nombre: z.string().nonempty("El nombre es requerido"),
  apellido: z.string().nonempty("El apellido es requerido"),
  documento: z.string().nonempty("El documento es requerido"),
  telefono: z.string().nonempty("El teléfono es requerido"),
  email: z.string().email("El email no es válido"),
  contrasena: z.string().nonempty("La contraseña es requerida"),
});

module.exports = usuarioSchema;