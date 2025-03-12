const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

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
    return res.sendStatus(403);
  }
};

module.exports = { authenticateToken };
