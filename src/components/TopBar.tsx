import React from 'react';
import { Layers, Smartphone, RotateCcw, Calendar, Flame, CheckCircle2 } from 'lucide-react';
import type { DisplayMode } from '../types';

interface TopBarProps {
  displayMode: DisplayMode;
  onSelectDisplayMode: (mode: DisplayMode) => void;
  activePreset: '2019' | 'live';
  onTogglePreset: () => void;
  onResetData: () => void;
  completedTasks: number;
  totalTasks: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  displayMode,
  onSelectDisplayMode,
  activePreset,
  onTogglePreset,
  onResetData,
  completedTasks,
  totalTasks
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-4 py-3 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#162f9b] to-[#00c2ff] flex items-center justify-center shadow-md">
            <span className="text-white font-extrabold text-lg tracking-tighter">TM</span>
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>Task & Habit Monitor</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                UI/UX Design
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Interactive high-fidelity productivity dashboard
            </p>
          </div>
        </div>

        {/* Center: Mode Toggles */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => onSelectDisplayMode('desktop')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              displayMode === 'desktop'
                ? 'bg-gradient-to-r from-blue-600 to-[#00c2ff] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Desktop Dashboard</span>
          </button>

          <button
            onClick={() => onSelectDisplayMode('triple')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              displayMode === 'triple'
                ? 'bg-gradient-to-r from-blue-600 to-[#00c2ff] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile Showcase</span>
            <span className="sm:hidden">Showcase</span>
          </button>

          <button
            onClick={() => onSelectDisplayMode('phone')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              displayMode === 'phone'
                ? 'bg-gradient-to-r from-blue-600 to-[#00c2ff] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Phone Simulator</span>
            <span className="sm:hidden">Phone</span>
          </button>
        </div>


        {/* Right Actions: Date Preset, Progress, Streak, Reset */}
        <div className="flex items-center space-x-2">
          {/* Completed Pill */}
          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{completedTasks}/{totalTasks} Done</span>
          </div>

          {/* Streak indicator */}
          <div className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>5 Day Streak</span>
          </div>

          {/* Preset Switcher */}
          <button
            onClick={onTogglePreset}
            title="Toggle between April 8 2019 and Today"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Preset: {activePreset === '2019' ? 'April 8, 2019' : 'Live Today'}</span>
          </button>

          {/* Reset button */}
          <button
            onClick={onResetData}
            title="Reset to default tasks"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

