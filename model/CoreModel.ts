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

export function getCoreDescription(core: number): string {
  const descriptions: { [key: number]: string } = {
    1: `오늘 읽은 인문학 책의 제목과 기억에 남는 문장을 적어보세요.
애터미는 단순한 판매가 아닌 사람을 다루는 사업이기 때문에, 깊이 있는 인문학적 소양이 중요합니다.
소설이나 만화보다는 철학, 역사, 인간관계 등에 대한 책이 더 도움이 됩니다.
짧은 느낀 점이나 오늘 마음에 새기고 싶은 문장을 적어보세요.`,
    2: `오늘 본 애터미 영상의 제목과 기억에 남는 내용을 정리해보세요.
성공자들의 스피치나 회장님의 메시지, 제품 소개 영상 등을 통해 사업의 방향을 배울 수 있습니다.
'이걸 통해 나는 어떤 점을 배웠는가?'를 중심으로 생각해보면 좋습니다.
채널 애터미에서 꾸준히 콘텐츠를 시청하며 나만의 말하기 자료를 쌓아보세요.`,
    3: `오늘 만난 사람은 누구였고, 어떤 대화를 나누었는지 기록해보세요.
스폰서 또는 파트너와의 미팅은 사업을 성장시킬 수 있는 중요한 시간입니다.
대화 중 얻은 인사이트나 느낀 점, 앞으로의 계획 등을 적어두면 더 좋습니다.
반복된 기록이 나만의 성장 노트가 됩니다.`,
    4: `오늘 사용한 애터미 제품은 무엇이었고, 그 사용 후기는 어땠나요?
직접 사용한 경험을 바탕으로 이야기하면 제품에 대한 신뢰도도 높아집니다.
"이 제품은 어떤 사람에게 도움이 될까?"를 고민하며 적어보세요.
애용은 단순한 소비가 아닌, 사업의 가장 기본적인 도구입니다.`,
    5: `오늘 누구에게 애터미 사업을 설명했나요? 설명한 내용이나 반응을 간단히 정리해보세요.
사업 구조, 수당 시스템, 제품력 등을 어떻게 전달했는지 기록하면 다음 설명에 도움이 됩니다.
부담 없이, 내가 전달한 말 중 가장 반응이 좋았던 부분을 적어두는 것도 좋습니다.
STP는 세미나 초대의 출발점이 됩니다.`,
    6: `오늘 어떤 제품을 누구에게 전달했는지, 전달 방법(직접/택배)과 반응을 적어보세요.
제품 사용법이나 장점을 설명하면서 소비자와의 소통이 깊어질 수 있습니다.
"이 제품을 통해 어떤 변화가 생겼는지"를 후기로 함께 나누면 더 좋습니다.
단순한 전달이 아닌 신뢰의 연결고리가 됩니다.`,
    7: `오늘 스폰서와 어떤 내용을 상담했는지, 특히 고민한 계보도나 사람에 대해 적어보세요.
하소연이 아닌, 사업의 방향성과 육성 전략에 대해 나눈 이야기 위주로 기록합니다.
상담을 통해 어떤 인사이트를 얻었는지, 다음에 어떻게 실천할지를 함께 적어보면 좋습니다.
이 기록이 나중에 팀 성장의 이정표가 됩니다.`,
    8: `오늘 어떤 소비자와 연락하거나 만났는지, 어떤 대화를 나눴는지 적어보세요.
제품과 상관없는 이야기라도, 친근함을 쌓는 것이 곧 신뢰의 시작입니다.
아직 사업에 관심 없는 사람이라도 주기적인 연락을 통해 관계를 이어가 보세요.
소비자와의 신뢰는 향후 사업의 가장 든든한 자산이 됩니다.`,
  };
  return descriptions[core] || '';
}
