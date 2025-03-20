import { Habit } from '@/storage/types';

// 기본 습관 데이터
export const DEFAULT_HABITS: Habit[] = [
  { core: 1, completed: false, content: '' },
  { core: 2, completed: false, content: '' },
  { core: 3, completed: false, content: '' },
  { core: 4, completed: false, content: '' },
  { core: 5, completed: false, content: '' },
  { core: 6, completed: false, content: '' },
  { core: 7, completed: false, content: '' },
  { core: 8, completed: false, content: '' },
];

// 하루의 습관 목록을 초기화하는 함수
export const createInitialHabitsForDay = (): Habit[] => {
  return DEFAULT_HABITS.map((habit) => ({ ...habit }));
};
