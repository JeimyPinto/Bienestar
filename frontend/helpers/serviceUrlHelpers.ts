/**
 * Convierte un área de servicio a un slug URL amigable
 * @param area - El área del servicio
 * @returns Un slug limpio para la URL
 */
export function areaToSlug(area: string): string {
  const slugMap: Record<string, string> = {
    'Salud': 'salud',
    'Arte y Cultura': 'arte-cultura',
    'Deporte y Recreación': 'deporte-recreacion',
    'Apoyo Socioeconomico y Reconocimiento a la Excelencia': 'apoyo-socioeconomico',
    'Apoyo Psicosocial': 'apoyo-psicosocial'
  };
  
  return slugMap[area] || area.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

/**
 * Genera la URL de detalle para un servicio
 * @param area - El área del servicio
 * @param id - El ID del servicio
 * @returns La URL completa del detalle del servicio
 */
export function generateServiceDetailUrl(area: string, id: string | number): string {
  const areaSlug = areaToSlug(area);
  return `/services/${areaSlug}/${id}`;
}

/**
 * Convierte un slug de área de vuelta al nombre completo
 * @param slug - El slug del área
 * @returns El nombre completo del área
 */
export function slugToArea(slug: string): string {
  const areaMap: Record<string, string> = {
    'salud': 'Salud',
    'arte-cultura': 'Arte y Cultura',
    'deporte-recreacion': 'Deporte y Recreación',
    'apoyo-socioeconomico': 'Apoyo Socioeconomico y Reconocimiento a la Excelencia',
    'apoyo-psicosocial': 'Apoyo Psicosocial'
  };
  
  return areaMap[slug] || slug;
}
