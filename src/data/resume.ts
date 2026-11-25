// Notion 이력서(FrontEnd 개발자 김광현)에서 옮겨온 콘텐츠.
// 사이트 문구를 고칠 때는 이 파일만 수정하면 된다.

export type BossId = 'hydra' | 'overtime'

export type Quest = {
  id: string
  title: string
  role: string
  stack: string[]
  /** 퀘스트 의뢰 = 문제 정의 */
  problem: string[]
  /** 문제를 한 줄로 요약한 문장 (이력서의 ➡️ 문장) */
  crux: string
  /** 공략 = 해결 과정 */
  approach?: string
  steps: string[]
  /** 보상 = 성과 */
  rewards: string[]
  /** 패시브 스킬 = 러닝 포인트 */
  lesson: string
  boss?: BossId
}

export type SideQuest = { title: string; desc: string }

export type Region = {
  chapter: number
  company: string
  period: string
  position: string
  quests: Quest[]
  sideQuests?: SideQuest[]
}

export const profile = {
  name: '김광현',
  job: '프론트엔드 개발자',
  title: '프로젝트 설계를 주도하는 자',
  startedAt: new Date(2019, 1), // 2019.02 첫 커리어 시작
  // 캐릭터 선택 화면에 한 줄씩 보여준다.
  intro: [
    '코드를 수정하기 전에 먼저 문제의 원인을 파악하는 데 집중합니다.',
    '신규 프로젝트에서는 서비스 목적에 맞는 플랫폼을 먼저 검토하고, PO로서 방향을 정한 뒤 개발까지 직접 진행해 왔습니다. 웹 기반 서비스를 데스크탑 앱으로 전환하거나 Flutter를 도입해 모바일 앱 개발 역량을 확보하는 등 상황에 맞는 기술을 선택해 왔습니다.',
    '레거시 코드는 무리하게 개선하기보다 의존성을 분리하는 방향으로 접근하고, 수정할 때는 사이드 이펙트를 꼼꼼하게 확인합니다.',
    '또한 AI를 실무에 적극적으로 활용하고 있습니다. 레거시 코드 분석, 기획서와 규격서 비교, 사이드 이펙트 점검 등에 AI를 활용하며, AI에게 맡길 부분과 직접 판단할 부분을 구분해 작업 효율을 높이고 있습니다.',
  ],
  contact: {
    email: 'eewt120@naver.com',
    github: 'https://github.com/dev-kwanghyun',
    githubLabel: 'dev-kwanghyun',
  },
  education: '안산대학교 경영학과 졸업 (2013.03 ~ 2018.03)',
}

export type Skill = {
  name: string
  /** 슬롯 아이콘에 찍히는 2글자 */
  short: string
  /** 스킬 분류 (같은 분류끼리 묶이고 같은 색을 쓴다) */
  branch: string
  /** 숙련도 1~5. ⚠ 이력서에 없는 값이라 임시로 채워둠 — 직접 조정할 것 */
  level: 1 | 2 | 3 | 4 | 5
  /** 장착했을 때 보여줄 한 줄 설명 */
  desc: string
  /** 프로젝트 stack 표기와 이름이 다를 때 함께 찾을 이름 */
  aliases?: string[]
}

export const levelLabel = ['', '입문', '실무 경험', '능숙', '숙련', '마스터'] as const

