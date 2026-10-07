import React from 'react';

export const BackgroundWaves: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 375 812"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-35"
        preserveAspectRatio="none"
      >
        {/* Soft curving radial highlight top right */}
        <circle cx="360" cy="180" r="260" fill="url(#waveRadial1)" />

        {/* Large sweeping diagonal wave */}
        <path
          d="M-50 240 C120 230 260 380 420 360 L420 850 L-50 850 Z"
          fill="url(#waveGradient1)"
          opacity="0.4"
        />

        {/* Secondary wave overlay */}
        <path
          d="M-30 480 C140 450 240 600 420 540 L420 850 L-30 850 Z"
          fill="url(#waveGradient2)"
          opacity="0.3"
        />

        <defs>
          <radialGradient id="waveRadial1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="waveGradient1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#172554" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
