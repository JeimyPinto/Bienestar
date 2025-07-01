import React from 'react';

export interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info';
  title?: string;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  onClose,
  className = ''
}) => {
  const variantConfig = {
    success: {
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30',
      textColor: 'text-success',
      icon: '✅'
    },
    warning: {
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30',
      textColor: 'text-azul-oscuro',
      icon: '⚠️'
    },
    danger: {
      bgColor: 'bg-danger/10',
      borderColor: 'border-danger/30',
      textColor: 'text-danger',
      icon: '❌'
    },
    info: {
      bgColor: 'bg-info/10',
      borderColor: 'border-info/30',
      textColor: 'text-info',
      icon: 'ℹ️'
    }
  };
  
  const config = variantConfig[variant];
  
  return (
    <div 
      className={`
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        border rounded-lg p-4 transition-all duration-300
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <span className="text-lg flex-shrink-0">{config.icon}</span>
          <div className="flex-1">
            {title && (
              <h4 className="font-semibold mb-1">{title}</h4>
            )}
            <div className="text-sm">{children}</div>
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className={`
              ${config.textColor} opacity-70 hover:opacity-100 
              transition-opacity duration-200 p-1 rounded
              focus:outline-none focus:ring-2 focus:ring-current
            `}
            aria-label="Cerrar alerta"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
