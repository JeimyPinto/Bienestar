function removeSensitiveFields(res, next) {
  // Intercepta el método res.json
  const originalJson = res.json;
  res.json = function (data) {
    // Función auxiliar para limpiar un usuario
    const cleanUser = (user) => {
      if (user && typeof user === "object") {
        // eslint-disable-next-line no-unused-vars
        const { password: _, ...rest } = user;
        return rest;
      }
      return user;
    };
    // Si la respuesta tiene un campo 'user'
    if (data && data.user) {
      data.user = cleanUser(data.user);
    }
    // Si la respuesta tiene un array de usuarios
    if (data && Array.isArray(data.users)) {
      data.users = data.users.map(cleanUser);
    }
    // Si la respuesta es directamente un usuario
    if (data && data.password) {
      data = cleanUser(data);
    }
    return originalJson.call(this, data);
  };
  next();
}

module.exports = removeSensitiveFields;
