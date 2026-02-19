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
    <div className="flex flex-col items-center md:items-start space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 shadow-sm group hover:scale-110 transition-transform duration-300">
          <span className="text-xl">🏢</span>
        </div>
        <h3 className="text-xl font-display font-bold text-white tracking-tight">{regionName}</h3>
      </div>

      <div className="space-y-4 w-full">
        <div className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
          <div className="w-8 h-8 flex items-center justify-center bg-azul-cielo/10 rounded-lg text-azul-cielo group-hover:bg-azul-cielo group-hover:text-azul-oscuro transition-colors duration-300">
            <span className="text-sm">🏭</span>
          </div>
          <p className="text-sm font-sans leading-relaxed text-white/70 group-hover:text-white transition-colors duration-300">
            {centerName}
          </p>
        </div>

        <div className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
          <div className="w-8 h-8 flex items-center justify-center bg-azul-cielo/10 rounded-lg text-azul-cielo group-hover:bg-azul-cielo group-hover:text-azul-oscuro transition-colors duration-300">
            <span className="text-sm">📍</span>
          </div>
          <p className="text-sm font-sans leading-relaxed text-white/70 group-hover:text-white transition-colors duration-300">
            {address}
          </p>
        </div>

        <div className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
          <div className="w-8 h-8 flex items-center justify-center bg-azul-cielo/10 rounded-lg text-azul-cielo group-hover:bg-azul-cielo group-hover:text-azul-oscuro transition-colors duration-300">
            <span className="text-sm">🕐</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-display font-bold text-white leading-none">{scheduleTitle}</p>
            <p className="text-xs font-sans text-white/50 group-hover:text-white/80">
              {schedule}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
