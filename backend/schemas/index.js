const { z } = require('zod');
const { Usuario, Aprendiz } = require('../models');

// Schema for Usuario
const usuarioSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string(),
    apellido: z.string(),
    documento: z.string(),
    telefono: z.string(),
    email: z.string().email(),
    contrasena: z.string().min(6),
});

// Schema for Aprendiz
const aprendizSchema = z.object({
    id: z.string(),
    usuarioId: z.number().int().positive(),
    fichaId: z.number().int().positive(),
});

//Schema for Ficha
const fichaSchema = z.object({
    id: z.string(),
    numero: z.number().int().positive(),
    jornada: z.string(),
});

module.exports = {
    usuarioSchema,
    aprendizSchema,
};