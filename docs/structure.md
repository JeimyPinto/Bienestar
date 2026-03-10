# 🏛️ Arquitectura del Sistema

Esta sección detalla la arquitectura técnica y la estructura de archivos del proyecto Bienestar.

## Backend (Express.js)

- **API RESTful** con arquitectura MVC
- **PostgreSQL** como base de datos principal (con soporte MySQL)
- **Sequelize ORM** para modelado y migraciones
- **JWT Authentication** con localStorage (sin dependencia de cookies)
- **Middleware robusto** para autenticación, autorización y validación
- **Sistema de correos** con Nodemailer y logs coloridos con Chalk
- **Multer** para manejo seguro de archivos e imágenes
- **Zod** para validación estricta de esquemas y datos
- **Sistema de auditoría** que registra todas las acciones importantes
- **Protección de datos sensibles** con middleware especializado

## Frontend (Next.js 14)

- **React 18** con TypeScript y App Router
- **Tailwind CSS** para estilos modernos y responsivos
- **Hooks personalizados** para manejo de estado y autenticación
- **Componentes reutilizables** con props tipadas
- **Interfaz adaptativa** con vistas específicas para desktop y mobile
- **Token management** completamente en localStorage
- **Esquemas de color consistentes** por áreas de bienestar
- **Formularios con validación** y manejo de errores
- **Navegación protegida** basada en roles de usuario

## 📁 Estructura del Proyecto

```plaintext
Bienestar/
├── backend/               # Servidor Express.js & API REST
│   ├── config/            # Configuración de BD y variables
│   ├── controllers/       # Lógica de negocio por módulo
│   ├── middleware/        # Seguridad, roles y validaciones
│   ├── models/            # Modelos de Sequelize (PostgreSQL)
│   ├── routes/            # Definición de endpoints
│   └── utils/             # Servicios de email, logs y archivos
├── frontend/              # Cliente Next.js 14 (App Router)
│   ├── src/app/           # Páginas y layout del sistema
│   ├── src/components/    # UI components y elementos comunes
│   ├── src/hooks/         # Gestión de estado y auth
│   └── src/services/      # Comunicación con el backend
└── docs/                  # Documentación y recursos adicionales
```

### Detalle de Directorios

#### Backend
- `app.js`: Servidor principal Express
- `swagger.yaml`: Documentación API
- `config/`: Configuración y conexión a base de datos
- `controllers/`: Lógica de controladores (auth, user, bulkUser, service, request, remission, group, audit_log)
- `helpers/`: Funciones auxiliares (createToken, hash, verifyRecaptcha)
- `middlewares/`: Middleware personalizado (auth, authorizeRoles, validateSchema, fileUpload)
- `models/`: Modelos Sequelize (user, service, request, remission, group, audit_log)
- `routes/`: Definición de rutas
- `schemas/`: Esquemas de validación Zod
- `services/`: Lógica de negocio (mail, user, bulkUser, service, auditLog)
- `uploads/`: Archivos subidos (imágenes)

#### Frontend
- `app/`: App Router (Next.js 14) con layouts y páginas
- `auth/`, `dashboard/`, `users/`, `services/`, `requests/`, `remissions/`, `groups/`, `audits/`: Módulos del sistema
- `hooks/`: Hooks personalizados como `useAuth.ts`
- `components/`: Componentes reutilizables y específicos por módulo
- `lib/`: Utilidades como `roles.ts` y `tokenManager.ts`
- `services/`: Comunicación con la API
- `styles/`: Estilos globales y temas (areaColors.ts)
- `types/`: Tipado TypeScript
- `ui/`: Componentes UI atómicos/reutilizables
