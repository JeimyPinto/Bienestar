const jwt = require("jsonwebtoken");

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
      return res.status(401).json({ message: "Token no proporcionado" });

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
      };
      next();
    } catch (err) {
      return res
        .status(403)
        .json({ message: "Token no válido / Invalid token" });
    }
  },

  /**
   * Permite autorizar el acceso a una ruta solo si el rol del usuario es admin
   * @param {Array} roles - Lista de roles permitidos, por defecto solo 'admin'
   * @returns {Function} Middleware para autorizar el acceso a una ruta
   * @version 18/03/2025
   * @autor Jeimy Pinto
   */
  authorizeRole: (roles = ["admin"]) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message:
            "No tiene los permisos para acceder a esta ruta / You do not have permission to access this route",
        });
      }
      next();
    };
  },
};

module.exports = authMiddleware;
