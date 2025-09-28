# Tatum Cloud Table

멀티 클라우드 환경(AWS, Azure, GCP)을 통합 관리하는 Next.js 기반 웹 애플리케이션입니다.

## 개발 환경

- node version : v22.19.0
- package manager : yarn
- yarn version : v1.22.22

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build

# 프로덕션 서버 실행
yarn start
```

개발서버 : http://localhost:3000

## 주요 기능

- **클라우드 계정 관리**: AWS, Azure, GCP 통합 관리
- **다이얼로그 기반 CRUD**: 생성/수정 통합 다이얼로그
- **Provider 별 동적 필드**: 클라우드별 맞춤형 설정
- **Schedule Scan 설정**: 시간/일/주/월 단위 스케줄링
- **멀티 셀렉트**: 리전 및 클라우드 그룹 다중 선택
- **폼 검증 및 에러 핸들링**: 실시간 유효성 검사

## 기술 스택

### Core

- **Next.js 15** - App Router, Server Components
- **TypeScript** - 타입 안전성 보장

### Styling & UI

- **TanStack Table** - 쉽고 빠른 간단한 Table UI
- **Tailwind CSS** - 유틸리티 퍼스트 CSS
- **Shadcn/ui** - 재사용 가능한 UI 컴포넌트
- **Radix UI** - 접근성 기반 Primitive 컴포넌트
- **Lucide React** - 아이콘 시스템

### State Management

- **Zustand** - 전역 상태 관리 (다이얼로그)
- **TanStack Query** - 서버 상태 관리 및 캐싱

### Developer Experience

- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅

## 프로젝트 구조 (FSD Architecture)

```
src/
├── app/
│   ├── api/                    # API Routes
│       ├── cloudList/          # Cloud table list 목업 데이터 API
│       ├── editCloud/          # Cloud 상세 정보 목업 데이터
│   ├── globals.css             # 전역 스타일
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx                # 메인 페이지
├── widgets/
│   ├── CloudDialog/            # 클라우드 다이얼로그 위젯
│   ├── CloudTableContainer.tsx
│   └── PageHeader.tsx
├── features/
│   └── cloudTable/
│       ├── cloudList/          # 목록 조회 기능
│       │   ├── api/            # api 호출 로직 및 타입 정의
│       │   ├── config/         # table columns 정의
│       │   ├── hook/           # react query 호출 훅 정의
│       │   └── ui/             # cloudList 관련 UI
│       ├── createCloud/        # 생성 기능
│       │   ├── ...
│       │   └── ...
│       └── editCloud/          # 수정 기능
│           ├── ...
│           └── ...
└── shared/
    ├── components/             # 재사용 컴포넌트
    ├── hooks/                  # 공통 훅
    ├── lib/                    # 유틸리티 함수
    └── types/                  # 타입 정의
```

### FSD (Feature-Sliced Design)

본 프로젝트는 **Feature-Sliced Design** 아키텍처를 기반으로 구성되어 있습니다.

#### 아키텍처 원칙

- **Layer 분리**: app → widgets → features → shared 순서의 계층 구조
- **Feature 중심**: 비즈니스 로직별 독립적 모듈화
- **의존성 방향**: 상위 레이어만 하위 레이어를 참조 가능
- **확장성**: 새로운 기능 추가 시 기존 코드에 영향 최소화

#### 커스텀 레이어 구조

프로젝트 규모에 맞게 기존 FSD 아키텍처를 다음과 같이 재구성

- **app**: Next.js App Router + API Routes
  - app, pages Layer가 통합된 형태
- **widgets**: 페이지 레벨의 조합된 컴포넌트
- **features**: 비즈니스 로직 단위의 기능
  - featues, entities Layer가 통합된 형태
- **shared**: 공통으로 사용되는 리소스

## API 관리 방안

**FSD 아키텍처 기반의 기능별 API 관리를 통해 확장성과 유지보수성을 극대화합니다.**

본 프로젝트는 다음과 같은 구조로 API를 체계적으로 관리합니다.

- **features/** 내부에서 기능별로 API 분할 관리
- **type.ts**에서 API의 request, response 타입 정의
- **api.ts**에서 실제 API 호출 로직 구현
- **React Query 기반 훅**으로 컴포넌트에서 손쉬운 API 사용

### 1. API 설계 원칙

#### 1.1 RESTful API 구조

```typescript
// 리소스별 엔드포인트 명명 규칙
GET     /api/cloudList          # 목록 조회
POST    /api/createCloud        # 생성
GET     /api/editCloud/[id]     # 단일 조회
POST    /api/editCloud/[id]     # 수정
...
```

#### 1.2 응답 형태 표준화 & 타입 명명 규칙

```typescript
// 요청 타입 예시
export interface GetCloudInfoParams {
  id: string;
}

