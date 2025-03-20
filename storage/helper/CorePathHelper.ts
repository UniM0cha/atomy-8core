import * as FileSystem from 'expo-file-system';

export class CorePathHelper {
  static readonly CORE_BASE_DIR = `${FileSystem.documentDirectory}cores`;

  /**
   * /habits/년도/월/일.json 형식의 경로
   */
  static getPathForDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${this.CORE_BASE_DIR}/${year}/${month}/${day}.json`;
  }

  /**
   * 특정 연도/월에 대한 디렉토리 경로
   */
  static getMonthDirectoryPath(year: number, month: number): string {
    // 월은 1-12 사이의 값이어야 함
    const monthString = month.toString().padStart(2, '0');
    return `${this.CORE_BASE_DIR}/${year}/${monthString}`;
  }

  /**
   * 특정 연도에 대한 디렉토리 경로
   */
  static getYearDirectoryPath(year: number): string {
    return `${this.CORE_BASE_DIR}/${year}`;
  }
}
