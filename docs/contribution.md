# 🤝 Contribución

Esta sección detalla cómo puedes contribuir al proyecto Bienestar y cuáles son los estándares de código que seguimos.

## Para Contribuir

1.  **Fork el Repositorio**: Haz un fork de este repositorio en GitHub.
2.  **Crea una Rama**: Crea una nueva rama para tu nueva funcionalidad o corrección (`git checkout -b feature/nueva-funcionalidad`).
3.  **Realiza Cambios**: Realiza tus cambios y asegúrate de seguir los estándares del proyecto.
4.  **Haz un Commit**: Registra tus cambios con un mensaje descriptivo (`git commit -am 'Agregar nueva funcionalidad'`).
5.  **Push a la Rama**: Sube tus cambios a tu repositorio fork (`git push origin feature/nueva-funcionalidad`).
6.  **Crea un Pull Request**: Abre un Pull Request desde tu repositorio fork al repositorio original.

## Estándares de Código

- **ESLint**: Configurado para asegurar la calidad y consistencia del código tanto en JavaScript como en TypeScript.
- **Prettier**: Utilizado para el formateo consistente del código en todo el proyecto.
- **Comentarios Significativos**: Añade comentarios en bloques de código complejos para explicar la lógica.
- **Nombres Descriptivos**: Usa nombres claros e intuitivos para variables, funciones y clases.
- **Validación con Zod**: Todos los endpoints del backend que reciben datos de entrada deben estar validados con esquemas Zod.
- **TypeScript**: Se recomienda encarecidamente el uso de tipos fuertes en el frontend para prevenir errores comunes.
