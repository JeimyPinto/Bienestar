function validateRequestSchema(schema, property = "body") {
  return async (req, res, next) => {
    try {
      req[property] = await schema.parseAsync(req[property]);
      next();
    } catch (error) {
      if (error.errors) {
        // Mensaje principal: primer error con campo y mensaje
        const first = error.errors[0];
        const message = first && first.path ? `${first.path.join('.')}: ${first.message}` : 'Error de validación';
        return res.status(400).json({
          error: true,
          message,
          details: error.errors.map(e => ({
            field: e.path?.join('.') || '',
            message: e.message,
            received: e.input
          })),
        });
      }
      next(error);
    }
  };
}

module.exports = validateRequestSchema;
