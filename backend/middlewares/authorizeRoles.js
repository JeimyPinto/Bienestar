function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "No tienes permisos para acceder a este recurso",
        details: { requiredRoles: allowedRoles }
      });
    }
    next();
  };
}

module.exports = authorizeRoles;
