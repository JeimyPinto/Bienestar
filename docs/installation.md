# 📦 Instalación y Configuración

Esta sección detalla los prerrequisitos y pasos necesarios para instalar y configurar el sistema Bienestar.

## Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **PostgreSQL** (o MySQL para desarrollo local)
- **Git**

## 1. Clonar e Instalar

```bash
git clone <repository-url>
cd Bienestar

# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

## 2. Configuración del Backend

1. Crear archivo `.env` basado en `.env.example`:

```bash
cd backend
cp .env.example .env
```

2. Configurar variables de entorno en `.env` según tu entorno:

**Para Desarrollo Local (MySQL):**

```env
NODE_ENV=development
DEV_DB_USER=tu_usuario_mysql
DEV_DB_PASSWORD=tu_password_mysql
DEV_DB_NAME=bienestar_app
JWT_SECRET=tu_jwt_secret_super_seguro
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password_gmail
FRONTEND_URL=http://localhost:3000
```

**Para Producción (PostgreSQL en Render):**

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=tu_jwt_secret_super_seguro
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password_gmail
FRONTEND_URL=https://tu-frontend.onrender.com
```

3. Configurar base de datos en `config/config.json` si es necesario

## 3. Configuración de Base de Datos

```bash
# Ejecutar migraciones
npm run migrate:dev

# Ejecutar seeders (datos de prueba)
npm run seed:dev

# O ambos en un comando
npm run migrate-seed:dev
```

## 4. Configuración del Frontend

1. Crear archivo `.env.local` basado en `.env.example`:

```bash
cd frontend
cp .env.example .env.local
```

2. Configurar variables según tu entorno:

**Para Desarrollo:**

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_recaptcha_site_key
```

**Para Producción:**

```env
NEXT_PUBLIC_API_BASE_URL=https://tu-backend.onrender.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_recaptcha_site_key
```

## 🚀 Ejecución en Desarrollo

### Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

### Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🛠️ Scripts Disponibles

### Scripts del Backend

```bash
npm run dev          # Desarrollo con auto-reload
npm start           # Producción
npm run migrate:dev # Migraciones desarrollo
npm run seed:dev    # Seeders desarrollo
npm run migrate-seed:dev # Ambos en desarrollo
npm run migrate     # Migraciones producción
npm run seed        # Seeders producción
npm run migrate-seed # Ambos en producción
npm run undo:all:dev # Limpiar BD desarrollo
```

### Scripts del Frontend

```bash
npm run dev    # Desarrollo
npm run build  # Construir para producción
npm start      # Servidor de producción
npm run lint   # Linting
```
