import React, { useState } from 'react';
import { X, Plus, Calendar, Clock, Sparkles } from 'lucide-react';
import type { Task, TaskIconType, TaskCategory, RepeatDay } from '../types';
import { TaskIcon } from './illustrations/TaskIcon';
import { ALL_REPEAT_DAYS } from '../data/initialTasks';
import confetti from 'canvas-confetti';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (newTask: Task) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('STUDY');
  const [icon, setIcon] = useState<TaskIconType>('book');
  const [startDate, setStartDate] = useState('2019/04/08');
  const [endDate, setEndDate] = useState('2019/10/08');
  const [timeFrame, setTimeFrame] = useState('08:00-09:00');
  const [repeatDays, setRepeatDays] = useState<RepeatDay[]>(['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']);

  if (!isOpen) return null;

  const toggleDay = (day: RepeatDay) => {
    if (repeatDays.includes(day)) {
      setRepeatDays(repeatDays.filter((d) => d !== day));
    } else {
      setRepeatDays([...repeatDays, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: title.trim().toUpperCase(),
      subtitle: subtitle.trim() || 'Daily habit',
      category,
      categoryLabel: `NEW ${category}`,
      icon,
      completed: false,
      startDate,
      endDate,
      timeFrame,
      repeatDays: repeatDays.length > 0 ? repeatDays : ['Mon']
    };

    onAddTask(newTask);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#00E5FF', '#FFD54F', '#FF4081']
    });
    onClose();
  };

  const iconOptions: TaskIconType[] = [
    'book', 'palette', 'money', 'mountain', 'dumbbell', 'code', 'droplet', 'coffee'
  ];

  const categoryOptions: TaskCategory[] = [
    'STUDY', 'CREATIVE', 'FINANCE', 'OUTDOOR', 'HEALTH', 'WORK'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl text-slate-800 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#00c2ff]/10 text-[#00c2ff] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#162f9b]">Create New Habit</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Icon Picker */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Select Habit Icon
            </label>
            <div className="grid grid-cols-4 gap-2">
              {iconOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setIcon(opt)}
                  className={`p-2.5 rounded-2xl flex items-center justify-center border transition-all cursor-pointer ${
                    icon === opt
                      ? 'border-[#00c2ff] bg-[#00c2ff]/10 ring-2 ring-[#00c2ff]/20 scale-105'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <TaskIcon type={opt} size={32} />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Habit Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. MORNING RUN"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00c2ff] focus:ring-2 focus:ring-[#00c2ff]/20 outline-none text-sm font-semibold uppercase text-slate-800"
            />
          </div>

          {/* Subtitle / Goal description */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Goal / Subtitle
            </label>
            <input
              type="text"
              placeholder="e.g. 5 kilometers every morning"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#00c2ff] focus:ring-2 focus:ring-[#00c2ff]/20 outline-none text-sm text-slate-700"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-[#162f9b] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dates & Time Frame */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-[#ff6b81]" />
                <span>Date Range</span>
              </label>
              <input
                type="text"
                value={`${startDate}-${endDate}`}
                onChange={(e) => {
                  const parts = e.target.value.split('-');
                  if (parts[0]) setStartDate(parts[0]);
                  if (parts[1]) setEndDate(parts[1]);
                }}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-xs font-mono font-bold text-slate-700"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 flex items-center space-x-1">
                <Clock className="w-3 h-3 text-[#febb1b]" />
                <span>Time Frame</span>
              </label>
              <input
                type="text"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                placeholder="00:00-23:59"
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-xs font-mono font-bold text-slate-700"
              />
            </div>
          </div>

          {/* Repeat Days */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Repeat Days
            </label>
            <div className="flex items-center justify-between gap-1">
              {ALL_REPEAT_DAYS.map((day) => {
                const isActive = repeatDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`flex-1 py-1.5 rounded-full text-[10px] font-bold tracking-tight transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#febb1b] text-white shadow-sm font-extrabold'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-[#00c2ff] hover:bg-[#1ad0ff] text-white font-bold text-sm tracking-wider uppercase cyan-btn-shadow transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.98]"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Create Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
