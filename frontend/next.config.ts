module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Cambia a "https" si usas HTTPS
        hostname: "127.0.0.1", // O "localhost" si es el caso
        port: "4000", // Puerto donde corre tu backend
        pathname: "/uploads/**", // Ruta donde se encuentran las imágenes
      },
      {
        protocol:"https",
        hostname: "bienestar-backend.onrender.com", // Dominio de tu backend en Render
      }
    ],
  },
};