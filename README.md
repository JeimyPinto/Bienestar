# 🌟 Bienestar App

Este proyecto es una aplicación simple de Express que utiliza Sequelize como ORM para la gestión de bases de datos. Incluye la configuración para migraciones, seeders y esquemas.

## 📁 Estructura del Proyecto

```plaintext
backend/
├── .env
├── api.rest
├── app.js
├── config/
│   ├── config.json
│   ├── database.js
│   └── multerConfig.js
├── controllers/
│   ├── auth.js
│   ├── service.js
│   └── user.js
├── middlewares/
│   └── auth.js
├── migrations/
│   ├── 20250306224443-create-user.js
│   └── ...
├── models/
│   └── ...
├── routes/
├── schemas/
├── seeders/
├── package.json
├── README.md
```

## ⚙️ Configuración

### Archivo `.env`

Asegúrate de tener un archivo `.env` en la raíz del directorio `backend/` con las variables de entorno necesarias para la configuración de la base de datos y otros parámetros.

### Archivo `config.json`

El archivo `config/config.json` contiene la configuración de la base de datos para diferentes entornos (desarrollo, prueba, producción).

## 📜 Migraciones

Las migraciones se encuentran en el directorio `migrations/`. Puedes crear nuevas migraciones usando el comando:

```sh
npx sequelize-cli migration:generate --name <nombre-de-la-migracion>
```

## 📂 Esquemas

Los esquemas se encuentran en el directorio `schemas/`. Estos se utilizan para la validación de datos de entrada.

## 📬 Requests

El archivo `api.rest` contiene ejemplos de solicitudes HTTP que puedes usar para probar tu API.

## 📦 Instalación

Para instalar las dependencias del proyecto, ejecuta:

```sh
npm install
```

## 🚀 Ejecución

Para iniciar el servidor, ejecuta:

```sh
npm run dev
```

Esto iniciará el servidor en el puerto definido en tu archivo `.env`.

## 🤝 Contribución

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request.

---

Este [README.md](http://_vscodecontentref_/#%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5Cjeimy%5C%5CDesktop%5C%5CProjects%5C%5CSemillero%5C%5CBienestar%5C%5Cbackend%5C%5CREADME.md%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2Fjeimy%2FDesktop%2FProjects%2FSemillero%2FBienestar%2Fbackend%2FREADME.md%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fjeimy%2FDesktop%2FProjects%2FSemillero%2FBienestar%2Fbackend%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%7D) proporciona una visión general clara de la estructura del proyecto y cómo trabajar con él.