export interface PostCreateCloudInfoParams {
  data: Cloud;
  timestamp: string;
}

// 응답 타입 예시
export interface GetCloudInfoResponse {
  data: Cloud | null;
  timestamp: string;
}

// 에러 응답 예시
interface ApiErrorResponse {
  success: false;
  error: string;
  timestamp: string;
}
```

### 2. 타입 정의 가이드라인

#### 2.1 API별 타입 구조

```
features/[feature]/api/
├── api.ts        # API 호출 함수
└── type.ts       # 요청/응답 타입 정의
```

### 3. React Query 훅 구성

재사용성과 일관성을 위해 기능별로 커스텀 React Query 훅을 구현했습니다.  
이를 통해 컴포넌트 어디서든 동일한 API 호출 패턴을 사용할 수 있습니다.

#### 3.1 Query 훅 구조

```typescript
export const useCloudTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cloud-table'],
    queryFn: () => getCloudListApi(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    select: (data) => data.data,
  });

  return {
    cloudTableData: data,
    isCloudTableLoading: isLoading,
    cloudTableError: error,
  };
};
```

#### 3.2 Mutation 훅 구조

```typescript
export const useCreateCloud = () => {
  const { mutate: createCloudInfo } = useMutation({
    mutationFn: (data: PostCreateCloudInfoParams) => {
      return postCreateCloudInfoApi(data);
    },
    onSuccess: () => {
      toast.success('클라우드 생성 성공');
    },
    onError: (error) => {
      console.error('클라우드 생성 실패:', error);
      toast.error('클라우드 생성에 실패했습니다.');
    },
  });

  return { createCloudInfo };
};
```

### 4. 에러 핸들링

사용자 경험 향상을 위해 Toast 메시지를 활용한 직관적인 에러 핸들링을 구현했습니다.  
현재는 일관된 에러 메시지 제공에 중점을 두고 있으며, 향후 세분화된 에러 타입 적용을 고려하고 있습니다.

#### 4.1 API 레벨 에러 처리

```typescript
export const getCloudListApi = async (): Promise<GetCloudTableResponse> => {
  try {
    const response = await fetch('/api/cloudList', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API 호출 실패:', error);
    return {
      data: [],
      timestamp: new Date().toISOString(),
    };
  }
};
```

## 주요 컴포넌트 가이드

### 1. CloudDialog - 통합 다이얼로그

#### 특징

- **단일 컴포넌트**: 생성/수정 모드 통합
- **프로바이더별 동적 필드**: AWS, Azure, GCP 자동 전환
- **포털 렌더링**: body에 다이얼로그 렌더링
- **접근성**: ESC 키, 배경 클릭 지원

#### 사용법

createPortal과 Zustand를 활용하여 애플리케이션 전역에서 다이얼로그 상태를 제어할 수 있는 커스텀 훅 기반 설계

```typescript
const { cloudDialog } = useCloudDialog();

// 생성 다이얼로그
cloudDialog({
  type: 'create',
  confirmButton: { text: '생성' },
});

// 수정 다이얼로그
cloudDialog({
  type: 'edit',
  editCloudId: 'cloud-id-123',
  confirmButton: { text: '수정' },
});
```

#### 유효성 검사 함수

다이얼로그에서 생성/수정 시 필수 입력 항목들의 유효성을 실시간으로 검증합니다.  
모든 필수 필드가 올바르게 입력되었을 때만 확인 버튼이 활성화되어 사용자 실수를 방지

```typescript
// shared/lib/utils.ts
export const isValidInput = (value: string | undefined | null): boolean => {
  return !!(value && value.trim().length > 0);
};
```

### 2. CloudTable - 데이터 테이블

#### 특징

- **TanStack Table 기반**의 고성능 가상화 테이블
- **Provider 아이콘**을 통해 AWS, Azure, GCP 시각적 구분
- **상태 표시**: 활성/비활성 상태 배지
- **액션 버튼**: 수정/삭제 버튼

#### 칼럼 목록

- Provider
- Name
- Cloud Group
- Event Process
- User Activity
- Regions
- Action (edit, delete)

## UX 디테일

### Dialog (다이얼로그)

<!-- <details>
<summary>dialog 필드 배치</summary>
<div markdown="1">

    /**
       * Create Cloud fields
       *
       * 기본 설정
       * Cloud Name *
       * Provider *
       * Key Registration Method
       *
       * 인증
       * Credentials
       *   Access Key
       *   Secret Key
       *
       * 지역 및 네트워크
       * Region
       * Proxy URL
       *
       * 스캐닝 스케줄 설정
       * Scan Schedule Setting
       *    Set Scan Frequency
       *        Daily()
       *        date
       *        Day of week
       *        hour
       *        minute
       *
       * 고급 설정
       * cloudGroupName 클라우드 그룹 이름
       * Event Integration 이벤트 소스
       * eventProcessEnabled 이벤트 처리 활성화
       * userActivityEnabled 사용자 활동 추적
       *
       */

</div>
</details> -->

#### 상태 관리 및 접근성

- **Zustand 기반 전역 상태 관리**: useCloudDialog 훅을 통한 어플리케이션 전역 다이얼로그 제어
- **createPortal 활용**: 루트 레벨에서 다이얼로그를 렌더링하여 z-index 충돌 방지
- **키보드 네비게이션**: ESC 키 및 모달 외부 클릭으로 다이얼로그 닫기 지원
- **생성/수정 모드 통합**: 단일 컴포넌트에서 타입에 따른 동적 렌더링

#### MultiSelect UI 설계

- **체크박스 그룹 방식 채택**: Region과 CloudGroup 필드에 드롭다운 대신 체크박스 그룹 사용
- **사용성 개선**: 선택된 항목들을 한눈에 확인 가능하며, 드롭다운 대비 클릭 횟수 최소화
- **필수 선택 강제**: Global region은 필수 선택으로 고정하여 설정 오류 방지
- **상수 데이터 활용**: CloudGroupName은 미리 정의된 상수값으로 관리

#### 직관적인 입력 컨트롤

- **Switch 컴포넌트**: 이진 선택 값들(eventProcessEnabled, userActivityEnabled)에 Switch 사용
- **실시간 피드백**: 사용자 입력에 따른 즉각적인 UI 반응 제공

#### 스케줄 스캔 설정

- **유연한 주기 설정**: 매시/매일/매주/매월 단위로 세분화된 스케줄링 지원
  - 매월: 날짜, 시간, 분 설정
  - 매주: 요일, 시간, 분 설정
  - 매일: 시간, 분 설정
  - 매시: 분 설정
- **상태 보존**: 주기 변경 시에도 이전 설정값을 유지하여 사용자 편의성 향상
- **조건부 데이터 전송**: 선택된 주기에 따라 필요한 필드만 서버로 전송

#### 프로바이더별 동적 필드

- **확장 가능한 설계**: AWS 외 프로바이더(Azure, GCP) 활성화 시 자동으로 해당 인증 필드로 전환
- **현재 제한**: AWS만 활성화되어 있으나, 프로바이더 변경 시 동적 필드 렌더링 준비 완료
- **공통 핸들러**: input name 속성을 활용한 통합 값 관리 핸들러로 코드 중복 최소화

#### 고급 설정 UI

- **Collapsible 디자인**: 선택적 설정들을 접을 수 있도록 하여 UI 복잡도 감소
- **기본 상태**: 접힌 상태로 시작하여 핵심 설정에 집중할 수 있도록 설계

### API 상호작용

#### 로딩 및 피드백

- **모의 네트워크 지연**: 실제 환경과 유사한 경험 제공을 위해 500ms 인위적 지연 적용
- **스켈레톤 UI**: 데이터 로딩 중 레이아웃 유지 및 시각적 피드백 제공
- **토스트 알림**: API 요청 성공/실패에 따른 즉시 피드백으로 사용자 경험 향상
- **버튼 상태 관리**: 요청 진행 중 다이얼로그 버튼 비활성화로 중복 요청 방지

#### 에러 처리 정책

- **통합 에러 메시지**: 현재는 임의 에러 문구 제공 (에러 타입 미지정)

### Table (클라우드 테이블)

#### 상호작용 요소

- **호버 효과**: 수정/삭제 버튼에 시각적 피드백 제공
- **로딩 상태**: 데이터 패칭 중 스켈레톤 UI로 일관된 레이아웃 유지
- **빈 상태 처리**: 데이터 부재 시 명확한 안내 메시지 표시

### 접근성 (Accessibility)

- Tab 키로 모든 인터랙티브 요소 접근 가능
- `aria-label` 속성으로 버튼 설명
- `role` 속성으로 요소 역할 명시
- 충분한 색상 대비 및 포커스 아웃라인 제공

## 🌐 i18n 적용 방안

### 개요

**현재 프로젝트는 다국어를 지원하지 않습니다.**

향후 글로벌 서비스 확장이나 다국어 지원이 필요할 경우를 대비하여, **next-intl** 라이브러리를 활용한 구현 방안을 제안합니다. 현재의 FSD(Feature-Sliced Design) 아키텍처를 유지하면서 각 레이어별로 번역 파일을 체계적으로 관리하는 방식으로 설계할 수 있습니다.

### 작성 배경 및 AI 활용 방식

지금까지 i18n을 고려하여 개발한 경험이 거의 없습니다. 이번 기회를 통해 i18n에 대한 리서치를 진행하였고, FSD 구조에 어떻게 적용하면 좋을지 AI를 최대한
활용하여 작성하였습니다.

**전략적 접근 과정**:

1. **문제 인식**: 과제 요구사항에서 언급된 "i18n json 관리, 번역 수행, 코드 작성의 어려움"을 해결하는 것이 핵심
2. **리서치 진행**: Next.js 생태계의 i18n 라이브러리 비교 분석 (next-intl, react-i18next, Next.js 내장)
3. **AI 활용**:
   - i18n 개념 학습 및 라이브러리별 장단점 분석
   - FSD 아키텍처와 i18n의 결합 방안 탐색
   - 실제 코드 구조 및 사용 패턴 예시 작성
4. **검증 및 정제**: AI가 제안한 구조를 FSD 원칙과 대조하여 검증하고 현실적 적용 방안으로 다듬음

이번 기회를 통해 **전략적 사고와 AI 도구를 결합하여** 실무 경험 부족을 보완하고자 했습니다.

### 구조 예시

```
src/
├── app/                           # 라우팅 및 전역 설정
│   └── [locale]/
│       ├── layout.tsx            # 언어별 레이아웃
│       └── page.tsx
├── shared/                       # 공통 i18n 인프라
│   ├── config/i18n/             # 전역 i18n 설정
│   │   ├── config.ts            # next-intl 설정
│   │   └── navigation.ts        # 국제화된 라우팅
│   ├── lib/i18n/                # i18n 유틸리티
│   │   ├── client.ts            # 클라이언트 훅들
│   │   └── types.ts             # 타입 정의
│   └── locales/                 # 전체 공통 번역
│       ├── ko/
│       │   ├── common.json      # 버튼, 상태 등
│       │   └── validation.json  # 폼 검증 메시지
│       └── en/
├── features/                    # 도메인별 번역 분리
│   └── cloudTable/
│       ├── locales/ko/cloud.json  # 클라우드 도메인 전용
│       └── hooks/useCloudTranslations.ts
└── widgets/                     # 위젯별 번역 관리
    └── CloudDialog/
        └── locales/ko/dialog.json
```

### Layer 별 번역 파일 구조

#### shared/locales - 전역 공통

```json
// ko/common.json
{
  "buttons": {
    "save": "저장", "cancel": "취소", "confirm": "확인"
  },
  "status": {
    "loading": "로딩 중...", "error": "오류 발생"
  }
}

// ko/validation.json
{
  "required": "{field}는 필수입니다",
  "invalid": "유효하지 않은 {field}입니다"
}
```

#### features - 도메인별 특화

```json
// features/cloudTable/locales/ko/cloud.json
{
  "table": {
    "headers": {
      "name": "클라우드 이름",
      "provider": "제공업체",
      "region": "지역"
    }
  },
  "actions": {
    "create": "클라우드 생성",
    "connect": "연결 테스트"
  },
  "providers": {
    "aws": "Amazon Web Services",
    "azure": "Microsoft Azure"
  }
}
```

#### widgets - 컴포넌트별 독립

```json
// widgets/CloudDialog/locales/ko/dialog.json
{
  "title": "클라우드 설정",
  "tabs": {
    "basic": "기본 정보",
    "credentials": "인증 정보",
    "advanced": "고급 설정"
  }
}
```

---

### 특징

#### 1. **레이어별 관심사 분리**

- **shared**: 프로젝트 전체에서 공통으로 사용하는 번역
- **features**: 특정 비즈니스 도메인 관련 번역만 관리
- **widgets**: 재사용 가능한 UI 컴포넌트의 독립적 번역

#### 2. **도메인별 번역 훅 패턴**

```typescript
// features/cloudTable/hooks/useCloudTranslations.ts
export const useCloudTranslations = () => {
  const t = useTranslations('cloud');

  // 도메인 특화된 번역 그룹핑
  return {
    tableHeaders: {
      name: t('table.headers.name'),
      provider: t('table.headers.provider'),
      status: t('table.headers.status'),
    },
    actions: {
      create: t('actions.create'),
      edit: t('actions.edit'),
    },
  };
};
```

#### 3. **효율적인 번들링**

- 각 feature/widget별로 필요한 번역만 로드
- 사용하지 않는 도메인의 번역은 번들에 포함되지 않음

---

### 사용 패턴 예시

#### 공통 번역 사용

```typescript
// shared 레이어의 공통 훅
import { useCommonTranslations } from '@/shared/lib/i18n/client';

export const SaveButton = () => {
  const common = useCommonTranslations();
  return <button>{common('buttons.save')}</button>;
};
```

#### 도메인별 번역 사용

```typescript
// feature 레이어의 특화 훅
import { useCloudTranslations } from '../hooks/useCloudTranslations';

export const CloudTable = () => {
  const { tableHeaders, actions } = useCloudTranslations();

  return (
    <table>
      <thead>
        <tr>
          <th>{tableHeaders.name}</th>
          <th>{tableHeaders.provider}</th>
        </tr>
      </thead>
    </table>
  );
};
```

---

### 기존 i18n 문제점 해결 방안

#### 1. **i18n JSON 관리 어려움** 해결

- **문제**: 번역 파일이 중앙집중화되어 관리 복잡성 증가
- **해결**: FSD 레이어별 분산 관리로 도메인 책임 분리
  ```
  ❌ 기존: 모든 번역이 하나의 거대한 JSON
  ✅ 제안: shared(공통) + features(도메인별) + widgets(컴포넌트별)
  ```

#### 2. **번역 수행 어려움** 해결

- **문제**: 번역가가 기술적 구조를 이해하기 어려움
- **해결**: 직관적인 네임스페이스와 명확한 키 구조
  ```json
  // 번역가 친화적 구조
  "table": {
    "headers": { "name": "클라우드 이름" },
    "actions": { "create": "클라우드 생성" }
  }
  ```

#### 3. **코드 작성 어려움** 해결

- **문제**: 개발자가 번역 키를 찾기 어렵고 타입 안전성 부족
- **해결**: 도메인별 훅과 TypeScript 지원
  ```typescript
  // 개발자 친화적 사용법
  const { tableHeaders, actions } = useCloudTranslations();
  // 자동완성 + 타입 안전성 제공
  ```

---

### 추가 기대 효과

#### 1. **확장성**

- 새로운 언어 추가 시 각 레이어별로 독립적 작업 가능
- 도메인별 번역 팀 분업 가능

#### 2. **유지보수성**

- 번역 변경 시 해당 도메인만 영향
- 사용하지 않는 번역의 자동 식별 가능

#### 3. **개발자 경험**

- 도메인별 타입 안전성 제공
- IDE에서 자동완성으로 번역 키 추천

#### 4. **성능 최적화**

- 필요한 번역만 선택적 로드
- 코드 스플리팅과 자연스럽게 연계

---

### 도입 시 권장 단계

1. **shared 레이어 구축**: 공통 i18n 인프라 및 기본 번역
2. **주요 feature 적용**: 핵심 비즈니스 로직부터 단계적 적용
3. **widget 레이어 확장**: 재사용 컴포넌트의 독립적 번역 관리
4. **타입 시스템 강화**: 번역 키 자동완성 및 검증 체계 구축

이러한 구조로 적용하면 **FSD의 레이어 분리 원칙을 유지**하면서도 **체계적인 다국어 지원**이 가능할 것으로 예상됩니다.

---

**작성자**: 조현준 (chohj7636@gmail.com)
