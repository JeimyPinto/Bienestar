# 🌟 Sistema de Gestión de Servicios de Bienestar al Aprendiz - SENA

Arquitectura full-stack diseñada para la orquestación integral de servicios de bienestar, gestión de identidades y flujos de remisión. Implementada con una API RESTful en **Express.js** y un frontend reactivo en **Next.js 14**, utilizando **PostgreSQL** como sistema de gestión de base de datos relacional y **Render** como plataforma de despliegue automatizado.

## 🛠️ Especificaciones Técnicas

- 🔐 **Seguridad**: Autenticación basada en **JWT (JSON Web Tokens)** con persistencia en `localStorage` y validación mediante middlewares de ruta.
- 👥 **Autorización RBAC**: Control de acceso basado en roles jerárquicos (USER → INSTRUCTOR → ADMIN → SUPERADMIN) para la segregación de funciones.
- 📧 **Integración de Mensajería**: Sistema automatizado de notificaciones vía SMTP con registro de logs y trazabilidad de entrega.
- 🎯 **Gestión Modular**: Organización de servicios por dominios funcionales mediante esquemas de color y categorización lógica.
- 📝 **Motor de Workflow**: Gestión del ciclo de vida de solicitudes y remisiones con persistencia de estados y auditoría de cambios.
- 👤 **Gestión de Identidades (IAM)**: CRUD avanzado de usuarios con validación de esquemas, sanitización de datos y protección de PII (Personally Identifiable Information).
- 📊 **Procesamiento Batch**: Ingesta masiva de datos desde archivos Excel para el aprovision

---

## 📖 Índice de Documentación

Para obtener información detallada sobre el proyecto, consulta los siguientes documentos en la carpeta `docs/`:

| Sección | Descripción | Enlace directo |
| :--- | :--- | :--- |
| 🏛️ **Arquitectura** | Estructura del proyecto y tecnologías utilizadas. | [docs/structure.md](./docs/structure.md) |
| 📦 **Instalación** | Prerrequisitos y guía de configuración local. | [docs/installation.md](./docs/installation.md) |
| 🌐 **Despliegue** | Guía de despliegue en producción (Render). | [docs/deployment.md](./docs/deployment.md) |
| 📖 **Guía de Uso** | Roles, flujos de trabajo y carga masiva. | [docs/usage.md](./docs/usage.md) |
| 📚 **API** | Documentación de endpoints y Swagger. | [docs/api.md](./docs/api.md) |
| 🔒 **Seguridad** | Medidas de protección y validación de datos. | [docs/security.md](./docs/security.md) |
| 🎨 **UI / Estilos** | Guía de colores por área y diseño responsivo. | [docs/style-guide.md](./docs/style-guide.md) |
| 🚨 **Solución de Problemas** | Errores comunes y cómo solucionarlos. | [docs/troubleshooting.md](./docs/troubleshooting.md) |
| 🤝 **Contribución** | Estándares de código y cómo colaborar. | [docs/contribution.md](./docs/contribution.md) |

---

Desarrollado con ❤️ para el SENA
Sistema de Gestión de Bienestar - Facilitando el acceso a servicios de bienestar al aprendiz
