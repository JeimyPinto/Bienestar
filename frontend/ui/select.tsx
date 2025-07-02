import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
  options: Array<{ value: string | number; label: string; disabled?: boolean }>;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  icon,
  helperText,
  options,
  placeholder,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-semibold text-azul-oscuro mb-2 flex items-center"
        >
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          id={selectId}
          className={`
            w-full px-4 py-3 border-2 rounded-lg transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            hover:border-azul-claro/70 bg-white text-azul-oscuro cursor-pointer
            ${error 
              ? 'border-danger/50 focus:ring-danger focus:border-danger' 
              : 'border-azul-cielo/40'
            }
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
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

export default Select;
