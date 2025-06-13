# 🌟 Bienestar App

Aplicación web para la gestión de servicios, usuarios y solicitudes, con backend en Express y frontend en Next.js. Incluye autenticación JWT, control de roles, documentación Swagger y manejo de archivos.

## 📁 Estructura del Proyecto

```plaintext
Bienestar/
├── backend/
│   ├── app.js
│   ├── swagger.yaml
│   ├── .env
│   ├── api.rest
│   ├── config/
│   │   ├── config.json
│   │   ├── database.js
│   │   └── multer.js
│   ├── constants/
│   │   └── roles.js
│   ├── controllers/
│   │   ├── auth.js
│   │   ├── error.js
│   │   ├── file.js
│   │   ├── request.js
│   │   ├── service.js
│   │   └── user.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── index.js
│   │   ├── request.js
│   │   ├── service.js
│   │   └── user.js
│   ├── schemas/
│   ├── seeders/
│   ├── uploads/
│   └── utils/
├── frontend/
│   ├── app/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
```

## 📦 Instalación

1. Clona el repositorio y entra a la carpeta del proyecto.
2. Instala dependencias en backend y frontend:

```sh
cd backend && npm install
cd ../frontend && npm install
```

## ⚙️ Configuración

- Crea un archivo `.env` en `backend/` con las variables necesarias (puerto, JWT_SECRET, datos de BD, etc).
- Configura la base de datos en `backend/config/config.json`.

## 📜 Migraciones y Seeders

Para ejecutar migraciones y seeders:

```sh
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## 🚀 Ejecución

Para iniciar el backend:

```sh
cd backend
npm run dev
```

Para iniciar el frontend:

```sh
cd frontend
npm run dev
```

## 📚 Documentación de la API

- La documentación interactiva está disponible en: [http://localhost:4000/api-docs](http://localhost:4000/api-docs)
- El archivo fuente es `backend/swagger.yaml`.

## 🔒 Seguridad y Roles

- Muchas rutas requieren autenticación JWT y roles específicos (ADMIN, SUPERADMIN, INSTRUCTOR, USER).
- Consulta la documentación Swagger para saber qué rutas requieren token y qué roles pueden acceder.

## 📂 Otros recursos

- `api.rest`: Ejemplos de peticiones HTTP para probar la API.
- `uploads/`: Carpeta donde se almacenan imágenes y archivos subidos.

## 🤝 Contribución

¿Quieres contribuir? Abre un issue o pull request.

---

Este README proporciona una visión general actualizada de la estructura y funcionamiento del proyecto Bienestar App.