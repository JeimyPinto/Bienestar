const jwt = require("jsonwebtoken");
const enabledRoles = require("../utils/enabledRoles.js");

const authMiddleware = {
  /**
   * Middleware para autenticar el token JWT en las solicitudes
   * @param {Object} req - Objeto de solicitud
   * @param {Object} res - Objeto de respuesta
   * @param {Function} next - Función para pasar al siguiente middleware
   * @returns {void}
   */
  authenticateToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ error: "Token no proporcionado / Token not provided" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decoded.id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        documentType: decoded.documentType,
        documentNumber: decoded.documentNumber,
        phone: decoded.phone,
        email: decoded.email,
        status: decoded.status,
        role: decoded.role,
        image: decoded.image,
        createdAt: decoded.createdAt,
        updatedAt: decoded.updatedAt,
      };
      next();
    } catch (err) {
      return res
        .status(403)
        .json({
          error: "Token no válido / Invalid token ( " + err.message + " )",
        });
    }
  },

  authorizeRole: (roles = enabledRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "No autorizado / Unauthorized" });
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "No tienes permisos / Forbidden" });
      }
      next();
    };
  },
};

module.exports = authMiddleware;
