import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-semibold text-azul-oscuro mb-2 flex items-center"
        >
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          className={`
            w-full px-4 py-3 border-2 rounded-lg transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            hover:border-azul-claro/70 bg-white text-azul-oscuro
            placeholder-azul-marino/50
            ${error 
              ? 'border-danger/50 focus:ring-danger focus:border-danger' 
              : 'border-azul-cielo/40'
            }
            ${className}
          `}
          {...props}
        />
      </div>
      
      {(error || helperText) && (
        <div className="mt-2">
          {error && (
            <p className="text-sm text-danger flex items-center">
              <span className="mr-1">⚠️</span>
              {error}
            </p>
          )}
          {helperText && !error && (
            <p className="text-sm text-azul-marino/70">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
