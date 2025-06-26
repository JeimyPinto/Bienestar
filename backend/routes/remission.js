const express = require('express');
const router = express.Router();
const RemissionController = require('../controllers/remission.js');
const validacionRemission = require('../middlewares/validateSchema.js');
const remissionSchema = require('../schemas/remission.js');
const sanitizeRequestBody = require("../middlewares/sanitizeInput.js");
const sendRemissionNotificationMail = require('../middlewares/sendRemissionNotificationMail.js');

// Obtener todas las remisiones (admin/superadmin)
router.get('/', RemissionController.getAll);

// Obtener una remisión por id (admin/superadmin)
router.get('/:id',RemissionController.getById);

// Crear una remisión (admin/superadmin)
router.post('/', sanitizeRequestBody, validacionRemission(remissionSchema), RemissionController.create, sendRemissionNotificationMail);

// Actualizar una remisión (admin/superadmin)
router.put('/:id', sanitizeRequestBody, validacionRemission(remissionSchema), RemissionController.update);

module.exports = router;
