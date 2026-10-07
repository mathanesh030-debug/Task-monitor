import React from 'react';
import { Calendar as CalendarIcon, Check, Plus, Sparkles } from 'lucide-react';
import type { Task } from '../../types';
import { TaskIcon } from '../illustrations/TaskIcon';
import { BackgroundWaves } from '../illustrations/BackgroundWaves';
import confetti from 'canvas-confetti';

interface DashboardScreenProps {
  tasks: Task[];
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
  onSelectTask: (task: Task) => void;
  onOpenCalendar: () => void;
  onOpenAddTask: () => void;
  selectedDateStr?: { year: string; date: string };
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  tasks,
  onToggleComplete,
  onSelectTask,
  onOpenCalendar,
  onOpenAddTask,
  selectedDateStr = { year: '2019', date: 'April 8th' }
}) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleCheckboxClick = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    if (!task.completed) {
      // Confetti burst
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00E5FF', '#FFD54F', '#FF4081', '#FFFFFF']
      });
    }
    onToggleComplete(task.id, e);
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between p-5 bg-gradient-to-b from-[#1b3cbd] via-[#1633a6] to-[#122488] text-white select-none overflow-hidden">
      <BackgroundWaves />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header Section */}
        <div className="flex items-start justify-between pt-2 pb-6">
          <div>
            <span className="text-xl font-medium tracking-tight text-white/80 block">
              {selectedDateStr.year}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mt-0.5">
              {selectedDateStr.date}
            </h1>
          </div>

          <button
            onClick={onOpenCalendar}
            title="Open Calendar Schedule"
            aria-label="Open Calendar Schedule"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm group"
          >
            <CalendarIcon className="w-5 h-5 text-white/90 group-hover:text-white transition-transform group-hover:scale-110" />
          </button>
        </div>

        {/* Progress pill indicator */}
        <div className="mb-4 flex items-center justify-between px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="text-xs font-semibold text-white/90">
              Daily Progress: {completedCount}/{tasks.length} ({progressPercent}%)
            </span>
          </div>
          <div className="w-20 bg-black/25 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00E5FF] to-[#febb1b] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Task Cards List */}
        <div className="flex-1 space-y-3.5 overflow-y-auto pr-0.5 pb-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onSelectTask(task)}
              className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-[#142877]/85 hover:bg-[#183191]/95 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm active:scale-[0.99]"
            >
              {/* Left: Icon & Titles */}
              <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <TaskIcon type={task.icon} size={38} />
                </div>

                <div className="flex-1 min-w-0 pr-2">
                  <h3
                    className={`text-[14px] font-bold tracking-wide uppercase transition-colors truncate ${
                      task.completed ? 'text-white/90' : 'text-white'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-[12px] font-medium text-blue-200/70 truncate">
                    {task.subtitle}
                  </p>
                </div>
              </div>

              {/* Right: Checkbox */}
              <button
                type="button"
                onClick={(e) => handleCheckboxClick(e, task)}
                title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                className="flex-shrink-0 ml-2 focus:outline-none transition-transform active:scale-90"
              >
                {task.completed ? (
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200">
                    <Check className="w-4 h-4 text-[#1633a6] stroke-[3.5]" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-white/40 hover:border-white/90 transition-colors" />
                )}
              </button>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-12 px-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-sm text-white/70">No tasks remaining for this date!</p>
              <button
                onClick={onOpenAddTask}
                className="mt-3 text-xs font-semibold text-[#00E5FF] hover:underline"
              >
                + Add your first task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Action Button */}
      <div className="relative z-10 pt-3 pb-1">
        <button
          onClick={onOpenAddTask}
          className="w-full py-3.5 px-6 rounded-full bg-[#00c2ff] hover:bg-[#1ad0ff] active:scale-[0.98] text-white font-bold text-sm tracking-wider uppercase cyan-btn-shadow transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>ADD NEW TASK</span>
        </button>
      </div>
    </div>
  );
};
