function validateRequestSchema(schema, property = "body") {
  return async (req, res, next) => {
    try {
      req[property] = await schema.parseAsync(req[property]);
      next();
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({
          message: null,
          details: "Error de validación" +
            error.errors.map(e => `${e.path?.join(".")}: ${e.message}`).join("; "),
        });
      }
      next(error);
    }
  };
}

module.exports = validateRequestSchema;
