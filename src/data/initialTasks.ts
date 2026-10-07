import type { Task } from '../types';

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'READING BOOKS',
    subtitle: 'Read every day',
    category: 'STUDY',
    categoryLabel: 'NEW STUDY',
    icon: 'book',
    completed: true,
    startDate: '2019/03/29',
    endDate: '2019/09/29',
    timeFrame: '00:00-23:59',
    repeatDays: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    notes: 'Finish reading 20 pages of current novel before bedtime.'
  },
  {
    id: 'task-2',
    title: 'PAINTING',
    subtitle: 'Half an hour a day',
    category: 'CREATIVE',
    categoryLabel: 'CREATIVE ART',
    icon: 'palette',
    completed: true,
    startDate: '2019/04/01',
    endDate: '2019/10/01',
    timeFrame: '19:00-20:00',
    repeatDays: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
    notes: 'Watercolor landscape study.'
  },
  {
    id: 'task-3',
    title: 'SAVE MONEY',
    subtitle: 'Five dollars a day',
    category: 'FINANCE',
    categoryLabel: 'FINANCE GOAL',
    icon: 'money',
    completed: false,
    startDate: '2019/01/01',
    endDate: '2019/12/31',
    timeFrame: '09:00-21:00',
    repeatDays: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    notes: 'Deposit $5 into high yield savings account.'
  },
  {
    id: 'task-4',
    title: 'CLIMB MOUNTAINS',
    subtitle: 'Three hours today',
    category: 'OUTDOOR',
    categoryLabel: 'ADVENTURE',
    icon: 'mountain',
    completed: false,
    startDate: '2019/04/01',
    endDate: '2019/04/30',
    timeFrame: '06:00-11:00',
    repeatDays: ['Sat', 'Sun', 'Wed'],
    notes: 'Trail climbing and elevation endurance training.'
  }
];

export const ALL_REPEAT_DAYS: Array<Task['repeatDays'][number]> = [
  'Mon',
  'Tues',
  'Wed',
  'Thur',
  'Fri',
  'Sat',
  'Sun'
];
