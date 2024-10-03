import { TipoUsuarioModel } from "../models/TipoUsuario.js";

export const TipoUsuarioController = {
  async create(req, res) {
    try {
      const { nombre } = req.body;
      if (!nombre) {
        return res.status(400).json({ error: "Nombre es requerido" });
      }
      const tipoUsuario = await TipoUsuarioModel.create(req.body);
      res.status(201).send({message: "Tipo de usuario creado"}).json(tipoUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
