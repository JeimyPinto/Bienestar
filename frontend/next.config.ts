module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000", 
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "bienestar-backend.onrender.com",
        pathname: "/uploads/**",
      }
    ],
  },
  // Configuración para producción
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
};