export const skills: Skill[] = [
  { name: 'React', short: 'Re', branch: 'Frontend', level: 5, desc: '레거시 Hook 구조를 분리하고 상태 의존성을 걷어내 re-rendering을 80~90% 줄였습니다.' },
  { name: 'Next.js', short: 'Nx', branch: 'Frontend', level: 4, desc: 'PHP 레거시 통계 플랫폼을 Next.js로 전면 재구축하고, 팬더TV 도우미를 리팩터링했습니다.' },
  { name: 'TypeScript', short: 'TS', branch: 'Frontend', level: 4, desc: '실무 React · Next.js 프로젝트의 기본 언어로 사용합니다.' },
  { name: 'Zustand', short: 'Zu', branch: 'Frontend', level: 4, desc: '상태를 최소 단위로 설계해 불필요한 렌더링과 얽힌 Hook 의존성을 제거했습니다.' },
  { name: 'React Query', short: 'RQ', branch: 'Frontend', level: 4, desc: '서버 상태와 클라이언트 상태를 분리해 데이터 흐름을 단순하게 유지합니다.' },
  { name: 'Tailwind CSS', short: 'Tw', branch: 'Frontend', level: 5, desc: 'Tailwind 설정 구조를 정리하고 다크/라이트 모드를 적용했습니다.' },
  { name: 'Electron', short: 'El', branch: 'Cross-Platform', level: 4, desc: '웹 프로토타입을 데스크톱 앱으로 전환해 API 호출을 90% 줄였습니다. 커스텀 프로토콜로 통신 문제를 해결했습니다.' },
  { name: 'Flutter', short: 'Fl', branch: 'Cross-Platform', level: 3, desc: '팀에 직접 도입을 제안하고 학습해, 의료 앱에 웹뷰 통신 구조와 다중 인증을 적용했습니다.' },
  { name: 'AWS S3', short: 'S3', branch: 'Infra / DevOps', level: 3, desc: 'S3 기반 정적 배포 구조를 설계하고 개발부터 운영까지 직접 맡았습니다.' },
  { name: 'CloudFront', short: 'CF', branch: 'Infra / DevOps', level: 3, desc: 'S3 + CloudFront 배포를 운영하며, 서비스 특성에 맞는 인프라 비용 구조를 판단했습니다.' },
  { name: 'Nginx', short: 'Ng', branch: 'Infra / DevOps', level: 3, desc: '분산된 웹 서비스를 로컬에서 한 번에 실행할 수 있도록 라우팅 환경을 구성했습니다.' },
  { name: 'GitHub Actions', short: 'GA', branch: 'Infra / DevOps', level: 4, desc: '여러 프로젝트에서 CI/CD 파이프라인을 구축해 배포를 자동화했습니다.' },
  { name: 'SQLite', short: 'SQ', branch: 'Database', level: 3, desc: 'Electron 앱의 로컬 캐싱 구조를 설계해 서버 호출을 줄였습니다.' },
  { name: 'MSSQL', short: 'MS', branch: 'Database', level: 2, desc: '.NET 기반 공장 대시보드와 정기 배송 쇼핑몰의 데이터 구조를 설계했습니다.' },
]

// ───────── 두 번째 캐릭터: 사회인 김광현 ─────────
// ⚠ 아래 성격·스킬·숙련도는 Claude가 쓴 초안. 본인의 실제 모습으로 고칠 것.

export const socialProfile = {
  name: '김광현',
  job: '사회인',
  title: '분위기를 주도하는 자',
  intro: [
    '할 말은 돌려 말하지 않고 확실하게 전달하는 편입니다.',
    '회사 분위기를 살리는 것도 잘합니다. 분위기가 처져 있으면 먼저 나서서 띄우는 편입니다.',
    '팀원들과 잘 지내는 편이라, 전 회사 사람들과도 지금까지 꾸준히 연락하며 지내고 있습니다.',
    '내 일이 아니어도 동료가 업무로 고민하고 있으면 같이 고민하는 편입니다.',
    '답답한 상황을 오래 두지 못해서, 일이 한 번에 끝나는 방법을 늘 고민합니다.',
  ],
}

