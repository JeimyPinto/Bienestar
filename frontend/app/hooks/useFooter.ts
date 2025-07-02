"use client";

import { useState, useEffect } from 'react';

interface UseFooterProps {
  scrollThreshold?: number; // píxeles desde arriba para mostrar botón
}

export const useFooter = ({ scrollThreshold = 300 }: UseFooterProps = {}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > scrollThreshold);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
  };

  return {
    showScrollTop,
    scrollToTop
  };
};
