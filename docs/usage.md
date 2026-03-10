# 📖 Guía de Uso y Características

Esta sección describe cómo utilizar el sistema, sus roles, flujos de trabajo principales y características especiales.

## Roles y Permisos

- **USER**: Crear y ver sus propias solicitudes.
- **INSTRUCTOR**: Gestionar solicitudes de sus grupos asignados.
- **ADMIN**: Gestión completa de servicios, usuarios y solicitudes de su área de bienestar.
- **SUPERADMIN**: Acceso total a todas las funcionalidades del sistema.

## Flujo de Trabajo Principal

1.  **Registro de Usuarios**: Los usuarios se registran en el sistema y pueden empezar a crear solicitudes de servicios de bienestar.
2.  **Gestión de Grupos**: Los instructores revisan y procesan solicitudes de sus grupos asignados.
3.  **Gestión de Solicitudes**: Los administradores de cada área gestionan las solicitudes y pueden crear remisiones.
4.  **Notificaciones**: El sistema envía correos automáticos cuando ocurren acciones importantes.
5.  **Auditoría**: Todas las acciones críticas son registradas en el log de auditoría para seguimiento.

## Carga Masiva de Usuarios (Solo Administradores)

La funcionalidad de carga masiva permite a los administradores crear múltiples usuarios de forma eficiente desde archivos Excel.

### Proceso de Carga:

1.  **Descargar Plantilla**: Obtener el archivo Excel con el formato correcto desde el sistema.
2.  **Completar Datos**: Llenar la plantilla con: `firstName`, `lastName`, `documentType`, `documentNumber`, `phone`, `email`.
3.  **Subir Archivo**: Cargar el Excel completado al sistema para su procesamiento.
4.  **Revisión de Resultados**: El sistema genera un reporte con usuarios creados, duplicados y errores detectados.

### Características de la Carga Masiva:

- ✅ **Validación Automática**: Formatos de emails y tipos de documento.
- ✅ **Detección de Duplicados**: Emails o documentos que ya existen no se vuelven a crear.
- ✅ **Correos Automáticos**: Envío de credenciales de bienvenida (contraseña inicial es el número de documento).
- ✅ **Reporte Detallado**: Estadísticas completas de la importación.

## Características Especiales del Sistema

- **Interfaz Responsiva**: Diseñada para funcionar en dispositivos móviles (vistas en cards) y en desktop (vistas de tabla).
- **Códigos de Color**: Cada área de bienestar tiene un color distintivo que ayuda a la rápida identificación visual de servicios.
- **Notificaciones por Correo**: Automatizadas para el flujo de solicitudes y registro de usuarios.
- **Protección de Datos**: Los campos sensibles nunca se exponen en las respuestas de la API.
- **Validación Robusta**: Todos los inputs son validados y sanitizados mediante Zod y middlewares especializados.
