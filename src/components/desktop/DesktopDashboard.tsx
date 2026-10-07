import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Check,
  Plus,
  Search,
  Flame,
  Clock,
  Trash2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Target,
  Edit2
} from 'lucide-react';
import type { Task, RepeatDay } from '../../types';

import { TaskIcon } from '../illustrations/TaskIcon';
import { DeskLampIllustration } from '../illustrations/DeskLampIllustration';
import { BackgroundWaves } from '../illustrations/BackgroundWaves';
import { ALL_REPEAT_DAYS } from '../../data/initialTasks';
import confetti from 'canvas-confetti';

interface DesktopDashboardProps {
  tasks: Task[];
  selectedTask: Task;
  onSelectTask: (task: Task) => void;
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
  onUpdateTask: (updated: Task) => void;
  onDeleteTask: (id: string) => void;
  onOpenAddTask: () => void;
  selectedDateStr: { year: string; date: string };
}

export const DesktopDashboard: React.FC<DesktopDashboardProps> = ({
  tasks,
  selectedTask,
  onSelectTask,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  onOpenAddTask,
  selectedDateStr
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingDetail, setIsEditingDetail] = useState(false);

  // Calendar state in right column
  const [calendarYear, setCalendarYear] = useState(2019);
  const [calendarMonth, setCalendarMonth] = useState(3); // April
  const [calendarSelectedDay, setCalendarSelectedDay] = useState(8);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
    setCalendarSelectedDay(1);
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
    setCalendarSelectedDay(1);
  };

  // Convert selected day to weekday name to match task repeats
  const selectedDateObj = new Date(calendarYear, calendarMonth, calendarSelectedDay);
  const dayIndexToRepeatDay: Record<number, string> = {
    0: 'Sun', 1: 'Mon', 2: 'Tues', 3: 'Wed', 4: 'Thur', 5: 'Fri', 6: 'Sat'
  };
  const calendarRepeatDay = dayIndexToRepeatDay[selectedDateObj.getDay()];
  const calendarFilteredTasks = tasks.filter((t) => t.repeatDays.includes(calendarRepeatDay as any));

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Filter tasks based on search, category, and status
  const visibleTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'ALL' || task.category === activeCategory;
    const matchesStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'COMPLETED' && task.completed) ||
      (filterStatus === 'PENDING' && !task.completed);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories: { key: string; label: string; count: number }[] = [
    { key: 'ALL', label: 'All Habits', count: tasks.length },
    { key: 'STUDY', label: 'Study & Learning', count: tasks.filter((t) => t.category === 'STUDY').length },
    { key: 'CREATIVE', label: 'Creative Arts', count: tasks.filter((t) => t.category === 'CREATIVE').length },
    { key: 'FINANCE', label: 'Finance & Savings', count: tasks.filter((t) => t.category === 'FINANCE').length },
    { key: 'OUTDOOR', label: 'Outdoor & Adventure', count: tasks.filter((t) => t.category === 'OUTDOOR').length },
    { key: 'HEALTH', label: 'Health & Fitness', count: tasks.filter((t) => t.category === 'HEALTH').length }
  ];

  const handleCheckboxClick = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    if (!task.completed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00E5FF', '#FFD54F', '#FF4081', '#FFFFFF']
      });
    }
    onToggleComplete(task.id, e);
  };

  const toggleRepeatDay = (day: RepeatDay) => {
    const nextDays = selectedTask.repeatDays.includes(day)
      ? selectedTask.repeatDays.filter((d) => d !== day)
      : [...selectedTask.repeatDays, day];
    onUpdateTask({ ...selectedTask, repeatDays: nextDays });
  };

  const handleFinishDetail = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#00E5FF', '#FFD54F', '#FF4081', '#7C4DFF']
    });
    onUpdateTask({ ...selectedTask, completed: true });
  };

  return (
    <div className="relative w-full max-w-[1500px] min-h-[860px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#122272] via-[#1633a6] to-[#0e1a5a] text-white shadow-2xl border border-white/10 flex flex-col select-none">
      <BackgroundWaves />

      <div className="relative z-10 flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ===================== LEFT SIDEBAR ===================== */}
        <aside className="w-full lg:w-72 xl:w-80 bg-black/20 backdrop-blur-md border-r border-white/10 p-6 flex flex-col justify-between flex-shrink-0">
          <div className="space-y-6">
            {/* User / Streak Badge */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md">
                  <Flame className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                    5-Day Streak
                  </h4>
                  <p className="text-[11px] text-white/70">Keep the momentum going!</p>
                </div>
              </div>
            </div>

            {/* Daily Completion Meter Card */}
            <div className="p-4 rounded-2xl bg-[#142877]/80 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white/90 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Daily Target</span>
                </span>
                <span className="text-xs font-extrabold text-[#00E5FF]">
                  {progressPercent}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#00E5FF] to-[#febb1b] rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-2.5 text-[11px] text-blue-200/80 font-medium">
                <span>{completedCount} Completed</span>
                <span>{tasks.length - completedCount} Pending</span>
              </div>
            </div>

            {/* Category Filter Navigation */}
            <div>
              <span className="text-[11px] font-extrabold text-blue-200/60 uppercase tracking-widest block mb-2.5 px-1">
                HABIT CATEGORIES
              </span>
              <nav className="space-y-1">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#00c2ff] text-white shadow-md font-extrabold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-white/30 text-white'
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Quick CTA at bottom of sidebar */}
          <div className="pt-6 border-t border-white/10">
            <button
              onClick={onOpenAddTask}
              className="w-full py-3.5 px-4 rounded-full bg-[#00c2ff] hover:bg-[#1ad0ff] text-white font-bold text-xs uppercase tracking-wider cyan-btn-shadow flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create New Habit</span>
            </button>
          </div>
        </aside>

        {/* ===================== CENTER: MAIN TASK DASHBOARD ===================== */}
        <section className="flex-1 p-6 lg:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header: Date & Controls */}
            <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-base lg:text-lg font-semibold text-white/70 block">
                  {selectedDateStr.year} &bull; Daily Habit Schedule
                </span>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white mt-1">
                  {selectedDateStr.date}
                </h1>
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center bg-black/20 p-1 rounded-xl border border-white/10">
                {(['ALL', 'PENDING', 'COMPLETED'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      filterStatus === status
                        ? 'bg-white/20 text-white shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Search & Stats Bar */}
            <div className="my-5 flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[220px] max-w-md">
                <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search habits or goals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/15 focus:border-[#00c2ff] focus:ring-1 focus:ring-[#00c2ff] outline-none text-xs text-white placeholder-white/40"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs text-white/70 font-semibold">
                <TrendingUp className="w-4 h-4 text-[#00c2ff]" />
                <span>Showing {visibleTasks.length} habits</span>
              </div>
            </div>

            {/* Task Cards List / Grid */}
            <div className="space-y-3.5 mt-2">
              {visibleTasks.map((task) => {
                const isSelected = selectedTask.id === task.id;
                return (
                  <div
                    key={task.id}
                    onClick={() => onSelectTask(task)}
                    className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.99] ${
                      isSelected
                        ? 'bg-[#183191] ring-2 ring-[#00c2ff] shadow-cyan-500/10'
                        : 'bg-[#142877]/85 hover:bg-[#183191]/90 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Left: Icon, Titles & Metadata */}
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <TaskIcon type={task.icon} size={42} />
                      </div>

                      <div className="flex-1 min-w-0 pr-3">
                        <div className="flex items-center space-x-2">
                          <h3
                            className={`text-base font-extrabold tracking-wide uppercase truncate ${
                              task.completed ? 'text-white/85 line-through opacity-80' : 'text-white'
                            }`}
                          >
                            {task.title}
                          </h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-blue-200 border border-white/10 uppercase">
                            {task.category}
                          </span>
                        </div>

                        <p className="text-xs font-medium text-blue-200/70 truncate mt-0.5">
                          {task.subtitle}
                        </p>

                        <div className="flex items-center space-x-3 mt-1.5 text-[11px] text-white/60">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-[#febb1b]" />
                            <span className="font-mono">{task.timeFrame}</span>
                          </span>
                          <span>&bull;</span>
                          <span className="font-medium">
                            Repeats: {task.repeatDays.length === 7 ? 'Every day' : task.repeatDays.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions & Completion Checkbox */}
                    <div className="flex items-center space-x-3 flex-shrink-0">
                      {/* Delete task button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteTask(task.id);
                        }}
                        title="Delete habit"
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-opacity cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Checkbox button */}
                      <button
                        type="button"
                        onClick={(e) => handleCheckboxClick(e, task)}
                        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                        className="p-1 focus:outline-none transition-transform active:scale-90"
                      >
                        {task.completed ? (
                          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200">
                            <Check className="w-4 h-4 text-[#1633a6] stroke-[3.5]" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full border-2 border-white/40 hover:border-white transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}

              {visibleTasks.length === 0 && (
                <div className="text-center py-16 px-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-sm text-white/70">No habits match your filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('ALL');
                      setFilterStatus('ALL');
                    }}
                    className="mt-3 text-xs font-semibold text-[#00c2ff] hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Add Task Action */}
          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-blue-200/60 font-semibold">
              Tip: Click on any card to view and customize its specifications in the right panel.
            </span>
            <button
              onClick={onOpenAddTask}
              className="py-3 px-6 rounded-full bg-[#00c2ff] hover:bg-[#1ad0ff] text-white font-bold text-xs uppercase tracking-wider cyan-btn-shadow flex items-center space-x-2 transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>ADD NEW TASK</span>
            </button>
          </div>
        </section>

        {/* ===================== RIGHT COLUMN: DETAIL INSPECTOR & CALENDAR ===================== */}
        <aside className="w-full lg:w-96 xl:w-[440px] bg-black/25 backdrop-blur-md border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto flex-shrink-0 space-y-6">
          {/* TOP SECTION: TASK DETAIL INSPECTOR (Matching Middle Screen with Desk Lamp) */}
          <div className="relative rounded-3xl bg-white text-slate-800 p-6 shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Top Illustration Header */}
            <div className="relative -mt-4 -mx-6 mb-2 bg-gradient-to-b from-[#1b3cbd] to-[#1633a6] pt-3 pb-1 flex justify-center overflow-hidden">
              <DeskLampIllustration className="h-44" />
            </div>

            {/* Content Details */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-extrabold tracking-widest text-[#2f3cb3] uppercase block">
                  {selectedTask.categoryLabel || `NEW ${selectedTask.category}`}
                </span>
                <button
                  onClick={() => setIsEditingDetail(!isEditingDetail)}
                  className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Edit details"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title */}
              {isEditingDetail ? (
                <input
                  type="text"
                  value={selectedTask.title}
                  onChange={(e) =>
                    onUpdateTask({ ...selectedTask, title: e.target.value })
                  }
                  className="w-full text-2xl font-black text-[#1e277a] tracking-tight uppercase border-b-2 border-blue-200 outline-none focus:border-[#00c2ff] py-1 bg-transparent"
                />
              ) : (
                <h2 className="text-2xl font-black text-[#1e277a] tracking-tight uppercase leading-tight">
                  {selectedTask.title}
                </h2>
              )}

              {/* Specification Rows */}
              <div className="space-y-2.5 mt-3">
                {/* Date range */}
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-[#ff6b81] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                    <CalendarIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-bold text-slate-600 font-mono">
                    {selectedTask.startDate} - {selectedTask.endDate}
                  </span>
                </div>

                {/* Time frame */}
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-full bg-[#febb1b] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-bold text-slate-600 font-mono">
                    {selectedTask.timeFrame}
                  </span>
                </div>
              </div>

              {/* Repeat Days Row */}
              <div className="mt-4">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block mb-2">
                  REPEAT SCHEDULE
                </span>
                <div className="flex items-center justify-between gap-1">
                  {ALL_REPEAT_DAYS.map((day) => {
                    const isActive = selectedTask.repeatDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleRepeatDay(day)}
                        className={`flex-1 py-1 rounded-full text-[10px] font-bold tracking-tight transition-all cursor-pointer text-center ${
                          isActive
                            ? 'bg-[#febb1b] text-white amber-badge-shadow font-extrabold scale-105'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Habit goal quote */}
              <div className="mt-3 text-xs text-slate-500 italic">
                "{selectedTask.subtitle}"
              </div>
            </div>

            {/* Bottom Finish Button */}
            <div className="mt-4 pt-2">
              <button
                onClick={handleFinishDetail}
                className={`w-full py-3 px-4 rounded-full font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  selectedTask.completed
                    ? 'bg-[#10b981] hover:bg-[#059669] text-white shadow-md'
                    : 'bg-[#00c2ff] hover:bg-[#1ad0ff] text-white cyan-btn-shadow active:scale-95'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{selectedTask.completed ? 'COMPLETED' : 'FINISH'}</span>
              </button>
            </div>
          </div>

          {/* BOTTOM SECTION: INTERACTIVE MONTHLY CALENDAR (Matching Right Screen) */}
          <div className="rounded-3xl bg-[#38bdf8] text-white p-5 shadow-xl flex flex-col justify-between">
            {/* Header: Month Navigator */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handlePrevMonth}
                className="p-1 rounded-full hover:bg-white/20 active:scale-90 text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h3 className="text-sm font-bold tracking-wide">
                {monthNames[calendarMonth]} , {calendarYear}
              </h3>
              <button
                onClick={handleNextMonth}
                className="p-1 rounded-full hover:bg-white/20 active:scale-90 text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Weekday Names */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {weekdayNames.map((day) => (
                <span key={day} className="text-[10px] font-semibold text-white/80 uppercase">
                  {day}
                </span>
              ))}
            </div>

            {/* Day Cells Grid */}
            <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center">
              {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                <div key={`cal-empty-${idx}`} className="h-7 w-7" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const isSelected = dayNum === calendarSelectedDay;
                const dObj = new Date(calendarYear, calendarMonth, dayNum);
                const dRepeat = dayIndexToRepeatDay[dObj.getDay()];
                const hasTasks = tasks.some((t) => t.repeatDays.includes(dRepeat as any));

                return (
                  <div key={`cal-day-${dayNum}`} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setCalendarSelectedDay(dayNum)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#febb1b] text-white font-extrabold amber-badge-shadow scale-110 z-10'
                          : 'text-white/95 hover:bg-white/20 font-medium'
                      }`}
                    >
                      {dayNum}
                    </button>
                    {!isSelected && hasTasks && (
                      <div className="w-1 h-1 rounded-full bg-white mt-0.5 opacity-80" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Filtered Tasks Drawer for Selected Day */}
            <div className="mt-4 pt-3 border-t border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold">
                  {monthNames[calendarMonth]} {calendarSelectedDay} ({calendarRepeatDay})
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/25">
                  {calendarFilteredTasks.length} {calendarFilteredTasks.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>

              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {calendarFilteredTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => onSelectTask(t)}
                    className="flex items-center justify-between p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 transition-all cursor-pointer shadow-sm text-xs font-bold"
                  >
                    <div className="flex items-center space-x-2 truncate pr-2">
                      <TaskIcon type={t.icon} size={22} />
                      <span className="truncate uppercase">{t.title}</span>
                    </div>
                    {t.completed ? (
                      <div className="w-4 h-4 rounded-full bg-[#00c2ff] flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
