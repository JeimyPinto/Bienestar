# 🌟 Sistema de Gestión de Servicios de Bienestar al aprendiz - SENA

Aplicación web completa para la gestión integral de servicios de bienestar, usuarios, solicitudes y remisiones. Desarrollada con **Express.js** (backend) y **Next.js 14** (frontend), desplegada en **Render** con base de datos **PostgreSQL** administrada.

## ✨ Características Principales

- 🔐 **Autenticación JWT segura** con localStorage (sin cookies)
- 👥 **Sistema de roles jerárquico** (USER → INSTRUCTOR → ADMIN → SUPERADMIN)
- 📧 **Sistema de notificaciones por correo** automáticas con logs coloridos
- 🎯 **Gestión de servicios** organizados por áreas de bienestar con códigos de color
- 📝 **Sistema completo de solicitudes** y remisiones con seguimiento de estado
- 👤 **Gestión avanzada de usuarios** con validación y protección de datos sensibles
- 📊 **Carga masiva de usuarios** desde archivos Excel con correos de bienvenida automáticos
- 📋 **Sistema de auditoría completo** de todas las acciones
- 📱 **Interfaz totalmente responsiva** con vistas desktop (tablas) y mobile (cards)
- 🎨 **UI moderna** con Tailwind CSS y esquemas de color consistentes
- 📚 **Documentación API completa** con Swagger
- 🚀 **Desplegado en producción** en Render con CI/CD automático
- 🔒 **Validación robusta** con Zod y sanitización de inputs
- 🖼️ **Manejo de archivos** con Multer para imágenes de usuarios y servicios

## 🏗️ Arquitectura del Sistema

### Backend (Express.js)

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

