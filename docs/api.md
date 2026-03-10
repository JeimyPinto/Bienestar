# 📚 Documentación y API

Esta sección contiene información sobre la documentación interactiva y los endpoints principales del sistema Bienestar.

## Documentación Interactiva

- **Swagger UI**: Disponible en `http://localhost:4000/api-docs` (desarrollo) y en la URL de producción correspondiente.
- **Archivo Fuente**: `backend/swagger.yaml`
- **Ejemplos de Peticiones**: `backend/api.rest`

## Endpoints Principales

### Autenticación

- `POST /auth/login` - Iniciar sesión.
- `POST /auth/register` - Registrar un nuevo usuario.
- `POST /auth/refresh` - Renovar un token caducado.

### Usuarios

- `GET /users` - Listar todos los usuarios (solo Admin+).
- `POST /users` - Crear un nuevo usuario (solo Admin+).
- `PUT /users/:id` - Actualizar información detallada de un usuario.
- `DELETE /users/:id` - Eliminar un usuario del sistema (solo Admin+).
- `POST /bulk-users/upload` - Carga masiva de usuarios desde un archivo Excel (Admin+).
- `GET /bulk-users/template` - Descarga de la plantilla Excel para carga masiva (Admin+).

### Servicios

- `GET /services` - Listar todos los servicios disponibles.
- `POST /services` - Crear un nuevo servicio de bienestar (Admin+).
- `PUT /services/:id` - Actualizar información de un servicio (Admin+).

### Solicitudes

- `GET /requests` - Listar solicitudes (filtrado según roles).
- `POST /requests` - Crear una nueva solicitud de servicio de bienestar.
- `PUT /requests/:id` - Actualizar el estado de una solicitud.

### Remisiones

- `GET /remissions` - Listar las remisiones generadas.
- `POST /remissions` - Crear una remisión basándose en una solicitud (Admin+).
