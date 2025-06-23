const express = require('express');
const router = express.Router();
const RemissionController = require('../controllers/remission');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Obtener todas las remisiones (admin/superadmin)
router.get('/', authorizeRoles('admin', 'superadmin'), RemissionController.getAll);

// Obtener una remisión por id (admin/superadmin)
router.get('/:id', authorizeRoles('admin', 'superadmin'), RemissionController.getById);

// Crear una remisión (admin/superadmin)
router.post('/', authorizeRoles('admin', 'superadmin'), RemissionController.create);

// Actualizar una remisión (admin/superadmin)
router.put('/:id', authorizeRoles('admin', 'superadmin'), RemissionController.update);

// No se permite eliminar remisiones
// router.delete('/:id', ...);

module.exports = router;
