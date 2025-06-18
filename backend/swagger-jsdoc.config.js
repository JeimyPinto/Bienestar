// swagger-jsdoc.config.js
module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bienestar API",
      version: "1.0.0",
      description: "Documentación automática de la API de Bienestar generada con swagger-jsdoc."
    },
    servers: [
      { url: "http://localhost:4000/api" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./routes/*.js", "./controllers/*.js"] // Archivos donde buscar los comentarios JSDoc
};
