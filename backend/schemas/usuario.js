import { z } from 'zod';

export const usuarioSchema = z.object({
  id: z.number().int().positive().optional(), // Hacer opcional si no se proporciona en la creación
  nombre: z.string().nonempty({ message: "El nombre es requerido" }),
  apellido: z.string().nonempty({ message: "El apellido es requerido" }),
  documento: z.string().nonempty({ message: "El documento es requerido" }),
  telefono: z.string().nonempty({ message: "El teléfono es requerido" }),
  email: z.string().email({ message: "El correo debe ser un correo válido" }),
  contrasena: z.string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, { message: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial" }),
});