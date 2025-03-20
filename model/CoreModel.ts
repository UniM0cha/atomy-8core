import { Core } from '@/storage/types';

// 기본 습관 데이터
export const DEFAULT_CORES: Core[] = [
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
export function createInitialCoresForDay(): Core[] {
  return DEFAULT_CORES.map((core) => ({ ...core }));
}

export function getCoreTitle(core: number) {
  switch (core) {
    case 1:
      return '1. 책 읽기 (15분)';
    case 2:
      return '2. VOD 시청';
    case 3:
      return '3. 미팅 참석';
    case 4:
      return '4. 애용';
    case 5:
      return '5. STP (사업설명)';
    case 6:
      return '6. 소비자 전달';
    case 7:
      return '7. 상담';
    case 8:
      return '8. 신뢰쌓기';
  }
}
