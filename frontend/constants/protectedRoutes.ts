/**
 * Rutas que requieren autenticación
 */
export const PROTECTED_ROUTES = [
  "/dashboard",
  "/users",
  "/groups", 
  "/requests",
  "/audits",
  "/remissions",
];

/**
 * Rutas públicas (no requieren autenticación)
 */
export const PUBLIC_ROUTES = [
  "/",
  "/auth",
  "/services",
];
