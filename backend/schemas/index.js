import { z } from 'zod';

// Schema for Usuario
export const usuarioSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string(),
    apellido: z.string(),
    documento: z.string(),
    telefono: z.string(),
    email: z.string().email(),
    contrasena: z.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/),
});

// Schema for Aprendiz
export const aprendizSchema = z.object({
    id: z.string(),
    usuarioId: z.number().int().positive(),
    fichaId: z.number().int().positive(),
});

// Schema for Ficha
export const fichaSchema = z.object({
    id: z.string(),
    numero: z.number().int().positive(),
});