### Frontend (Next.js 14)

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
Bienestar/
├── backend/
│   ├── app.js                    # Servidor principal Express
│   ├── swagger.yaml              # Documentación API
│   ├── .env                      # Variables de entorno (NO subir a Git)
│   ├── .env.example              # Plantilla de variables de entorno
│   ├── api.rest                  # Ejemplos de peticiones HTTP
│   ├── config/
│   │   ├── config.json           # Configuración BD por entorno
│   │   └── database.js           # Conexión a base de datos
│   ├── constants/
│   │   └── roles.js              # Constantes de roles de usuario
│   ├── controllers/              # Lógica de controladores
│   │   ├── auth.js               # Autenticación y login
│   │   ├── user.js               # Gestión de usuarios
│   │   ├── bulkUser.js           # Carga masiva de usuarios
│   │   ├── service.js            # Gestión de servicios
│   │   ├── request.js            # Gestión de solicitudes
│   │   ├── remission.js          # Gestión de remisiones
│   │   ├── group.js              # Gestión de grupos/fichas
│   │   └── audit_log.js          # Auditoría del sistema
│   ├── helpers/                  # Funciones auxiliares
│   │   ├── createToken.js        # Generación de JWT
│   │   ├── hash.js               # Hashing de contraseñas
│   │   └── verifyRecaptcha.js    # Verificación reCAPTCHA
│   ├── middlewares/              # Middleware personalizado
│   │   ├── auth.js               # Verificación de tokens
│   │   ├── authorizeRoles.js     # Control de roles
│   │   ├── validateSchema.js     # Validación con Zod
│   │   ├── fileUpload.js         # Manejo de archivos
│   │   ├── sanitizeInput.js      # Sanitización de entradas
│   │   ├── sendWelcomeMail.js    # Correos de bienvenida
│   │   ├── sendUpdateMail.js     # Correos de actualización
│   │   └── sendRequestNotificationMail.js # Notificaciones
│   ├── migrations/               # Migraciones de BD
│   ├── models/                   # Modelos Sequelize
│   │   ├── user.js               # Modelo de usuarios
│   │   ├── service.js            # Modelo de servicios
│   │   ├── request.js            # Modelo de solicitudes
│   │   ├── remission.js          # Modelo de remisiones
│   │   ├── group.js              # Modelo de grupos
│   │   └── audit_log.js          # Modelo de auditoría
│   ├── routes/                   # Definición de rutas
│   ├── schemas/                  # Esquemas de validación Zod
│   ├── seeders/                  # Datos iniciales
│   ├── services/                 # Lógica de negocio
│   │   ├── mail.js               # Servicio de correos
│   │   ├── user.js               # Lógica de usuarios
│   │   ├── bulkUser.js           # Lógica de carga masiva
│   │   ├── service.js            # Lógica de servicios
│   │   └── auditLog.js           # Lógica de auditoría
│   ├── uploads/                  # Archivos subidos
│   │   └── images/               # Imágenes de usuarios y servicios
│   └── utils/                    # Utilidades
├── frontend/
│   ├── app/                      # App Router (Next.js 14)
│   │   ├── layout.tsx            # Layout principal
│   │   ├── page.tsx              # Página de inicio
│   │   ├── auth/                 # Páginas de autenticación
│   │   ├── dashboard/            # Panel principal
│   │   ├── users/                # Gestión de usuarios
│   │   ├── services/             # Gestión de servicios
│   │   ├── requests/             # Gestión de solicitudes
│   │   ├── remissions/           # Gestión de remisiones
│   │   ├── groups/               # Gestión de grupos
│   │   ├── audits/               # Auditoría del sistema
│   │   ├── hooks/                # Hooks personalizados
│   │   │   └── useAuth.ts        # Hook de autenticación
│   │   ├── components/           # Componentes reutilizables
│   │   │   └── users/            # Componentes específicos de usuarios
│   │   │       ├── userTable.tsx         # Tabla de usuarios
│   │   │       ├── userForm.tsx          # Formulario de usuarios
│   │   │       └── bulkUploadInstructionsModal.tsx # Modal de instrucciones para carga masiva
│   │   ├── lib/                  # Utilidades y configuración
│   │   │   ├── roles.ts          # Constantes de roles
│   │   │   ├── getToken.ts       # Obtención de tokens
│   │   │   └── tokenManager.ts   # Gestión de tokens localStorage
│   │   ├── services/             # Servicios API
│   │   ├── styles/               # Estilos y temas
│   │   │   └── areaColors.ts     # Colores por área
│   │   ├── types/                # Tipos TypeScript
│   │   └── ui/                   # Componentes UI reutilizables
│   ├── .env.example              # Plantilla de variables de entorno frontend
│   ├── public/                   # Archivos estáticos
│   └── src/                      # Código fuente adicional
```

## 📦 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **PostgreSQL** (o MySQL para desarrollo local)
- **Git**

### 1. Clonar e Instalar

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

### 2. Configuración del Backend

1. Crear archivo `.env` basado en `.env.example`:

```bash
cd backend
cp .env.example .env
```

1. Configurar variables de entorno en `.env` según tu entorno:

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

1. Configurar base de datos en `config/config.json` si es necesario

### 3. Configuración de Base de Datos

```bash
# Ejecutar migraciones
npm run migrate:dev

# Ejecutar seeders (datos de prueba)
npm run seed:dev

# O ambos en un comando
npm run migrate-seed:dev
```

### 4. Configuración del Frontend

1. Crear archivo `.env.local` basado en `.env.example`:

```bash
cd frontend
cp .env.example .env.local
```

1. Configurar variables según tu entorno:

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

## 🌐 Despliegue en Producción

### Backend en Render

1. Conectar repositorio a Render
2. Configurar variables de entorno en el dashboard
3. Usar los siguientes comandos de build:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. Ejecutar migraciones en producción:

   ```bash
   npm run migrate-seed
   ```

### Frontend en Render

1. Conectar repositorio a Render
2. Configurar variables de entorno:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://tu-backend.onrender.com
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key
   ```

