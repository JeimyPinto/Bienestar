import { usuarioSchema } from '../schemas/usuario.js';

const validateUsuario = (req, res, next) => {
  const result = usuarioSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      path: err.path[0],
      message: err.message
    }));
    return res.status(400).json({ errors });
  }
  next();
};

export default validateUsuario;