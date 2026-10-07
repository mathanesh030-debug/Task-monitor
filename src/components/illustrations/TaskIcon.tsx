import React from 'react';
import type { TaskIconType } from '../../types';

interface TaskIconProps {
  type: TaskIconType;
  className?: string;
  size?: number;
}

export const TaskIcon: React.FC<TaskIconProps> = ({ type, className = '', size = 44 }) => {
  switch (type) {
    case 'book':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Blue Book */}
          <rect x="8" y="10" width="24" height="30" rx="3" fill="#42A5F5" />
          <rect x="6" y="10" width="4" height="30" rx="2" fill="#1E88E5" />
          <line x1="14" y1="18" x2="26" y2="18" stroke="#E3F2FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="24" x2="26" y2="24" stroke="#E3F2FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="30" x2="22" y2="30" stroke="#E3F2FD" strokeWidth="2" strokeLinecap="round" />
          {/* Pencil leaning on book */}
          <g transform="translate(20, 12) rotate(32)">
            <rect x="0" y="0" width="6" height="22" rx="1.5" fill="#FFB300" />
            <path d="M0 22 L3 27 L6 22 Z" fill="#FFE082" />
            <path d="M2 25 L3 27 L4 25 Z" fill="#37474F" />
            <rect x="0" y="0" width="6" height="4" rx="1" fill="#FF5252" />
          </g>
          {/* Small sparkles */}
          <circle cx="36" cy="12" r="1.5" fill="#FFD54F" />
          <circle cx="38" cy="28" r="1" fill="#80D8FF" />
        </svg>
      );

    case 'palette':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Palette body */}
          <path
            d="M24 7C13.5 7 5 15.5 5 26C5 32 9.5 37 15.5 37C17.5 37 19.5 35.5 19.5 33.5C19.5 32 18.5 31 18.5 29.5C18.5 27.5 20.5 25.5 22.5 25.5H27C34.5 25.5 41 19 41 11.5C41 9 39 7 36.5 7H24Z"
            fill="#FFF9E6"
          />
          {/* Thumb hole */}
          <circle cx="33" cy="20" r="3.5" fill="#1C3580" />
          {/* Colorful paint blobs */}
          <circle cx="14" cy="17" r="3" fill="#FF4081" />
          <circle cx="21" cy="13" r="3" fill="#FFD54F" />
          <circle cx="29" cy="12" r="3" fill="#00E5FF" />
          <circle cx="13" cy="25" r="2.8" fill="#7C4DFF" />
          {/* Paintbrush */}
          <g transform="translate(18, 18) rotate(45)">
            <rect x="0" y="0" width="4" height="24" rx="2" fill="#8D6E63" />
            <rect x="0" y="0" width="4" height="6" fill="#B0BEC5" />
            <path d="M0 0 C0 -3, 4 -3, 4 0 Z" fill="#FF5252" />
          </g>
        </svg>
      );

    case 'money':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Coin sack */}
          <path
            d="M17 17C17 14 20 12 24 12C28 12 31 14 31 17L33 20H15L17 17Z"
            fill="#FFE082"
          />
          <path
            d="M14 20C10 23 8 28 8 33C8 38 15 41 24 41C33 41 40 38 40 33C40 28 38 23 34 20H14Z"
            fill="#FFF8E1"
          />
          {/* Ribbon tie */}
          <rect x="15" y="19" width="18" height="3" rx="1.5" fill="#FF5252" />
          {/* Star symbol on sack */}
          <path
            d="M24 26L25.3 29.5H29L26 31.7L27.2 35.2L24 33L20.8 35.2L22 31.7L19 29.5H22.7L24 26Z"
            fill="#FFB300"
          />
          {/* Floating gold coin */}
          <circle cx="34" cy="12" r="4.5" fill="#FFD54F" stroke="#FFA000" strokeWidth="1.5" />
          <text x="34" y="14.5" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#E65100">$</text>
        </svg>
      );

    case 'mountain':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Back mountain */}
          <path d="M28 14L41 38H15L28 14Z" fill="#00B0FF" />
          <path d="M28 14L32 21L28 23L24 21L28 14Z" fill="#E1F5FE" />
          {/* Front mountain */}
          <path d="M17 20L31 40H3L17 20Z" fill="#00E5FF" />
          <path d="M17 20L21 27L17 29L13 27L17 20Z" fill="#FFFFFF" />
          {/* Sun / sparkles */}
          <circle cx="36" cy="10" r="3" fill="#FFD54F" />
          <circle cx="8" cy="18" r="1.5" fill="#80D8FF" />
        </svg>
      );

    case 'dumbbell':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="16" y="22" width="16" height="4" rx="2" fill="#ECEFF1" />
          <rect x="12" y="15" width="4" height="18" rx="2" fill="#FF7043" />
          <rect x="7" y="18" width="4" height="12" rx="2" fill="#FF5722" />
          <rect x="32" y="15" width="4" height="18" rx="2" fill="#FF7043" />
          <rect x="37" y="18" width="4" height="12" rx="2" fill="#FF5722" />
        </svg>
      );

    case 'code':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="7" y="10" width="34" height="28" rx="5" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <path d="M16 20L11 24L16 28" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 20L37 24L32 28" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="26" y1="18" x2="22" y2="30" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'droplet':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M24 8C24 8 13 22 13 30C13 36.6 17.9 41 24 41C30.1 41 35 36.6 35 30C35 22 24 8 24 8Z" fill="#38BDF8" />
          <path d="M20 25C17 28 17 32 19 35" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'coffee':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M11 16H31V30C31 34.4 27.4 38 23 38H19C14.6 38 11 34.4 11 30V16Z" fill="#FFB74D" />
          <path d="M31 20H34C36.2 20 38 21.8 38 24C38 26.2 36.2 28 34 28H31" stroke="#FF9800" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 10C18 10 19 12 19 13" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 9C24 9 25 11 25 13" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
};