3. Usar los siguientes comandos:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

## 📖 Guía de Uso

### Roles y Permisos

- **USER**: Crear y ver sus propias solicitudes
- **INSTRUCTOR**: Gestionar solicitudes de sus grupos asignados
- **ADMIN**: Gestión completa de servicios, usuarios y solicitudes de su área
- **SUPERADMIN**: Acceso total al sistema

### Flujo de Trabajo Principal

1. **Usuarios** se registran y crean solicitudes de servicios
2. **Instructores** revisan y procesan solicitudes de sus grupos
3. **Admins** gestionan servicios y pueden crear remisiones
4. **Sistema** envía notificaciones automáticas por correo
5. **Auditoría** registra todas las acciones importantes

### Carga Masiva de Usuarios (Solo Administradores)

La funcionalidad de carga masiva permite a los administradores crear múltiples usuarios de forma eficiente:

#### Proceso de Carga Masiva:

1. **Descargar Plantilla**: Obtener el archivo Excel con el formato correcto
2. **Completar Datos**: Llenar la plantilla con la información de los usuarios:
   - `firstName`: Nombres del usuario
   - `lastName`: Apellidos del usuario  
   - `documentType`: Tipo de documento (CC, CE, PA, RC, TI, PEP)
   - `documentNumber`: Número de documento único
   - `phone`: Número de teléfono
   - `email`: Correo electrónico único
3. **Subir Archivo**: Cargar el Excel completado al sistema
4. **Revisión de Resultados**: El sistema procesa los datos y genera un reporte con:
   - Usuarios creados exitosamente
   - Registros duplicados (email o documento ya existe)
   - Errores de validación con detalles específicos

#### Características del Sistema de Carga Masiva:

- ✅ **Validación Automática**: Verifica formato de emails, tipos de documento válidos
- ✅ **Detección de Duplicados**: Evita crear usuarios con emails o documentos existentes
- ✅ **Correos Automáticos**: Envía credenciales de bienvenida a cada usuario creado
- ✅ **Contraseña Temporal**: Usa el número de documento como contraseña inicial
- ✅ **Reporte Detallado**: Muestra estadísticas completas del proceso
- ✅ **Tolerancia a Errores**: Continúa procesando aunque algunos registros fallen
- ✅ **Auditoría Completa**: Registra todas las acciones en el log de auditoría

### Características Especiales

- **Interfaz Responsiva**: Tablas en desktop, cards en mobile
- **Códigos de Color**: Cada área de bienestar tiene su color distintivo
- **Notificaciones**: Correos automáticos para acciones importantes
- **Protección de Datos**: Campos sensibles nunca se exponen en respuestas API
- **Validación Robusta**: Todos los inputs son validados y sanitizados
- **Carga Masiva de Usuarios**: Importación de usuarios desde Excel con las siguientes características:
  - Plantilla Excel descargable con formato predefinido
  - Validación automática de datos (emails únicos, tipos de documento válidos)
  - Envío automático de correos de bienvenida con credenciales
  - Reporte detallado de resultados (creados, duplicados, errores)
  - Instrucciones claras y guiadas para el usuario administrador
  - Contraseña temporal basada en número de documento
  - Logs detallados del proceso de importación

## 📚 Documentación y API

### Documentación Interactiva

- **Swagger UI**: Disponible en `http://localhost:4000/api-docs` (desarrollo)
- **Archivo fuente**: `backend/swagger.yaml`
- **Ejemplos de peticiones**: `backend/api.rest`

### Endpoints Principales

#### Autenticación

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `POST /auth/refresh` - Renovar token

#### Usuarios

- `GET /users` - Listar usuarios (Admin+)
- `POST /users` - Crear usuario (Admin+)
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario (Admin+)
- `POST /bulk-users/upload` - Carga masiva desde Excel (Admin+)
- `GET /bulk-users/template` - Descargar plantilla Excel (Admin+)

