export type RepeatDay = 'Mon' | 'Tues' | 'Wed' | 'Thur' | 'Fri' | 'Sat' | 'Sun';

export type TaskCategory = 'STUDY' | 'CREATIVE' | 'FINANCE' | 'OUTDOOR' | 'HEALTH' | 'WORK';

export type TaskIconType = 'book' | 'palette' | 'money' | 'mountain' | 'dumbbell' | 'code' | 'droplet' | 'coffee';

export interface Task {
  id: string;
  title: string;
  subtitle: string;
  category: TaskCategory;
  categoryLabel?: string;
  icon: TaskIconType;
  completed: boolean;
  startDate: string; // YYYY/MM/DD
  endDate: string;   // YYYY/MM/DD
  timeFrame: string; // e.g. "00:00-23:59" or "08:00-09:30"
  repeatDays: RepeatDay[];
  notes?: string;
}

export type ViewScreen = 'dashboard' | 'detail' | 'calendar';

export type DisplayMode = 'desktop' | 'triple' | 'phone';

