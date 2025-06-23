const { Remission } = require('../models');

const RemissionService = {
  async create(data) {
    return Remission.create(data);
  },

  async getAll() {
    return Remission.findAll();
  },

  async getById(id) {
    return Remission.findByPk(id);
  },

  async update(id, data) {
    const remission = await Remission.findByPk(id);
    if (!remission) throw new Error('Remission not found');
    return remission.update(data);
  },
};

module.exports = RemissionService;
