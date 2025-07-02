import { ACTION_CARDS, ActionCard } from "../constants/actionCard";

/**
 * Filtra las tarjetas de acción según el rol del usuario
 * @param userRole - El rol del usuario actual
 * @returns Array de tarjetas disponibles para el usuario
 */
export const getAvailableActionCards = (userRole: string): ActionCard[] => {
  return ACTION_CARDS.filter(card => 
    card.requiredRoles.includes(userRole)
  );
};

/**
 * Obtiene una tarjeta específica por su path
 * @param path - El path de la tarjeta a buscar
 * @returns La tarjeta encontrada o undefined
 */
export const getActionCardByPath = (path: string): ActionCard | undefined => {
  return ACTION_CARDS.find(card => card.path === path);
};

/**
 * Cuenta el número de tarjetas disponibles para un rol específico
 * @param userRole - El rol del usuario
 * @returns Número de tarjetas disponibles
 */
export const getActionCardsCount = (userRole: string): number => {
  return getAvailableActionCards(userRole).length;
};
