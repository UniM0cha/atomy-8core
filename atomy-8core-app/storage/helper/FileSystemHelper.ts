import * as FileSystem from 'expo-file-system';

/**
 * 파일 시스템 관련 작업을 담당하는 헬퍼 클래스
 */
export class FileSystemHelper {
  /**
   * 지정된 경로에 디렉토리가 존재하는지 확인, 없으면 생성
   */
  static async ensureDirectoryExists(dirPath: string): Promise<void> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(dirPath);

      if (!fileInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
      }
    } catch (error) {
      console.error(`디렉토리가 존재하는지 확인 중 오류가 발생했습니다: ${dirPath}:`, error);
      throw error;
    }
  }

  /**
   * 파일 저장
   */
  static async writeJsonToFile(filePath: string, data: any): Promise<void> {
    try {
      // 파일이 위치할 디렉토리 경로 추출
      const dirPath = filePath.substring(0, filePath.lastIndexOf('/'));

      // 디렉토리 생성 확인
      await this.ensureDirectoryExists(dirPath);

      // JSON 파일로 저장
      const jsonString = JSON.stringify(data);
      await FileSystem.writeAsStringAsync(filePath, jsonString);
    } catch (error) {
      console.error(`JSON 파일 저장 중 오류가 발생했습니다: ${filePath}:`, error);
      throw error;
    }
  }

  /**
   * 파일 읽기
   */
  static async readJsonFromFile<T>(filePath: string): Promise<T | null> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (!fileInfo.exists) {
        return null;
      }

      const fileContent = await FileSystem.readAsStringAsync(filePath);
      return JSON.parse(fileContent) as T;
    } catch (error) {
      console.error(`JSON 파일 읽기 중 오류가 발생했습니다: ${filePath}:`, error);
      return null;
    }
  }

  /**
   * 디렉토리 내 파일 목록 가져오기
   */
  static async getFileNamesInDirectory(dirPath: string): Promise<string[]> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(dirPath);

      if (!fileInfo.exists) {
        return [];
      }

      return await FileSystem.readDirectoryAsync(dirPath);
    } catch (error) {
      console.error(`디렉토리 내 파일 목록 가져오기 중 오류가 발생했습니다: ${dirPath}:`, error);
      return [];
    }
  }

  /**
   * 파일 존재 여부 확인
   */
  static async fileExists(filePath: string): Promise<boolean> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      return fileInfo.exists;
    } catch (error) {
      console.error(`파일 존재 여부 확인 중 오류가 발생했습니다: ${filePath}:`, error);
      return false;
    }
  }
}
