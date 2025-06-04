module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Cambia a "https" si usas HTTPS
        hostname: "127.0.0.1", // O "localhost" si es el caso
        port: "3000", // Puerto donde corre tu backend
        pathname: "/uploads/temp/**", // Ruta donde se encuentran las imágenes
      },
    ],
    domains: [
      "127.0.0.1",
      "localhost",
      "bienestar-backend.onrender.com",
    ],
  },
};