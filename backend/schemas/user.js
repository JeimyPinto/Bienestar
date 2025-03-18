const { z } = require("zod");

// Esquema para la creación de usuarios por un administrador
const adminCreateUserSchema = z.object({
  firstName: z.string().nonempty("First name is required / El nombre es obligatorio"),
  lastName: z.string().nonempty("Last name is required / El apellido es obligatorio"),
  documentType: z.string().nonempty("Document type is required / El tipo de documento es obligatorio"),
  documentNumber: z.string().nonempty("Document number is required / El número de documento es obligatorio"),
  phone: z.string().nonempty("Phone number is required / El número de teléfono es obligatorio"),
  email: z.string().email("Invalid email address / Dirección de correo electrónico no válida"),
  password: z.string().optional(), // Password can be optional in creation
  role: z.string().nonempty("Role is required / El rol es obligatorio"),
  image: z.string().optional(),
});

// Esquema para la actualización de datos por el mismo usuario
const userUpdateSelfSchema = z.object({
  firstName: z.string().nonempty("First name is required / El nombre es obligatorio"),
  lastName: z.string().nonempty("Last name is required / El apellido es obligatorio"),
  phone: z.string().nonempty("Phone number is required / El número de teléfono es obligatorio"),
  email: z.string().email("Invalid email address / Dirección de correo electrónico no válida"),
  password: z.string().optional(),
  image: z.string().optional(),
  status: z.enum(["activo", "inactivo"], "Status must be either 'activo' or 'inactivo' / El estado debe ser 'activo' o 'inactivo'").optional(),
}).refine(data => data.role === undefined, {
  message: "Role cannot be updated by the user / El usuario no puede actualizar el rol",
  path: ["role"],
});

// Esquema para la actualización de datos por un administrador
const adminUpdateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  documentType: z.string().optional(),
  documentNumber: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address / Dirección de correo electrónico no válida").optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  image: z.string().optional(),
  status: z.enum(["activo", "inactivo"], "Status must be either 'activo' or 'inactivo' / El estado debe ser 'activo' o 'inactivo'").optional(),
});

// Esquema para el login
const loginSchema = z.object({
  email: z.string().email("Invalid email address / Dirección de correo electrónico no válida"),
  password: z.string().nonempty("Password is required / La contraseña es obligatoria"),
});

//Esquema para la validación del documento
const documentSchema = z.object({
  documentNumber: z.string().nonempty("Document number is required / El número de documento es obligatorio"),
});

module.exports = { adminCreateUserSchema, userUpdateSelfSchema, adminUpdateUserSchema, loginSchema, documentSchema };