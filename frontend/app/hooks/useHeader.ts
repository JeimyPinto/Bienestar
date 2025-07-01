import { useState, useEffect } from 'react';

export const useHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra el menú al cambiar tamaño de ventana
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    
    // Solo cerrar en resize, no en scroll para evitar cierres accidentales
    window.addEventListener('resize', closeMenu);

    return () => {
      window.removeEventListener('resize', closeMenu);
    };
  }, []);

  // Cerrar menú con tecla Escape y manejar scroll del body
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el menú está abierto
      document.body.classList.add('mobile-menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    console.log('Toggle menu called, current state:', menuOpen); // Debug
    setMenuOpen(prev => {
      console.log('Setting menu to:', !prev); // Debug
      return !prev;
    });
  };

  const closeMenu = () => {
    console.log('Close menu called'); // Debug
    setMenuOpen(false);
  };

  return {
    menuOpen,
    toggleMenu,
    closeMenu,
    setMenuOpen
  };
};