export const socialSkills: Skill[] = [
  { name: '대인관계성', short: '대인', branch: '대인관계', level: 3, desc: '처음 보는 사람과도 일 이야기로 금방 가까워집니다.' },
  { name: '눈치', short: '눈치', branch: '대인관계', level: 4, desc: '회의실 공기가 바뀌는 순간을 잘 알아챕니다.' },
  { name: '개그', short: '개그', branch: '대인관계', level: 5, desc: '타이밍 맞는 드립으로 분위기를 바로 살립니다.' },
  { name: '리액션', short: '리액', branch: '대인관계', level: 3, desc: '상대가 말하고 싶게 만드는 적당한 맞장구를 칩니다.' },
  { name: '거절하기', short: '거절', branch: '대인관계', level: 3, desc: '안 되는 일은 이유와 함께 안 된다고 말합니다.' },
  { name: '기획자와 대화', short: '기획', branch: '협업', level: 4, desc: '기획서와 규격서의 다른 부분을 찾아 먼저 맞춰 갑니다.' },
  { name: '디자이너와 대화', short: '디자', branch: '협업', level: 4, desc: '공통 컴포넌트 기준을 함께 정하고, 리소스 관리를 자동화해 협업을 편하게 만들었습니다.' },
  { name: '회의 정리', short: '회의', branch: '협업', level: 3, desc: '길어지는 회의를 결정 사항 위주로 정리합니다.' },
  { name: '회식', short: '회식', branch: '회식', level: 3, desc: '1차는 끝까지 함께합니다.' },
  { name: '노래방', short: '노래', branch: '회식', level: 2, desc: '탬버린 담당입니다.' },
  { name: '2차 생존', short: '2차', branch: '회식', level: 2, desc: '눈치껏 빠져나갈 타이밍을 봅니다.' },
  { name: '혼자 밥먹기', short: '혼밥', branch: '생존', level: 5, desc: '점심시간을 온전히 나를 위해 쓸 줄 압니다.' },
  { name: '월요병 극복', short: '월요', branch: '생존', level: 3, desc: '월요일 오전은 조용히 예열합니다.' },
  { name: '커피 수혈', short: '커피', branch: '생존', level: 4, desc: '하루 두 잔이면 오후까지 버팁니다.' },
]

