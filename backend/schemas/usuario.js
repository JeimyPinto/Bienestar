const { z } = require("zod");

// Esquema para la creación de usuarios
const usuarioCreateSchema = z.object({
  nombre: z.string().nonempty("El nombre es requerido"),
  apellido: z.string().nonempty("El apellido es requerido"),
  documento: z.string().nonempty("El documento es requerido"), // Obligatorio para la creación
  telefono: z.string().nonempty("El teléfono es requerido"),
  email: z.string().email("El email no es válido"),
  contrasena: z.string().optional(), // La contraseña puede ser opcional en la creación
});

// Esquema para la actualización de usuarios
const usuarioUpdateSchema = z.object({
  nombre: z.string().nonempty("El nombre es requerido"),
  apellido: z.string().nonempty("El apellido es requerido"),
  telefono: z.string().nonempty("El teléfono es requerido"),
  email: z.string().email("El email no es válido"),
  contrasena: z.string().optional(), // La contraseña puede ser opcional en la actualización
});

module.exports = { usuarioCreateSchema, usuarioUpdateSchema };