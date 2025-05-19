const { z } = require("zod");

/**
 * Esquemas de validación de datos para los usuarios
 * @module Schemas/User
 * @requires zod (npm i zod)
 * @version 18/03/2025
 * @autor Jeimy Pinto
 */
const adminCreateUserSchema = z
  .object({
    firstName: z
      .string()
      .nonempty({ message: "First name is required / El nombre es obligatorio" }),
    lastName: z
      .string()
      .nonempty({ message: "Last name is required / El apellido es obligatorio" }),
    documentType: z
      .string()
      .nonempty({
        message:
          "Document type is required / El tipo de documento es obligatorio",
      }),
    documentNumber: z
      .string()
      .nonempty({
        message: "Document number is required / El número de documento es obligatorio",
      }),
    phone: z
      .string()
      .nonempty(
        { message: "Phone number is required / El número de teléfono es obligatorio" }
      ),
    email: z
      .string()
      .email({
        message: "Invalid email address / Dirección de correo electrónico no válida",
      }),
    password: z.string().optional(),
    status: z.enum(
      ["activo", "inactivo"],
      {
        errorMap: () => ({
          message:
            "Status must be either 'activo' or 'inactivo' / El estado debe ser 'activo' o 'inactivo'",
        }),
      }
    ),
    role: z.string().nonempty({
      message: "Role is required / El rol es obligatorio",
    }),
    image: z.string().optional(),
  })
  .refine(
    (data) => !!data.documentNumber,
    {
      message: "Document number must be unique / El número de documento debe ser único",
      path: ["documentNumber"],
    }
  )
  .transform((data) => ({
    ...data,
    password: data.password || data.documentNumber,
  }));

/**
 * Esquema para la actualización de datos por el usuario
 * @type {z.ZodObject}
 * @const userUpdateSelfSchema
 * @version 18/03/2025
 * @autor Jeimy Pinto
 */
const userUpdateSelfSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("First name is required / El nombre es obligatorio"),
    lastName: z
      .string()
      .nonempty("Last name is required / El apellido es obligatorio"),
    phone: z
      .string()
      .nonempty(
        "Phone number is required / El número de teléfono es obligatorio"
      ),
    email: z
      .string()
      .email(
        "Invalid email address / Dirección de correo electrónico no válida"
      ),
    password: z.string().optional(),
    image: z.string().optional(),
    status: z
      .enum(
        ["activo", "inactivo"],
        "Status must be either 'activo' or 'inactivo' / El estado debe ser 'activo' o 'inactivo'"
      )
      .optional(),
  })
  .refine(
    (data) => !!data.documentNumber,
    {
      message: "Document number must be unique / El número de documento debe ser único",
      path: ["documentNumber"],
    }
  )
  .refine((data) => data.role === undefined, {
    message:
      "Role cannot be updated by the user / El usuario no puede actualizar el rol",
    path: ["role"],
  });

/**
 * Esquema para la actualización de datos por el administrador
 * @type {z.ZodObject}
 * @const adminUpdateUserSchema
 * @version 18/03/2025
 * @autor Jeimy Pinto
 */
const adminUpdateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  documentType: z.string().optional(),
  documentNumber: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .email("Invalid email address / Dirección de correo electrónico no válida")
    .optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  status: z
    .enum(
      ["activo", "inactivo"],
      "Status must be either 'activo' or 'inactivo' / El estado debe ser 'activo' o 'inactivo'"
    )
    .optional(),
  image: z.string().optional(),
  updatedAt: z.string().optional(),
});

/**
 * Esquema para la validación del inicio de sesión
 */
const loginSchema = z.object({
  email: z
    .string()
    .email({
      message:
        "Invalid email address / Dirección de correo electrónico no válida",
    }),
  password: z
    .string()
    .nonempty({
      message: "Password is required / La contraseña es obligatoria",
    }),
  recaptchaToken: z
    .string()
    .nonempty({
      message:
        "Recaptcha token is required / El token de recaptcha es obligatorio",
    }),
});

/**
 * Esquema para la validación del número de documento
 * @type {z.ZodObject}
 * @const documentSchema
 * @version 18/03/2025
 * @autor Jeimy Pinto
 */
const documentSchema = z.object({
  documentNumber: z
    .string()
    .nonempty(
      "Document number is required / El número de documento es obligatorio"
    ),
});

module.exports = {
  adminCreateUserSchema,
  userUpdateSelfSchema,
  adminUpdateUserSchema,
  loginSchema,
  documentSchema,
};