export const regions: Region[] = [
  {
    chapter: 4,
    company: '플리',
    period: '2026.01 ~',
    position: '과장',
    quests: [
      {
        id: 'uplus-local-env',
        title: 'Uplus 우리가게 패키지 앱',
        role: '단편 개선 및 유지보수',
        stack: ['React', 'Next.js', 'TypeScript', 'Jotai', 'styled-components', 'SCSS', 'Nginx', 'GitHub Actions'],
        problem: [
          '웹뷰 기반 앱에서 여러 웹 서비스를 통합 실행하는 구조로, 각 서비스가 분산된 레포지토리와 배포 환경에 의존하고 있었습니다.',
          '이로 인해 로컬에서 전체 서비스를 실행하기 어려워 개발 및 테스트가 배포 환경에 의존하는 비효율적인 상태였습니다.',
        ],
        crux: '개발 생산성을 위해 로컬 환경 구축이 반드시 필요한 상황',
        steps: [
          'Nginx를 활용하여 분산된 서비스들을 로컬에서 접근 가능하도록 라우팅 환경 구성',
          'Android 에뮬레이터의 host 설정으로 로컬 서버를 참조하게 하여 실제 앱과 동일한 환경 구현',
        ],
        rewards: [
          '배포 의존 없이 기능 검증이 가능해지며 개발 및 유지보수 효율 향상',
          '분산된 서비스 구조를 로컬에서 통합 실행할 수 있는 환경 구축',
        ],
        lesson:
          '개발 환경은 코드 품질만큼 생산성에 직접적인 영향을 줍니다. "잘 만드는 것"만큼 "잘 만들 수 있는 환경을 갖추는 것"도 개발자의 역할이라는 것을 체감했습니다.',
      },
      {
        id: 'uplus-renewal',
        title: 'Uplus 우리가게 패키지 앱 개편',
        role: '프로젝트 관리, 설계 및 개발',
        stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Tailwind CSS', 'React Router', 'Storybook', 'GitHub Actions'],
        problem: [
          '소상공인을 위한 웹뷰 기반 하이브리드 앱으로, 기존 앱은 Next.js 웹과 CRA 기반 레거시 웹이 서비스별로 나뉘어 있어 구조와 상태 관리 방식이 제각각이었습니다.',
          '앱 전면 개편이 결정되면서 프론트엔드를 새로 구성해야 했고, 기존 앱 사용자의 인증 정보와 계정 상태도 신규 앱으로 그대로 이어져야 했습니다.',
        ],
        crux: '신규 앱의 기반 설계와 기존 사용자 이관을 동시에 해결해야 하는 상황',
        approach:
          '단순히 기능을 옮기는 것이 아닌, 여러 개발자가 함께 작업할 수 있는 구조와 기준을 먼저 세우는 데 집중했습니다. 클라이언트, 기획자, 앱 개발자 사이에서 소통 창구 역할을 맡아 요구사항과 일정을 직접 조율했습니다.',
        steps: [
          '프로젝트 초기 구성 및 코드 컨벤션 정의',
          '공통 컴포넌트 및 API 호출 구조 설계',
          '앱 개발자와 브릿지 스펙 협의 및 통신 구조 설계',
          '구앱 → 신앱 마이그레이션 및 인증 로직 설계',
          'GA4/GTM 태깅 설계 및 적용',
          '클라이언트 및 기획자와 요구사항 협의, 일정 관리',
          '기획서, 규격서, TC 기반 QA 대응',
        ],
        rewards: [
          '신규 앱 기반 구조 설계 및 팀 공통 개발 기준 정립',
          '앱 초기화, 인증, 네이티브 브릿지 등 핵심 영역 직접 설계',
          '기존 사용자의 신규 앱 전환 흐름 구축',
          '클라이언트, 기획, 앱 개발 간 소통 창구 역할로 협업 효율 향상',
          'GA 클릭 이벤트 130여 곳 적용으로 서비스 지표 수집 기반 마련',
        ],
        lesson:
          '"빠르게 만드는 것"과 "함께 만들 수 있게 하는 것"은 전혀 다른 문제입니다. 초기에 구조와 기준을 먼저 잡아두니 여러 개발자가 동시에 작업해도 방향이 흔들리지 않았고, 처음 설계에 들인 시간이 이후 개발과 QA 속도로 돌아온다는 것을 배웠습니다.',
        boss: 'overtime',
      },
    ],
  },
  {
    chapter: 3,
    company: '더블미디어',
    period: '2024.05 ~ 2026.01',
    position: '매니저, PO',
    quests: [
      {
        id: 'pandatv-supporter-desktop',
        title: '팬더TV 서포터 플랫폼 (웹 → 데스크톱 앱)',
        role: 'PO, 개발',
        stack: ['React', 'Electron', 'SQLite', 'Zustand', 'Tailwind CSS', 'Centrifugo'],
        problem: [
          'BJ의 방송을 관리하고 돕는 사내 플랫폼으로, 웹 기반 프로토타입을 초기 테스트하는 과정에서 구조적인 문제가 예상되었습니다.',
          '실시간 데이터를 폴링 방식 API 호출로 처리해 서버 부하와 비용이 늘어나는 구조였습니다.',
          'S3/CloudFront 기반 배포로 내부 도구임에도 인프라 비용이 발생했습니다.',
        ],
        crux: '서비스 특성에 비해 불필요한 비용이 발생할 수 있는 구조',
        approach:
          '운영 이후 최적화하는 대신 초기 단계에서 구조를 재검토했습니다. "과연 이 프로젝트가 꼭 웹이어야 하는가?"라는 질문에서 출발해 데스크톱 앱 전환을 결정하고, Electron을 검토한 뒤 도입했습니다.',
        steps: [
          'Electron 기반 데스크톱 앱으로 전환',
          'SQLite 기반 로컬 캐싱 구조 설계',
          '커스텀 프로토콜 구현으로 통신 문제 해결',
          '디자이너 협업을 위한 리소스 관리 자동화 스크립트 개발',
        ],
        rewards: ['API 호출 90% 감소 및 서버 부하 감소', '인프라 비용 절감', '운영 구조 단순화', '디자이너 협업 효율 향상'],
        lesson:
          '비슷한 기능이라도 어떤 플랫폼에서 실행되느냐에 따라 비용과 구조가 완전히 달라집니다. "무엇을 만들 것인가"보다 "어디서 실행될 것인가"를 먼저 판단하는 것이 때로는 더 큰 문제를 해결한다는 점을 배웠습니다.',
      },
      {
        id: 'pandatv-supporter-web',
        title: '팬더TV 서포터 플랫폼 (웹 프로토타입)',
        role: 'PO, 개발',
        stack: ['React', 'Zustand', 'Tailwind CSS', 'Centrifugo', 'GitHub Actions'],
        problem: [
          '기존 팬더TV에서 사용하던 IVS, WebSocket 관련 레거시 코드의 재사용을 검토했습니다.',
          '하지만 해당 코드는 React 구조에 강하게 결합되어 있고 상태와 Hook 의존성이 복잡하게 얽혀 유지보수가 어려웠으며, 확장성이 낮아 신규 기능 요구사항을 수용할 수 없는 상태였습니다.',
        ],
        crux: '레거시 재사용 시 기술 부채 증가 및 기능 확장이 제한되는 구조적 문제',
        approach: '레거시 코드를 단순히 개선하는 대신 의존성을 제거하고 확장 가능한 구조로 재설계했습니다.',
        steps: [
          'IVS 로직을 React 외부 공통 모듈로 분리',
          '상태 의존성을 최소화하여 데이터 흐름 단순화',
          'WebSocket 처리 구조를 모듈화하여 신규 기능과 다중 소켓에 대응',
        ],
        rewards: ['re-rendering 약 80% 감소', '신규 기능 및 다중 채팅 대응이 가능한 확장성 확보', '디버깅 및 유지보수 효율 개선'],
        lesson:
          '레거시를 "개선"하는 것과 "분리"하는 것은 전혀 다른 접근입니다. 복잡하게 결합된 코드는 고치는 것보다 의존성을 끊고 독립적인 모듈로 분리하는 것이 결과적으로 더 빠르고 안전하다는 것을 배웠습니다.',
      },
      {
        id: 'pandatv-helper',
        title: '팬더TV 도우미',
        role: 'PO, 개발, 리팩터링',
        stack: ['Next.js', 'IndexedDB', 'Zustand', 'Tailwind CSS', 'Centrifugo', 'React Query', 'GitHub Actions'],
        problem: [
          '스파게티 코드와 잘못된 상태 관리로 불필요한 연산과 반복 로직이 발생해 사용자 렉과 성능 저하가 빈번했습니다.',
          '특히 IndexedDB의 잘못된 사용으로 불필요한 loop와 데이터 처리 비효율이 발생하고 있었습니다.',
        ],
        crux: '구조적인 문제로 성능 저하와 유지보수 어려움이 동시에 발생하는 상태',
        approach: '부분적인 수정이 아닌 구조 단위에서 문제를 해결했습니다.',
        steps: [
          'IndexedDB 구조 개선 및 불필요한 loop 제거',
          '복잡하게 얽힌 hook 구조 제거 및 상태 최소화',
          '불필요한 비즈니스 로직 및 오버코딩 제거',
          '코드 컨벤션 정의 및 프로젝트 전반 적용',
        ],
        rewards: ['re-rendering 90% 이상 감소', '리소스 사용량 70% 이상 감소', '사용자 체감 렉 90% 이상 감소', '이슈 대응 속도 및 유지보수 효율 향상'],
        lesson:
          '코드 컨벤션과 상태 관리 기준을 정립한 뒤 이슈 대응 속도와 팀 전체의 개발 효율이 눈에 띄게 달라졌습니다. 개인의 코딩 능력보다 팀이 공유하는 기준이 프로젝트 품질에 더 큰 영향을 준다는 것을 체감했습니다.',
        boss: 'hydra',
      },
      {
        id: 'pandatv-partner',
        title: '팬더TV 파트너 플랫폼',
        role: 'PO, 개발',
        stack: ['Next.js', 'Tailwind CSS', 'React Query', 'GitHub Actions'],
        problem: [
          'PHP 기반 레거시 통계 플랫폼으로 UI 구조가 일관되지 않고 확장성이 부족해, 파트너 타입 변경이나 신규 기능 추가 시 반복적인 수정이 발생했습니다.',
          '컴포넌트 단위로 설계되어 있지 않아 코드 재활용이 어려웠고, 유지보수와 신규 기능 개발 비용이 계속 증가했습니다.',
        ],
        crux: '확장성과 재사용성을 고려한 구조 개선이 필요한 상황',
        approach: '단순 마이그레이션이 아닌, 변경 가능성과 재사용성을 고려한 구조 설계에 집중했습니다.',
        steps: [
          'React 기반으로 전면 재구축',
          '아토믹 디자인 패턴 적용으로 컴포넌트 단위 구조 설계',
          '사용자 등급에 따른 접근 제어 구조 설계',
          'GitHub Actions 기반 CI/CD 파이프라인 구축',
        ],
        rewards: [
          'UI 확장성과 유지보수성 개선',
          '컴포넌트 단위 개발 및 테스트 환경 확보',
          '배포 자동화로 운영 효율 향상',
          '디자이너와 어드민 공통 컴포넌트 기준을 정의해 디자인 시스템으로 확장할 기반 마련',
        ],
        lesson:
          '하나의 프로젝트를 위한 컴포넌트 설계가 이후 다른 프로젝트의 디자인 시스템 기반이 되는 과정을 경험하며, 좋은 설계는 프로젝트를 넘어 조직 전체의 자산이 될 수 있다는 것을 배웠습니다.',
      },
    ],
    sideQuests: [
      { title: '팬더TV (개발, 부분 리팩터링)', desc: 'Tailwind 설정 등 구조 개선 및 다크/라이트 모드 적용, 리소스 관리 구조 정리로 유지보수성 개선' },
    ],
  },
  {
    chapter: 2,
    company: '1024',
    period: '2022.05 ~ 2023.11',
    position: '전임',
    quests: [
      {
        id: 'samsung-s22',
        title: '삼성 S22 체험관 사이트',
        role: '일부 개발 참여',
        stack: ['Three.js'],
        problem: ['대용량 3D 모델링 기반 웹페이지의 초기 로딩 속도(약 5~7초)가 느려 사용자 이탈 가능성이 높은 상황이었습니다.'],
        crux: '성능 최적화가 필요한 상황',
        steps: ['Three.js 기반 모델 부분 로딩 구조 적용', '해상도별 렌더링 최적화', '불필요한 리소스 중복 로딩 제거'],
        rewards: ['초기 로딩 속도 2초 이하로 개선', '저사양 환경에서도 안정적인 서비스 제공'],
        lesson:
          '코드 레벨의 최적화에는 한계가 있고, 무엇을 언제 로딩할 것인가라는 전략적 판단이 체감 성능에 훨씬 큰 영향을 준다는 것을 배웠습니다.',
      },
      {
        id: 'genesis-global',
        title: '제네시스 해외 홍보 사이트',
        role: 'PO',
        stack: ['React'],
        problem: ['다양한 애니메이션 라이브러리를 함께 사용하면서 라이브러리 간 충돌로 기능이 불안정했습니다.'],
        crux: '안정적인 애니메이션 구조 설계 및 불필요한 라이브러리 제거 필요',
        approach: '문제를 단순히 수정하는 것이 아니라 의존성 자체를 줄이는 방향으로 접근했습니다.',
        steps: ['사용 중인 애니메이션 라이브러리 구조 분석', '중복되거나 불필요한 라이브러리 제거', '일부 인터랙션을 직접 구현하여 외부 의존성 축소'],
        rewards: ['라이브러리 충돌 문제 해결 및 서비스 안정성 확보', '의존성 감소로 유지보수성 개선', '복잡도 감소로 개발 및 디버깅 효율 향상'],
        lesson:
          '라이브러리는 기능을 빠르게 구현해 주지만 동시에 제어할 수 없는 리스크를 가져옵니다. 직접 구현하는 비용과 외부 의존성의 리스크를 비교하는 판단력이 안정적인 서비스를 만드는 핵심이라는 것을 배웠습니다.',
      },
      {
        id: 'medical-app',
        title: '소아암, 대장암 환자용 앱',
        role: 'PO',
        stack: ['Flutter', 'React'],
        problem: [
          '웹 중심으로만 개발하던 환경에서 모바일 앱 개발 역량이 없어 프로젝트 수주 기회가 제한되었습니다.',
          '앱 서비스까지 확장해야 했고, 의료 정보 특성상 높은 보안 요구사항도 충족해야 했습니다.',
        ],
        crux: '모바일 앱 역량 확보와 의료 수준의 보안이 동시에 필요한 상황',
        approach: '모바일 앱 개발 역량 확보를 위해 Flutter 도입을 제안하고 직접 학습해 프로젝트에 적용했습니다.',
        steps: ['웹뷰 통신 프로세스 정립 및 가이드라인 정의', '사용자 인증 구조 강화 및 다중 인증 로직 적용'],
        rewards: ['모바일 앱 개발 역량 확보로 프로젝트 확장 가능성 확보', '웹뷰 기반 개발 프로세스 표준화 및 가이드 정립', '인증 구조 개선을 통한 보안성 확보'],
        lesson:
          '새로운 기술을 직접 제안하고 학습해 적용하며, 기술 도입은 완벽한 준비보다 빠른 검증과 반복이 더 효과적이라는 것을 배웠습니다. 기술 하나의 선택이 팀의 사업 범위까지 넓힐 수 있다는 것도 체감했습니다.',
      },
    ],
    sideQuests: [
      { title: '티다 문구점 템플릿', desc: 'CSS 네이밍 표준화 및 컨벤션 정의로 재사용성과 협업 효율 개선' },
      { title: '기업소개 및 어드민 사이트', desc: 'SSR 기반 구조 설계로 초기 로딩 성능 개선 및 운영 효율 향상' },
      { title: '리그오브레전드 이벤트 사이트', desc: '정적 사이트 최적화로 초기 로딩 속도 개선 및 사용자 이탈률 감소' },
    ],
  },
  {
    chapter: 1,
    company: '애니팬',
    period: '2019.08 ~ 2022.04',
    position: '사원',
    quests: [
      {
        id: 'friends-test',
        title: '프렌즈 심리테스트 사이트',
        role: 'PO',
        stack: ['React', 'AWS S3'],
        problem: [
          '단일 페이지 서비스에서 다수의 동시 접속 상황에도 안정적인 사용자 경험을 제공해야 했습니다.',
          '프론트엔드 단독 개발 환경에서 배포와 운영까지 고려한 구조 설계가 필요했습니다.',
        ],
        crux: '혼자서 개발부터 운영까지 책임져야 하는 상황',
        steps: ['React 기반 SPA 구조 설계 및 상태 관리 적용', 'AWS S3 기반 정적 배포 구조 설계', 'CI/CD 환경 구축으로 자동 배포 프로세스 적용'],
        rewards: ['배포 자동화를 통한 운영 효율 향상', '개발부터 배포까지 End-to-End 경험 확보'],
        lesson:
          '배포와 운영까지 직접 경험하면서, 코드 밖의 영역을 이해하는 것이 더 나은 설계 판단으로 이어진다는 것을 배웠습니다.',
      },
    ],
    sideQuests: [
      { title: 'NFT 거래소 (Vue.js)', desc: '대용량 콘텐츠 처리 최적화로 로딩 속도 개선 및 사용자 이탈률 감소' },
      { title: '암호화폐 거래 봇 (Python)', desc: '실행 속도 개선 및 최적화로 실시간 대응력 향상' },
      { title: '블록체인 인증 플랫폼 (.NET, JavaScript)', desc: 'QR 기반 인증 구조 설계로 보안성과 사용자 접근성 개선' },
      { title: '공장 대시보드 (.NET, MSSQL)', desc: '사용자 맞춤형 데이터 구조 설계로 생산성 및 업무 효율 향상' },
      { title: '정기 배송 쇼핑몰 (.NET, MSSQL)', desc: '주문 및 배송 프로세스 자동화로 운영 효율 개선 및 오류 감소' },
      { title: '홍보 웹사이트 및 기업 사이트 (React, .NET)', desc: 'UX 개선 및 재사용 가능한 구조 설계로 유지보수성 향상' },
    ],
  },
]

export const prologue = {
  company: '크론티어스',
  period: '2019.02 ~ 2019.05',
  desc: 'AngularJS 기반 웹 서비스 프론트엔드 개발',
}