#### Servicios

- `GET /services` - Listar servicios
- `POST /services` - Crear servicio (Admin+)
- `PUT /services/:id` - Actualizar servicio (Admin+)

#### Solicitudes

- `GET /requests` - Listar solicitudes
- `POST /requests` - Crear solicitud
- `PUT /requests/:id` - Actualizar solicitud

#### Remisiones

- `GET /remissions` - Listar remisiones
- `POST /remissions` - Crear remisión (Admin+)

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

## 🔒 Seguridad y Buenas Prácticas

### Autenticación y Autorización

- Tokens JWT almacenados en localStorage (no cookies)
- Verificación de roles en cada endpoint protegido
- Middleware de autenticación robusto
- Protección CSRF implícita (sin cookies)

### Validación de Datos

- Esquemas Zod para validación estricta
- Sanitización de inputs para prevenir XSS
- Validación de tipos TypeScript en frontend
- reCAPTCHA para prevenir bots

### Protección de Datos

- Campos sensibles removidos automáticamente de respuestas
- Hashing seguro de contraseñas con bcrypt
- Logs de auditoría para todas las acciones críticas
- Manejo seguro de archivos con Multer
- **Variables de entorno protegidas** (archivo `.env` en `.gitignore`)
- **Plantilla `.env.example`** para configuración sin exponer credenciales

## 🎨 Guía de Estilos y UI

### Colores por Área

```typescript
const areaColors = {
  "Salud": "bg-azul text-white",
  "Arte y Cultura": "bg-magenta text-white", 
  "Deporte y Recreación": "text-black bg-colorWpp",
  "Apoyo Socioeconomico y Reconocimiento a la Excelencia": "bg-amarillo text-black",
  "Apoyo Psicosocial": "bg-cian text-black",
};
```

### Diseño Responsivo

- **Desktop**: Tablas con funcionalidad completa
- **Mobile**: Cards optimizadas para touch
- **Breakpoints**: Tailwind CSS estándar
- **Navegación**: Adaptativa según el tamaño de pantalla

## 🚨 Solución de Problemas

### Problemas Comunes

1. **Error de conexión a BD**: Verificar variables de entorno y configuración en `.env`
2. **Variables de entorno faltantes**: Copiar `.env.example` a `.env` y configurar valores
3. **Token inválido**: Limpiar localStorage y volver a iniciar sesión
4. **CORS errors**: Verificar `FRONTEND_URL` en variables de entorno del backend
5. **Correos no se envían**: Verificar configuración SMTP en variables `EMAIL_*`
6. **Archivos no se suben**: Verificar permisos de la carpeta `uploads/`
7. **reCAPTCHA falla**: Verificar claves en variables `RECAPTCHA_*` y dominios permitidos
8. **Carga masiva falla**: 
   - Verificar formato del archivo Excel (.xlsx o .xls)
   - Comprobar que los encabezados coincidan exactamente: `firstName`, `lastName`, `documentType`, `documentNumber`, `phone`, `email`
   - Validar que los tipos de documento sean válidos (CC, CE, PA, RC, TI, PEP)
   - Verificar que emails y números de documento sean únicos
9. **Correos de bienvenida no llegan**: Verificar configuración de correo y revisar logs del servidor

### Logs y Debugging

- Backend usa **Chalk** para logs coloridos
- Frontend usa console en desarrollo
- Auditoría completa en tabla `audit_logs`
- Middleware de error centralizado

## 🤝 Contribución

### Para Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

### Estándares de Código

- **ESLint** configurado para JavaScript/TypeScript
- **Prettier** para formateo consistente
- Comentarios en código complejo
- Nombres descriptivos para variables y funciones
- Validación con Zod para todos los endpoints

---

Desarrollado con ❤️ para el SENA
Sistema de Gestión de Bienestar - Facilitando el acceso a servicios de bienestar al aprendiz