import { z } from 'zod';

export const fichaSchema = z.object({
    id: z.string(),
    numero: z.number().int().positive(),
});