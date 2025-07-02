/**
 * Helpers relacionados con tiempo y fechas
 */

/**
 * Obtiene el saludo apropiado según la hora del día
 * @returns string - "Buenos días", "Buenas tardes" o "Buenas noches"
 */
export const getCurrentTimeGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
};

/**
 * Formatea una fecha para mostrar en español
 * @param date - Fecha a formatear
 * @param options - Opciones de formato
 * @returns string - Fecha formateada
 */
export const formatDateInSpanish = (
  date: Date = new Date(),
  options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
): string => {
  return date.toLocaleDateString('es-ES', options);
};

/**
 * Obtiene el día del mes con formato de 2 dígitos
 * @param date - Fecha (por defecto hoy)
 * @returns string - Día del mes (ej: "01", "15", "31")
 */
export const getDayOfMonth = (date: Date = new Date()): string => {
  return date.toLocaleDateString('es-ES', { day: '2-digit' });
};

/**
 * Obtiene el mes abreviado en español
 * @param date - Fecha (por defecto hoy)
 * @returns string - Mes abreviado (ej: "ene", "feb", "mar")
 */
export const getAbbreviatedMonth = (date: Date = new Date()): string => {
  return date.toLocaleDateString('es-ES', { month: 'short' });
};

/**
 * Obtiene información completa del tiempo y fecha actual
 * @returns object - Información de tiempo y fecha
 */
export const getCurrentTimeInfo = () => {
  const now = new Date();
  
  return {
    greeting: getCurrentTimeGreeting(),
    fullDate: formatDateInSpanish(now),
    dayOfMonth: getDayOfMonth(now),
    abbreviatedMonth: getAbbreviatedMonth(now),
    hour: now.getHours(),
    minute: now.getMinutes(),
    timestamp: now.getTime()
  };
};
