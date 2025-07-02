export const REGIONAL_INFO = {
  regionName: "Regional Bolívar",
  centerName: "Centro de Comercio y Servicios",
  address: "Calle 70 No. 34-31, Barrio Boston, Cartagena de Indias - Bolívar",
  scheduleTitle: "Atención al Público",
  schedule: "Lunes a Viernes: 7:00 AM - 5:00 PM"
} as const;

export type RegionalInfoType = typeof REGIONAL_INFO;
