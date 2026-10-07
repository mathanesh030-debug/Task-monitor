import React, { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Clock, Check, Edit2 } from 'lucide-react';
import type { Task, RepeatDay } from '../../types';
import { DeskLampIllustration } from '../illustrations/DeskLampIllustration';
import { ALL_REPEAT_DAYS } from '../../data/initialTasks';
import confetti from 'canvas-confetti';

interface TaskDetailScreenProps {
  task: Task;
  onBack: () => void;
  onUpdateTask: (updated: Task) => void;
  onFinish: (task: Task) => void;
}

export const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
  task,
  onBack,
  onUpdateTask,
  onFinish
}) => {
  const [currentTask, setCurrentTask] = useState<Task>(task);
  const [isEditing, setIsEditing] = useState(false);

  // Sync state if task prop changes
  React.useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  const toggleDay = (day: RepeatDay) => {
    const nextDays = currentTask.repeatDays.includes(day)
      ? currentTask.repeatDays.filter((d) => d !== day)
      : [...currentTask.repeatDays, day];
    const updated = { ...currentTask, repeatDays: nextDays };
    setCurrentTask(updated);
    onUpdateTask(updated);
  };

  const handleFinish = () => {
    // If not completed, mark complete with confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00E5FF', '#FFD54F', '#FF4081', '#7C4DFF']
    });
    const updated = { ...currentTask, completed: true };
    setCurrentTask(updated);
    onUpdateTask(updated);
    onFinish(updated);
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between bg-gradient-to-b from-[#1b3cbd] via-[#1633a6] to-[#122488] text-white select-none overflow-hidden">
      {/* Top Bar with Back Button */}
      <div className="relative z-20 flex items-center justify-between p-5 pt-3">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-[#142877] flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={() => setIsEditing(!isEditing)}
          title="Toggle edit mode"
          className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-xs font-semibold backdrop-blur-md flex items-center space-x-1.5 cursor-pointer border border-white/10 transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>{isEditing ? 'Done' : 'Edit'}</span>
        </button>
      </div>

      {/* Hero Illustration Header: Desk Lamp, Book & Pencil */}
      <div className="relative z-10 flex-shrink-0 -mt-6 mb-1">
        <DeskLampIllustration />
      </div>

      {/* White Slide-Up Detail Sheet */}
      <div className="relative z-20 flex-1 flex flex-col justify-between bg-white text-slate-800 rounded-t-[36px] px-6 pt-6 pb-5 sheet-shadow overflow-hidden">
        {/* Decorative corner purple shape in bottom right matching original design */}
        <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-[#4934b8] opacity-90 pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col justify-start">
          {/* Top Notch bar indicator */}
          <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto -mt-2 mb-4" />

          {/* Category Tag */}
          <span className="text-[11px] font-extrabold tracking-widest text-[#2f3cb3] uppercase block">
            {currentTask.categoryLabel || `NEW ${currentTask.category}`}
          </span>

          {/* Task Title */}
          {isEditing ? (
            <input
              type="text"
              value={currentTask.title}
              onChange={(e) => {
                const updated = { ...currentTask, title: e.target.value };
                setCurrentTask(updated);
                onUpdateTask(updated);
              }}
              className="text-2xl font-black text-[#1e277a] tracking-tight uppercase border-b-2 border-blue-200 outline-none focus:border-[#00c2ff] py-1 bg-transparent"
            />
          ) : (
            <h2 className="text-[26px] leading-tight font-black text-[#1e277a] tracking-tight uppercase mt-1 mb-4">
              {currentTask.title}
            </h2>
          )}

          {/* Specification Rows */}
          <div className="space-y-3 mt-1">
            {/* Date Range Row */}
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#ff6b81] flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                <CalendarIcon className="w-4 h-4 stroke-[2.5]" />
              </div>

              {isEditing ? (
                <div className="flex items-center space-x-1 flex-1">
                  <input
                    type="text"
                    value={currentTask.startDate}
                    onChange={(e) => {
                      const updated = { ...currentTask, startDate: e.target.value };
                      setCurrentTask(updated);
                      onUpdateTask(updated);
                    }}
                    className="text-xs font-semibold text-slate-700 bg-slate-100 rounded px-2 py-1 w-24 outline-none border border-slate-300"
                  />
                  <span className="text-slate-400">-</span>
                  <input
                    type="text"
                    value={currentTask.endDate}
                    onChange={(e) => {
                      const updated = { ...currentTask, endDate: e.target.value };
                      setCurrentTask(updated);
                      onUpdateTask(updated);
                    }}
                    className="text-xs font-semibold text-slate-700 bg-slate-100 rounded px-2 py-1 w-24 outline-none border border-slate-300"
                  />
                </div>
              ) : (
                <span className="text-xs font-bold text-slate-600 tracking-wide font-mono">
                  {currentTask.startDate}-{currentTask.endDate}
                </span>
              )}
            </div>

            {/* Time Frame Row */}
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-[#febb1b] flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                <Clock className="w-4 h-4 stroke-[2.5]" />
              </div>

              {isEditing ? (
                <input
                  type="text"
                  value={currentTask.timeFrame}
                  placeholder="00:00-23:59"
                  onChange={(e) => {
                    const updated = { ...currentTask, timeFrame: e.target.value };
                    setCurrentTask(updated);
                    onUpdateTask(updated);
                  }}
                  className="text-xs font-semibold text-slate-700 bg-slate-100 rounded px-2 py-1 w-32 outline-none border border-slate-300"
                />
              ) : (
                <span className="text-xs font-bold text-slate-600 tracking-wide font-mono">
                  {currentTask.timeFrame}
                </span>
              )}
            </div>
          </div>

          {/* Repeat Section */}
          <div className="mt-5">
            <span className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase block mb-2.5">
              REPEAT
            </span>

            {/* Repeat Day Chips: Mon, Tues, Wed, Thur, Fri, Sat, Sun */}
            <div className="flex items-center justify-between gap-1">
              {ALL_REPEAT_DAYS.map((day) => {
                const isActive = currentTask.repeatDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`flex-1 py-1 px-0.5 rounded-full text-[10px] font-bold tracking-tight transition-all cursor-pointer text-center ${
                      isActive
                        ? 'bg-[#febb1b] text-white amber-badge-shadow scale-105 font-extrabold'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes or Subtitle */}
          <div className="mt-3.5 text-xs text-slate-500 font-medium">
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
              HABIT TARGET
            </span>
            <p className="mt-0.5 text-slate-700 font-medium italic">
              "{currentTask.subtitle}"
            </p>
          </div>
        </div>

        {/* Bottom FINISH Button */}
        <div className="relative z-10 pt-3">
          <button
            onClick={handleFinish}
            className={`w-full py-3.5 px-6 rounded-full font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              currentTask.completed
                ? 'bg-[#10b981] hover:bg-[#059669] text-white shadow-lg'
                : 'bg-[#00c2ff] hover:bg-[#1ad0ff] text-white cyan-btn-shadow active:scale-[0.98]'
            }`}
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>{currentTask.completed ? 'COMPLETED (SAVE)' : 'FINISH'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
