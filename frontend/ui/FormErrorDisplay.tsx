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
    <div className={`bg-danger/5 border border-danger/20 p-4 rounded-2xl flex items-center justify-between gap-4 animate-shake ${className}`}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-danger"
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
          </div>
        )}
        <p className="text-danger font-sans font-medium text-sm leading-tight">{error}</p>
      </div>
    </div>
  );
};

export default FormErrorDisplay;
