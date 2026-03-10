# 🔒 Seguridad y Buenas Prácticas

Esta sección describe las medidas de seguridad y las mejores prácticas empleadas en el sistema Bienestar.

## Autenticación y Autorización

- **JWT (JSON Web Tokens)**: Almacenados de forma segura en `localStorage` del frontend.
- **Roles Jerárquicos**: Control de acceso basado en roles para todos los endpoints protegidos.
- **Middleware de Seguridad**: Verificación robusta en cada petición al backend.
- **Protección CSRF Implícita**: Al no depender de cookies para la autenticación, se elimina el riesgo de ataques CSRF tradicionales.

## Validación de Datos

- **Esquemas Zod**: Validación estricta en el backend para todos los datos de entrada.
- **Sanitización de Inputs**: Prevención de ataques XSS (Cross-Site Scripting).
- **TypeScript**: Tipado estático en el frontend para reducir errores en tiempo de ejecución.
- **reCAPTCHA**: Integración para evitar ataques de bots y spam en formularios de autenticación.

## Protección de Datos Sensibles

- **Ocultamiento de Datos**: Los campos sensibles como contraseñas nunca se exponen en las respuestas de la API.
- **Hashing**: Las contraseñas se almacenan mediante hashing seguro con bcrypt.
- **Auditoría Completa**: Registro detallado de todas las acciones importantes para trazar el uso del sistema.
- **Manejo Seguro de Archivos**: Configuración controlada de `Multer` para subida de imágenes.
- **Variables de Entorno**: Configuración protegida y excluida del control de versiones.
- **Plantilla .env.example**: Guía clara para la configuración del entorno sin exponer credenciales reales.
