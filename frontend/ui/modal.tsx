import React from 'react';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw]'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-azul-marino/95 backdrop-blur-md"
        onClick={onClose}
        aria-label="Cerrar modal"
      />
      
      {/* Modal content */}
      <div
        className={`
          relative bg-gradient-to-br from-white via-beige-claro/20 to-azul-cielo/10 
          rounded-xl shadow-2xl border border-azul-claro/20 
          ${sizeClasses[size]} w-full mx-4 max-h-[90vh] overflow-hidden
          backdrop-blur-sm animate-fade-in-up
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="bg-gradient-to-r from-azul-claro to-azul-oscuro px-6 py-4 rounded-t-xl">
            <div className="flex justify-between items-center">
              {title && (
                <h2 className="text-xl font-bold text-white">{title}</h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
                  aria-label="Cerrar"
                  type="button"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
