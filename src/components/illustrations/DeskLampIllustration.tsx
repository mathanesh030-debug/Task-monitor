import React from 'react';

export const DeskLampIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-56 flex items-center justify-center overflow-visible select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          {/* Light Glow Gradient */}
          <radialGradient id="lampGlow" cx="60%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#FFF176" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#FFE082" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFD54F" stopOpacity="0" />
          </radialGradient>

          {/* Book Gradient */}
          <linearGradient id="bookCoverGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#64B5F6" />
            <stop offset="100%" stopColor="#2196F3" />
          </linearGradient>

          {/* Lamp Shade Gradient */}
          <linearGradient id="lampShadeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>

          {/* Base Gradient */}
          <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6E6E" />
            <stop offset="100%" stopColor="#E91E63" />
          </linearGradient>
        </defs>

        {/* Ambient Lamp Beam / Glow */}
        <polygon
          points="165,65 50,195 210,195"
          fill="url(#lampGlow)"
        />

        {/* Confetti Particles floating around */}
        {/* Yellow round particle */}
        <circle cx="108" cy="38" r="4.5" fill="#FFCA28" />
        {/* Cyan diamond */}
        <rect x="235" y="85" width="7" height="7" rx="1.5" transform="rotate(45 235 85)" fill="#00E5FF" />
        {/* Pink disc */}
        <circle cx="225" cy="52" r="3.5" fill="#FF4081" />
        {/* Orange small square */}
        <rect x="110" y="115" width="6" height="6" rx="1" fill="#FF9100" />
        {/* Yellow sparkle */}
        <circle cx="70" cy="110" r="2.5" fill="#FFE57F" />
        {/* Cyan circle right */}
        <circle cx="260" cy="130" r="3" fill="#80D8FF" />

        {/* Lamp Base (Pink/Coral dome) */}
        <path
          d="M178 195 C178 178 218 178 218 195 Z"
          fill="url(#baseGrad)"
        />
        <ellipse cx="198" cy="195" rx="20" ry="3" fill="#D81B60" />

        {/* Lamp Stem / Arm */}
        {/* Lower Arm */}
        <line x1="198" y1="180" x2="225" y2="115" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
        <line x1="198" y1="180" x2="225" y2="115" stroke="#ECEFF1" strokeWidth="2" strokeLinecap="round" />

        {/* Joint Pin */}
        <circle cx="225" cy="115" r="7" fill="#FFFFFF" />
        <circle cx="225" cy="115" r="3" fill="#FFA000" />

        {/* Upper Arm */}
        <line x1="225" y1="115" x2="185" y2="60" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />

        {/* Lamp Head Joint Pin */}
        <circle cx="185" cy="60" r="6" fill="#FFFFFF" />
        <circle cx="185" cy="60" r="2.5" fill="#FFA000" />

        {/* Lamp Shade (Yellow flared hood) */}
        <g transform="translate(170, 50) rotate(-25)">
          <path
            d="M-5 -2 C5 -15 35 -15 45 -2 C48 10 52 28 55 35 C35 38 5 38 -15 35 C-12 28 -8 10 -5 -2 Z"
            fill="url(#lampShadeGrad)"
          />
          {/* Top cap screw */}
          <ellipse cx="20" cy="-8" rx="8" ry="4" fill="#FFA000" />
          <ellipse cx="20" cy="-9" rx="5" ry="2.5" fill="#FFE082" />
        </g>

        {/* STUDY NOTEBOOK / BOOK */}
        <g transform="translate(115, 115)">
          {/* Shadow beneath book */}
          <ellipse cx="32" cy="78" rx="36" ry="6" fill="rgba(10,20,50,0.3)" />

          {/* Book body */}
          <rect x="0" y="8" width="46" height="66" rx="6" fill="url(#bookCoverGrad)" />
          {/* Inner spine detail */}
          <rect x="0" y="8" width="8" height="66" rx="3" fill="#1976D2" />

          {/* Book lines */}
          <line x1="15" y1="26" x2="38" y2="26" stroke="#BBDEFB" strokeWidth="3" strokeLinecap="round" />
          <line x1="15" y1="36" x2="38" y2="36" stroke="#BBDEFB" strokeWidth="3" strokeLinecap="round" />
          <line x1="15" y1="46" x2="30" y2="46" stroke="#BBDEFB" strokeWidth="3" strokeLinecap="round" />

          {/* Red bookmark ribbon sticking out bottom */}
          <rect x="22" y="68" width="8" height="8" rx="1" fill="#FF5252" />
        </g>

        {/* PENCIL */}
        <g transform="translate(162, 138) rotate(34)">
          {/* Pencil body */}
          <rect x="0" y="0" width="11" height="42" rx="3" fill="#FFB300" />
          <line x1="4" y1="0" x2="4" y2="42" stroke="#FFA000" strokeWidth="1.5" />
          {/* Eraser */}
          <rect x="0" y="0" width="11" height="8" rx="3" fill="#FF5252" />
          <rect x="0" y="7" width="11" height="3" fill="#CFD8DC" />
          {/* Sharpened tip */}
          <path d="M0 42 L5.5 54 L11 42 Z" fill="#FFE082" />
          {/* Graphite lead point */}
          <path d="M3.5 49 L5.5 54 L7.5 49 Z" fill="#263238" />
        </g>
      </svg>
    </div>
  );
};
