# 🚨 Solución de Problemas

Esta sección contiene una guía para resolver los problemas más comunes que pueden ocurrir durante el desarrollo o el uso del sistema Bienestar.

## Problemas Comunes

1.  **Error de Conexión a la Base de Datos**: Verifica las variables de entorno en el archivo `.env` del backend y asegúrate de que el servicio de base de datos esté activo.
2.  **Variables de Entorno Faltantes**: Asegúrate de haber copiado el archivo `.env.example` a `.env` y de configurar todos los valores requeridos.
3.  **Token Inválido o Caducado**: Limpia el `localStorage` de tu navegador e intenta iniciar sesión de nuevo.
4.  **Errores de CORS**: Verifica que la variable `FRONTEND_URL` en el backend coincida exactamente con la URL desde la que accede el frontend.
5.  **Correos no se Envían**: Revisa la configuración del servicio SMTP (`EMAIL_USER` y `EMAIL_PASS`) y asegúrate de usar una contraseña de aplicación si es necesario.
6.  **Archivos no se Suben**: Asegúrate de que la carpeta `uploads/` del backend tenga los permisos de escritura adecuados.
7.  **Fallo en reCAPTCHA**: Verifica que las claves de reCAPTCHA configuradas en el frontend y el backend sean correctas y estén autorizadas para tu dominio.
8.  **Carga Masiva Falla**:
    - Verificar formato del archivo Excel (.xlsx o .xls).
    - Asegurarse de que los encabezados coincidan exactamente: `firstName`, `lastName`, `documentType`, `documentNumber`, `phone`, `email`.
    - Validar que los tipos de documento y que los emails y números de documento sean únicos.

## Logs y Debugging

- **Backend**: Utiliza **Chalk** para generar logs coloridos y descriptivos en la terminal que facilitan la identificación de errores.
- **Frontend**: Los errores de desarrollo se muestran en la consola del navegador.
- **Auditoría**: Consulta la tabla `audit_logs` en la base de datos para ver el registro detallado de las acciones que ocurrieron antes de un error.
- **Middleware de Error**: Existe un middleware centralizado que captura y formatea los errores del servidor.
