import { CompletionStatus, Core, DayCores, MarkedDates, StatusColors } from '@/storage/types';
import { FileSystemHelper } from './helper/FileSystemHelper';
import { CorePathHelper } from './helper/CorePathHelper';
import { createInitialCoresForDay, DEFAULT_CORES } from '@/model/CoreModel';

export class CoreStorage {
  /**
   * 초기화 - 필요한 디렉토리 생성
   */
  static async initialize(): Promise<void> {
    await FileSystemHelper.ensureDirectoryExists(CorePathHelper.CORE_BASE_DIR);
  }

  /**
   * 특정 날짜의 습관 데이터 가져오기
   */
  static async getCoresForDate(date: Date): Promise<Core[]> {
    const filePath = CorePathHelper.getPathForDate(date);
    const dayData = await FileSystemHelper.readJsonFromFile<DayCores>(filePath);

    if (dayData) {
      return dayData.habits;
    }

    // 데이터가 없으면 기본 습관 목록 반환
    return createInitialCoresForDay();
  }

  /**
   * 특정일의 Core 조회
   */
  static async getCoreForDate(date: Date, coreNumber: number): Promise<Core | null> {
    const cores = await this.getCoresForDate(date);
    const core = cores.find((core) => core.core === coreNumber);
    return core || null;
  }

  /**
   * 습관 저장
   */
  static async saveDayCores(date: Date, dayCores: DayCores): Promise<void> {
    // 파일에 저장
    const filePath = CorePathHelper.getPathForDate(date);
    await FileSystemHelper.writeJsonToFile(filePath, dayCores);
  }

  /**
   * 특정 월의 날짜별 완료 상태 조회 (달력 표시용)
   */
  static async getMonthlyMarkedDates(year: number, month: number): Promise<MarkedDates> {
    const monthDirectory = CorePathHelper.getMonthDirectoryPath(year, month);
    const fileNames = await FileSystemHelper.getFileNamesInDirectory(monthDirectory);

    const markedDates: MarkedDates = {};

    // 각 파일에서 완료 상태 읽기
    for (const fileName of fileNames) {
      if (!fileName.endsWith('.json')) continue;

      const day = Number(fileName.replace('.json', ''));
      const filePath = `${monthDirectory}/${fileName}`;

      const dayData = await FileSystemHelper.readJsonFromFile<DayCores>(filePath);
      if (!dayData) continue;

      // 완료 상태에 따라 점 색상 결정
      let status = CompletionStatus.NONE;

      const completedHabits = dayData.habits.filter((habit) => habit.completed);
      if (completedHabits.length === DEFAULT_CORES.length) {
        status = CompletionStatus.COMPLETE;
      } else if (dayData.habits.some((habit) => habit.content !== '')) {
        status = CompletionStatus.PARTIAL;
      }

      // 마커 추가
      markedDates[day] = StatusColors[status];
    }

    return markedDates;
  }
}
