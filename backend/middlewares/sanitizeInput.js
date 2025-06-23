const toPascalCase = (str) => {
  return str
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const sanitizeRequestBody = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        // Elimina espacios al inicio y final
        req.body[key] = req.body[key].trim();
        // Normaliza emails a minúsculas
        if (key === "email") {
          req.body[key] = req.body[key].toLowerCase();
        }
        // Convierte firstName y lastName a Pascal Case
        if (key === "firstName" || key === "lastName") {
          req.body[key] = toPascalCase(req.body[key]);
        }
        // Convierte id y groupId a número si son string numéricos
        if ((key === "id" || key === "groupId") && !isNaN(req.body[key])) {
          req.body[key] = Number(req.body[key]);
        }
      }
    }
  }
  next();
};

module.exports = sanitizeRequestBody;
