import { useState, useEffect } from 'react';

export const useHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra el menú al navegar o cambiar tamaño
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    
    // Eventos que deben cerrar el menú
    const events = ['resize', 'scroll'];
    
    events.forEach(event => {
      window.addEventListener(event, closeMenu);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, closeMenu);
      });
    };
  }, []);

  // Cerrar menú con tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return {
    menuOpen,
    toggleMenu,
    closeMenu,
    setMenuOpen
  };
};
