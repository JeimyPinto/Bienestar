function removeSensitiveFields(req, res, next) {
  // Función auxiliar para limpiar un usuario
  const cleanUser = (user) => {
    if (user && typeof user === "object") {
      // eslint-disable-next-line no-unused-vars
      const { password: _, ...rest } = user;
      return rest;
    }
    return user;
  };

  // Si hay datos preparados por middlewares anteriores, enviar respuesta
  if (res.locals.responseData) {
    const data = res.locals.responseData;
    
    // Limpiar campos sensibles
    if (data && data.user) {
      data.user = cleanUser(data.user);
    }
    if (data && Array.isArray(data.users)) {
      data.users = data.users.map(cleanUser);
    }
    if (data && data.password) {
      data = cleanUser(data);
    }
    
    return res.status(res.locals.statusCode || 200).json(data);
  }

  // Comportamiento normal: interceptar res.json para otras rutas
  const originalJson = res.json;
  res.json = function (data) {
    // Limpiar campos sensibles
    if (data && data.user) {
      data.user = cleanUser(data.user);
    }
    if (data && Array.isArray(data.users)) {
      data.users = data.users.map(cleanUser);
    }
    if (data && data.password) {
      data = cleanUser(data);
    }
    return originalJson.call(this, data);
  };
  
  next();
}

module.exports = removeSensitiveFields;
