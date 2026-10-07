import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { Task } from '../../types';
import { TaskIcon } from '../illustrations/TaskIcon';
import { BackgroundWaves } from '../illustrations/BackgroundWaves';
import confetti from 'canvas-confetti';

interface CalendarScreenProps {
  tasks: Task[];
  onBack: () => void;
  onSelectTask: (task: Task) => void;
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({
  tasks,
  onBack,
  onSelectTask,
  onToggleComplete
}) => {
  // Reference date starts at April 2019, day 8
  const [currentYear, setCurrentYear] = useState(2019);
  const [currentMonth, setCurrentMonth] = useState(3); // 0-indexed: 3 = April
  const [selectedDay, setSelectedDay] = useState(8);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate calendar days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(1);
  };

  // Convert selected day to weekday name to match task repeats
  const selectedDateObj = new Date(currentYear, currentMonth, selectedDay);
  const selectedDayOfWeekIndex = selectedDateObj.getDay(); // 0 is Sun
  const dayIndexToRepeatDay: Record<number, string> = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tues',
    3: 'Wed',
    4: 'Thur',
    5: 'Fri',
    6: 'Sat'
  };
  const currentRepeatDay = dayIndexToRepeatDay[selectedDayOfWeekIndex];

  // Filter tasks that repeat on this day
  const filteredTasks = tasks.filter((t) => t.repeatDays.includes(currentRepeatDay as any));

  const handleCheckboxClick = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    if (!task.completed) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00E5FF', '#FFD54F', '#FF4081']
      });
    }
    onToggleComplete(task.id, e);
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between bg-gradient-to-b from-[#1b3cbd] via-[#1633a6] to-[#122488] text-white select-none overflow-hidden">
      <BackgroundWaves />

      {/* Top Bar with Back Button */}
      <div className="relative z-10 flex items-center justify-between p-5 pt-3">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-[#142877] flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Current Month Navigator "< April , 2019 >" */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-full hover:bg-white/10 active:scale-90 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-base font-bold tracking-wide text-white">
            {monthNames[currentMonth]} , {currentYear}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-full hover:bg-white/10 active:scale-90 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Empty placeholder for balance */}
        <div className="w-10" />
      </div>

      {/* Calendar Grid Container */}
      <div className="relative z-10 px-5 pt-1 pb-3 flex-shrink-0">
        {/* Weekday Names */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekdayNames.map((day) => (
            <span
              key={day}
              className="text-[11px] font-semibold text-white/60 uppercase tracking-tight"
            >
              {day}
            </span>
          ))}
        </div>

        {/* Days Matrix */}
        <div className="grid grid-cols-7 gap-y-1.5 gap-x-1 text-center">
          {/* Empty cells before month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-8 w-8" />
          ))}

          {/* Actual days of month */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const isSelected = dayNum === selectedDay;
            // Days with indicator dots (e.g. days with active habits)
            const dObj = new Date(currentYear, currentMonth, dayNum);
            const dRepeat = dayIndexToRepeatDay[dObj.getDay()];
            const hasTasks = tasks.some((t) => t.repeatDays.includes(dRepeat as any));

            return (
              <div key={dayNum} className="flex flex-col items-center justify-center">
                <button
                  type="button"
                  onClick={() => setSelectedDay(dayNum)}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#febb1b] text-white font-extrabold amber-badge-shadow scale-110 z-10'
                      : 'text-white/90 hover:bg-white/10 font-medium'
                  }`}
                >
                  {dayNum}
                </button>
                {/* Dot indicator for scheduled tasks */}
                {!isSelected && hasTasks && (
                  <div className="w-1 h-1 rounded-full bg-cyan-400 mt-0.5 opacity-80" />
                )}
                {!isSelected && !hasTasks && (
                  <div className="w-1 h-1 mt-0.5 opacity-0" />
                )}
                {isSelected && <div className="w-1 h-1 mt-0.5 opacity-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtered Task Drawer (Cyan container sliding up from bottom) */}
      <div className="relative z-20 flex-1 flex flex-col justify-between bg-[#38bdf8] text-white rounded-t-[36px] px-5 pt-5 pb-4 sheet-shadow overflow-hidden mt-2">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Notch handle */}
          <div className="w-10 h-1 rounded-full bg-white/40 mx-auto -mt-1 mb-3" />

          {/* Selected Date Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xl font-bold tracking-tight text-white">
              {monthNames[currentMonth]} {selectedDay}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-white">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {/* Filtered task cards list (White floating cards) */}
          <div className="flex-1 space-y-2.5 overflow-y-auto pr-0.5 pb-2">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onSelectTask(task)}
                className="group relative flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-slate-50 transition-all duration-200 cursor-pointer shadow-md text-slate-800 active:scale-[0.99]"
              >
                {/* Left: Icon & Titles */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <TaskIcon type={task.icon} size={36} />
                  </div>

                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-[13px] font-bold tracking-wide uppercase text-[#1e277a] truncate">
                      {task.title}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500 truncate">
                      {task.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right: Checkbox */}
                <button
                  type="button"
                  onClick={(e) => handleCheckboxClick(e, task)}
                  title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                  className="flex-shrink-0 ml-2 focus:outline-none transition-transform active:scale-90"
                >
                  {task.completed ? (
                    <div className="w-5 h-5 rounded-full bg-[#00c2ff] flex items-center justify-center shadow-sm">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-[#00c2ff] transition-colors" />
                  )}
                </button>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="text-center py-6 px-3 rounded-xl bg-white/10 text-white/90">
                <p className="text-xs font-medium">No tasks scheduled for {currentRepeatDay}s.</p>
                <p className="text-[11px] text-white/70 mt-1">Tap a task to add this day to its repeat schedule.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
