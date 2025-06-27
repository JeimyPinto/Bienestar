/**
 * Funciones de utilidad para filtrado de datos
 */

/**
 * Filtra usuarios por nombre, apellido o número de documento
 * @param users - Array de usuarios a filtrar
 * @param filter - Término de búsqueda
 * @returns Array de usuarios filtrados
 */
export const filterUsers = <T extends { firstName: string; lastName: string; documentNumber: string }>(
  users: T[],
  filter: string
): T[] => {
  if (!filter || !filter.trim()) {
    return users;
  }

  const searchTerm = filter.toLowerCase().trim();
  
  return users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm) ||
    user.lastName.toLowerCase().includes(searchTerm) ||
    user.documentNumber.toLowerCase().includes(searchTerm)
  );
};

/**
 * Filtra servicios por nombre o descripción
 * @param services - Array de servicios a filtrar
 * @param filter - Término de búsqueda
 * @returns Array de servicios filtrados
 */
export const filterServices = <T extends { name: string; description?: string }>(
  services: T[],
  filter: string
): T[] => {
  if (!filter || !filter.trim()) {
    return services;
  }

  const searchTerm = filter.toLowerCase().trim();
  
  return services.filter(service =>
    service.name.toLowerCase().includes(searchTerm) ||
    (service.description && service.description.toLowerCase().includes(searchTerm))
  );
};

/**
 * Filtra grupos por nombre o código
 * @param groups - Array de grupos a filtrar
 * @param filter - Término de búsqueda
 * @returns Array de grupos filtrados
 */
export const filterGroups = <T extends { name: string; code?: string }>(
  groups: T[],
  filter: string
): T[] => {
  if (!filter || !filter.trim()) {
    return groups;
  }

  const searchTerm = filter.toLowerCase().trim();
  
  return groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm) ||
    (group.code && group.code.toLowerCase().includes(searchTerm))
  );
};

/**
 * Función genérica para filtrar cualquier array de objetos por campos específicos
 * @param items - Array de elementos a filtrar
 * @param filter - Término de búsqueda
 * @param fields - Campos por los cuales filtrar
 * @returns Array de elementos filtrados
 */
export const filterByFields = <T extends Record<string, unknown>>(
  items: T[],
  filter: string,
  fields: (keyof T)[]
): T[] => {
  if (!filter || !filter.trim()) {
    return items;
  }

  const searchTerm = filter.toLowerCase().trim();
  
  return items.filter(item =>
    fields.some(field => {
      const value = item[field];
      return value && 
             typeof value === 'string' && 
             value.toLowerCase().includes(searchTerm);
    })
  );
};

/**
 * Filtra elementos con búsqueda avanzada (múltiples términos)
 * @param items - Array de elementos a filtrar
 * @param filter - Términos de búsqueda separados por espacios
 * @param fields - Campos por los cuales filtrar
 * @returns Array de elementos filtrados
 */
export const advancedFilter = <T extends Record<string, unknown>>(
  items: T[],
  filter: string,
  fields: (keyof T)[]
): T[] => {
  if (!filter || !filter.trim()) {
    return items;
  }

  const searchTerms = filter.toLowerCase().trim().split(/\s+/);
  
  return items.filter(item =>
    searchTerms.every(term =>
      fields.some(field => {
        const value = item[field];
        return value && 
               typeof value === 'string' && 
               value.toLowerCase().includes(term);
      })
    )
  );
};
