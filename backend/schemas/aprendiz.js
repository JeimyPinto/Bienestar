import { z } from 'zod';

export const aprendizSchema = z.object({
    id: z.string(),
    usuarioId: z.number().int().positive(),
    fichaId: z.number().int().positive(),
});