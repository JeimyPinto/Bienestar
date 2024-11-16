const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authenticateUser = async (email, password) => {
  const secret = process.env.JWT_SECRET;
  const user = await db.User.findOne({ where: { email, password } });

  if (!user) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  if (!secret) {
    throw new Error("No se ha definido un secreto para el token");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const username = user.nombre + " " + user.apellido;

  //Genera un nuevo token
  const token = jwt.sign(
    {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
    },
    secret,
    { expiresIn: "1h" }
  );
  return token;
};

module.exports = {authenticateToken, authenticateUser};
