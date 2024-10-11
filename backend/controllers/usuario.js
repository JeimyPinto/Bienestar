class UsuarioController {
  // Método para crear un nuevo usuario
  async create(req, res) {
    try {
      const usuario = await Usuario.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Método para obtener todos los usuarios
  async getAll(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Método para obtener un usuario por ID
  async getById(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Método para actualizar un usuario por ID
  async update(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (usuario) {
        await usuario.update(req.body);
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Método para eliminar un usuario por ID
  async delete(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (usuario) {
        await usuario.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default UsuarioController;