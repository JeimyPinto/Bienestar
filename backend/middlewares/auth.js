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

const authenticateUser = async (email, password) => {
  const secret = process.env.JWT_SECRET;
  const user = await Usuario.findOne({ where: { email, password } });

  if (!user) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  if (!secret) {
    throw new Error("No se ha definido un secreto para el token");
  }

  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
  return { token, user };
};

module.exports = { authenticateToken, authenticateUser };