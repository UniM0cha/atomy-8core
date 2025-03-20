// 습관 인터페이스
export interface Core {
  core: number;
  completed: boolean;
  content: string;
}

// 하루 습관 데이터
export interface DayCores {
  habits: Core[];
  updatedAt: Date;
}

// 달력에 표시되는 상태 유형
export enum CompletionStatus {
  NONE = 'none', // 하나도 완료하지 않음
  PARTIAL = 'partial', // 일부 완료
  COMPLETE = 'complete', // 모두 완료
}

// 달력 마커 데이터
export type MarkedDates = Record<number, string | null>;

// 상태별 색상 정의
export const StatusColors = {
  [CompletionStatus.NONE]: null, // 표시하지 않음
  [CompletionStatus.PARTIAL]: '#FFA726', // 주황색
  [CompletionStatus.COMPLETE]: '#4CAF50', // 초록색
  TODAY: '#2e64e5', // 오늘 날짜 색상
};
