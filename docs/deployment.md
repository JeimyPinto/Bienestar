# 🌐 Despliegue en Producción

Esta sección explica el proceso de despliegue del sistema Bienestar en la plataforma Render.

## Backend en Render

1.  **Conectar Repositorio**: Conecta tu repositorio de GitHub a Render.
2.  **Configurar Variables de Entorno**: Configura todas las variables necesarias en el dashboard de Render.
3.  **Comandos de Build**:
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
4.  **Ejecutar Migraciones**: Una vez desplegado, puedes ejecutar las migraciones en el entorno de producción:

```bash
npm run migrate-seed
```

## Frontend en Render

1.  **Conectar Repositorio**: Conecta tu repositorio a Render.
2.  **Configurar Variables de Entorno**:
    - `NEXT_PUBLIC_API_BASE_URL`: URL del backend en Render.
    - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Tu clave de sitio de reCAPTCHA.
3.  **Comandos de Build**:
    - **Build Command**: `npm run build`
    - **Start Command**: `npm run start`

## CI/CD en Render

Render configurará automáticamente el Continuous Deployment cada vez que hagas push a tu rama principal, reconstruyendo y redimensionando tu aplicación según sea necesario.
