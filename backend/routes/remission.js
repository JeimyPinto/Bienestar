const express = require('express');
const router = express.Router();
const RemissionController = require('../controllers/remission.js');
const validacionRemission = require('../middlewares/validateSchema.js');
const remissionSchema = require('../schemas/remission.js');
const sanitizeRequestBody = require("../middlewares/sanitizeInput.js");
const sendRemissionNotificationMail = require('../middlewares/sendRemissionNotificationMail.js');

const authenticateToken = require("../middlewares/authenticateToken.js");
const authorizeRoles = require("../middlewares/authorizeRoles.js");
const ROLES = require("../constants/roles");

// Obtener todas las remisiones (admin/superadmin/instructor)
router.get(
    '/', 
    authenticateToken, 
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR), 
    RemissionController.getAll
);

// Obtener una remisión por id (admin/superadmin/instructor)
router.get(
    '/:id', 
    authenticateToken, 
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR), 
    RemissionController.getById
);

// Crear una remisión (solo admin/superadmin)
router.post(
    '/', 
    authenticateToken, 
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), 
    sanitizeRequestBody, 
    validacionRemission(remissionSchema), 
    RemissionController.create, 
    sendRemissionNotificationMail
);

// Actualizar una remisión (solo admin/superadmin)
router.put(
    '/:id', 
    authenticateToken, 
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), 
    sanitizeRequestBody, 
    validacionRemission(remissionSchema), 
    RemissionController.update
);

module.exports = router;
