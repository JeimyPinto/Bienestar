const { z } = require("zod");
const ROLES = require("../constants/roles");

const createSchema = z
  .object({
    firstName: z
      .string()
      .nonempty({ message: "El nombre es obligatorio" }),
    lastName: z
      .string()
      .nonempty({ message: "El apellido es obligatorio" }),
    documentType: z
      .string()
      .nonempty({ message: "El tipo de documento es obligatorio" }),
    documentNumber: z
      .string()
      .nonempty({ message: "El número de documento es obligatorio" }),
    phone: z
      .string()
      .nonempty({ message: "El número de teléfono es obligatorio" }),
    email: z
      .string()
      .email({ message: "Dirección de correo electrónico no válida" }),
    password: z.string().optional(),
    status: z
      .enum(["activo", "inactivo"], {
        message: "El estado debe ser 'activo' o 'inactivo'",
      })
      .optional(),
    role: z.enum([
      ROLES.USER,
      ROLES.INSTRUCTOR,
      ROLES.ADMIN,
      ROLES.SUPERADMIN
    ], { message: "Role must be one of: user, instructor, admin, superadmin / El rol debe ser uno de: user, instructor, admin, superadmin" }),
    image: z.string().optional(), // nombre del archivo, si lo quieres guardar
    groupId: z.preprocess(
      (val) => {
        if (val === "" || val === "null" || val === undefined || val === null) return null;
        const num = Number(val);
        return isNaN(num) ? null : num;
      },
      z.number().int().nullable().optional()
    ),
  })
  .transform((data) => ({
    ...data,
    status: data.status || "activo",
    password: data.password || data.documentNumber,
  }));

const updateSchema = z.object({
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
  role: z.enum([
    ROLES.USER,
    ROLES.INSTRUCTOR,
    ROLES.ADMIN,
    ROLES.SUPERADMIN
  ]).optional(),
  status: z
    .enum(["activo", "inactivo"], {
      message: "Status must be either 'activo' or 'inactivo' / El estado debe ser 'activo' o 'inactivo'",
    })
    .optional(),
  image: z.string().optional(),
  updatedAt: z.string().optional(),
  groupId: z.preprocess(
    (val) => {
      if (val === "" || val === "null" || val === undefined || val === null) return null;
      const num = Number(val);
      return isNaN(num) ? null : num;
    },
    z.number().int().nullable().optional()
  ),
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

module.exports = {
  createSchema,
  updateSchema,
  loginSchema,
};
