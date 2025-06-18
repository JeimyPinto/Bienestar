const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.error("Token no proporcionado");
    return res.status(401).json({
      message: "No autorizado",
      details: "No se proporcionó un token de autenticación"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Error de autenticación:", error);
    return res.status(403).json({
      message: "Token inválido o expirado / Invalid or expired token",
      details: error.message,
    });
  }
}

module.exports = authenticateToken;
