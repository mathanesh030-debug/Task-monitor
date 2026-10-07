import React, { useState, useEffect } from 'react';
import type { Task, ViewScreen, DisplayMode } from './types';
import { INITIAL_TASKS } from './data/initialTasks';
import { PhoneFrame } from './components/PhoneFrame';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { TaskDetailScreen } from './components/screens/TaskDetailScreen';
import { CalendarScreen } from './components/screens/CalendarScreen';
import { DesktopDashboard } from './components/desktop/DesktopDashboard';
import { AddTaskModal } from './components/AddTaskModal';
import { TopBar } from './components/TopBar';
import { Sparkles, Calendar, BookOpen, Clock } from 'lucide-react';

const STORAGE_KEY = 'task_monitor_tasks_v1';

export function App() {
  // Load tasks from localStorage or use initial tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TASKS;
  });

  const [displayMode, setDisplayMode] = useState<DisplayMode>('desktop');
  const [activeScreen, setActiveScreen] = useState<ViewScreen>('dashboard');
  const [selectedTask, setSelectedTask] = useState<Task>(tasks[0] || INITIAL_TASKS[0]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<'2019' | 'live'>('2019');


  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  // Keep selectedTask up to date if tasks array changes
  useEffect(() => {
    const found = tasks.find((t) => t.id === selectedTask.id);
    if (found) {
      setSelectedTask(found);
    } else if (tasks.length > 0) {
      setSelectedTask(tasks[0]);
    }
  }, [tasks]);

  const handleToggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    if (displayMode === 'phone') {
      setActiveScreen('detail');
    }
  };

  const handleUpdateTask = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setSelectedTask(updated);
  };

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
    setSelectedTask(newTask);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleResetData = () => {
    setTasks(INITIAL_TASKS);
    setSelectedTask(INITIAL_TASKS[0]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleTogglePreset = () => {
    setActivePreset((prev) => (prev === '2019' ? 'live' : '2019'));
  };

  const getPresetDateString = () => {
    if (activePreset === '2019') {
      return { year: '2019', date: 'April 8th' };
    }
    const now = new Date();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const day = now.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th';
    return {
      year: `${now.getFullYear()}`,
      date: `${months[now.getMonth()]} ${day}${suffix}`
    };
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Application Bar */}
      <TopBar
        displayMode={displayMode}
        onSelectDisplayMode={setDisplayMode}
        activePreset={activePreset}
        onTogglePreset={handleTogglePreset}
        onResetData={handleResetData}
        completedTasks={completedCount}
        totalTasks={tasks.length}
      />

      {/* Main Presentation Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 md:p-6 lg:p-8">
        {displayMode === 'desktop' ? (
          /* NATIVE DESKTOP DASHBOARD */
          <DesktopDashboard
            tasks={tasks}
            selectedTask={selectedTask}
            onSelectTask={handleSelectTask}
            onToggleComplete={handleToggleComplete}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onOpenAddTask={() => setIsAddTaskOpen(true)}
            selectedDateStr={getPresetDateString()}
          />
        ) : displayMode === 'triple' ? (
          /* TRIPLE SCREEN SHOWCASE (Matching reference image side-by-side layout) */

          <div className="w-full max-w-7xl flex flex-col items-center">
            {/* Context Header banner */}
            <div className="w-full mb-6 flex flex-wrap items-center justify-between gap-4 px-2">
              <div>
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>Interactive 3-Screen Design System</span>
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Real-time synchronized across Dashboard, Habit Detail sheet, and Calendar schedule.
                </p>
              </div>

              {/* Quick tip pill */}
              <div className="flex items-center space-x-2 text-xs bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-white/10 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Tap any card to preview in Screen 2</span>
              </div>
            </div>

            {/* 3 Phones Side by Side Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
              {/* Screen 1: Main Task Dashboard */}
              <div className="flex flex-col items-center w-full max-w-[360px]">
                <div className="mb-3 flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">1</span>
                  <span>Main Task Dashboard</span>
                </div>
                <PhoneFrame>
                  <DashboardScreen
                    tasks={tasks}
                    onToggleComplete={handleToggleComplete}
                    onSelectTask={(task) => setSelectedTask(task)}
                    onOpenCalendar={() => {
                      // in phone mode or focus
                      setDisplayMode('phone');
                      setActiveScreen('calendar');
                    }}
                    onOpenAddTask={() => setIsAddTaskOpen(true)}
                    selectedDateStr={getPresetDateString()}
                  />
                </PhoneFrame>
              </div>

              {/* Screen 2: Task Detail / Creation View */}
              <div className="flex flex-col items-center w-full max-w-[360px]">
                <div className="mb-3 flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px]">2</span>
                  <span>Task Detail Overlay</span>
                </div>
                <PhoneFrame>
                  <TaskDetailScreen
                    task={selectedTask}
                    onBack={() => {}}
                    onUpdateTask={handleUpdateTask}
                    onFinish={(updated) => {
                      handleUpdateTask(updated);
                    }}
                  />
                </PhoneFrame>
              </div>

              {/* Screen 3: Calendar & Schedule View */}
              <div className="flex flex-col items-center w-full max-w-[360px]">
                <div className="mb-3 flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px]">3</span>
                  <span>Calendar & Schedule View</span>
                </div>
                <PhoneFrame>
                  <CalendarScreen
                    tasks={tasks}
                    onBack={() => {}}
                    onSelectTask={(task) => setSelectedTask(task)}
                    onToggleComplete={handleToggleComplete}
                  />
                </PhoneFrame>
              </div>
            </div>
          </div>
        ) : (
          /* PHONE SIMULATOR (Single interactive mobile device with active screen navigation) */
          <div className="flex flex-col items-center">
            {/* Quick Screen Nav Switcher for the Simulator */}
            <div className="mb-4 flex items-center bg-slate-900/90 p-1 rounded-2xl border border-white/10 shadow-lg">
              <button
                onClick={() => setActiveScreen('dashboard')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeScreen === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveScreen('detail')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeScreen === 'detail'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Task Detail</span>
              </button>

              <button
                onClick={() => setActiveScreen('calendar')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeScreen === 'calendar'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Calendar</span>
              </button>
            </div>

            {/* Realistic Phone Shell */}
            <PhoneFrame>
              {activeScreen === 'dashboard' && (
                <DashboardScreen
                  tasks={tasks}
                  onToggleComplete={handleToggleComplete}
                  onSelectTask={handleSelectTask}
                  onOpenCalendar={() => setActiveScreen('calendar')}
                  onOpenAddTask={() => setIsAddTaskOpen(true)}
                  selectedDateStr={getPresetDateString()}
                />
              )}

              {activeScreen === 'detail' && (
                <TaskDetailScreen
                  task={selectedTask}
                  onBack={() => setActiveScreen('dashboard')}
                  onUpdateTask={handleUpdateTask}
                  onFinish={(updated) => {
                    handleUpdateTask(updated);
                    setActiveScreen('dashboard');
                  }}
                />
              )}

              {activeScreen === 'calendar' && (
                <CalendarScreen
                  tasks={tasks}
                  onBack={() => setActiveScreen('dashboard')}
                  onSelectTask={handleSelectTask}
                  onToggleComplete={handleToggleComplete}
                />
              )}
            </PhoneFrame>
          </div>
        )}
      </main>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

export default App;
