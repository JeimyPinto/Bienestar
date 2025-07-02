import React from 'react';

interface RegionalInfoProps {
  regionName: string;
  centerName: string;
  address: string;
  scheduleTitle: string;
  schedule: string;
}

export default function RegionalInfo({
  regionName,
  centerName,
  address,
  scheduleTitle,
  schedule,
}: RegionalInfoProps) {
  return (
    <div className="flex flex-col items-center md:items-start space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
          <span className="text-2xl">🏢</span>
        </div>
        <h3 className="text-xl font-bold text-white">{regionName}</h3>
      </div>
      
      <div className="space-y-3 text-azul-cielo/90">
        <div className="flex items-start space-x-2 group">
          <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform duration-200">🏭</span>
          <p className="text-sm leading-relaxed group-hover:text-white transition-colors duration-200">
            {centerName}
          </p>
        </div>
        
        <div className="flex items-start space-x-2 group">
          <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform duration-200">📍</span>
          <p className="text-sm leading-relaxed group-hover:text-white transition-colors duration-200">
            {address}
          </p>
        </div>
        
        <div className="flex items-start space-x-2 group">
          <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform duration-200">🕐</span>
          <div className="text-sm leading-relaxed group-hover:text-white transition-colors duration-200">
            <p className="font-medium">{scheduleTitle}</p>
            <p className="text-xs text-azul-cielo/70 group-hover:text-white/80">
              {schedule}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
