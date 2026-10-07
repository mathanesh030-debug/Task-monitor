import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  currentTime?: string;
  className?: string;
  showBezel?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  currentTime = '9:41',
  className = '',
  showBezel = true
}) => {
  return (
    <div
      className={`relative flex flex-col w-[360px] h-[740px] max-w-full overflow-hidden transition-all duration-300 ${
        showBezel
          ? 'rounded-[46px] border-[10px] border-slate-900 bg-[#162f9b] phone-bezel-shadow ring-1 ring-white/15'
          : 'rounded-3xl bg-[#162f9b]'
      } ${className}`}
    >
      {/* Mobile Top Status Bar */}
      <div className="relative z-30 flex items-center justify-between px-7 pt-3.5 pb-1 select-none text-white text-[13px] font-semibold tracking-tight">
        <span>{currentTime}</span>

        {/* Dynamic Notch / Speaker Bar */}
        <div className="w-20 h-4 bg-slate-950/80 rounded-full flex items-center justify-center space-x-1.5 opacity-90">
          <div className="w-2 h-2 rounded-full bg-slate-900 ring-1 ring-slate-800" />
          <div className="w-8 h-1 rounded-full bg-slate-800" />
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Cellular signal bars */}
          <div className="flex items-end space-x-[2px] h-3">
            <div className="w-[2.5px] h-1.5 bg-white rounded-xs" />
            <div className="w-[2.5px] h-2 bg-white rounded-xs" />
            <div className="w-[2.5px] h-2.5 bg-white rounded-xs" />
            <div className="w-[2.5px] h-3 bg-white rounded-xs" />
          </div>
          <Wifi className="w-3.5 h-3.5" strokeWidth={2.5} />
          <Battery className="w-4 h-4" strokeWidth={2.5} />
        </div>
      </div>

      {/* Screen Interactive Content Area */}
      <div className="relative flex-1 flex flex-col overflow-hidden">
        {children}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="relative z-30 pt-1 pb-2 flex justify-center pointer-events-none select-none">
        <div className="w-28 h-1 rounded-full bg-white/40" />
      </div>
    </div>
  );
};
