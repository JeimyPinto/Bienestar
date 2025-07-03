import React from "react";

interface FormErrorDisplayProps {
  error: string;
  className?: string;
  icon?: boolean;
}

const FormErrorDisplay: React.FC<FormErrorDisplayProps> = ({
  error,
  className = "",
  icon = true
}) => {
  if (!error) return null;

  return (
    <div className={`bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-coral p-4 rounded-lg ${className}`}>
      <div className="flex items-center">
        {icon && (
          <svg 
            className="w-5 h-5 text-coral mr-3 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        )}
        <p className="text-coral font-medium text-sm">{error}</p>
      </div>
    </div>
  );
};

export default FormErrorDisplay;
