const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      nombre: decoded.nombre,
      apellido: decoded.apellido,
      documento: decoded.documento,
      telefono: decoded.telefono,
      email: decoded.email,
      estado: decoded.estado,
    };
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports = { authenticateToken };
