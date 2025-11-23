# Cloud Table Example

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

### CloudDialog - 전역 Dialog 시스템 설계

본 프로젝트의 핵심은 **Zustand + createPortal + Custom Hook**을 활용한 전역 Dialog 관리 시스템입니다.  
애플리케이션 어디서든 한 줄의 코드로 Dialog를 열 수 있으며, 단일 컴포넌트로 여러 타입(생성/수정)을 처리하여 코드 중복을 최소화했습니다.

#### 설계

- **전역 접근성**: 컴포넌트 트리 구조와 무관하게 어디서든 Dialog 제어 가능
- **단일 책임**: 생성/수정 모드를 하나의 컴포넌트에서 통합 처리하여 유지보수성 극대화
- **선언적 API**: 복잡한 상태 관리를 Custom Hook으로 캡슐화하여 개발자 경험 향상
- **최상위 렌더링**: createPortal로 z-index 충돌을 원천 차단하고 독립적인 레이어 구성

#### 기술적 구현

**1. Zustand로 전역 상태 관리** (`shared/hooks/useCloudDialog.ts`)

- Redux보다 가볍고(~2KB) 보일러플레이트가 적으며, Context API와 달리 Provider 불필요
- devtools 미들웨어로 개발 중 상태 변화 추적 가능
- TypeScript 타입 안전성으로 실수 방지

**2. createPortal로 최상위 렌더링** (`widgets/CloudDialog/CloudDialog.tsx`)

- layout.tsx의 `<div id="cloud-dialog">` 요소에 Portal로 렌더링
- 컴포넌트 계층 구조와 독립적으로 항상 최상위 레이어에 배치
- CSS 상속 문제 해결 및 z-index 관리 용이

**3. 타입 기반 재사용성**

- `dialogInfo.type`에 따라 생성/수정 로직 자동 분기
- 확인 버튼 텍스트, API 호출, 초기 데이터 등이 타입에 따라 동적 변경
- 향후 삭제, 복제 등 추가 타입 확장도 간편하게 가능

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

#### 접근성 및 UX

**사용자 경험을 최우선으로 고려한 Dialog 설계**

- **ESC 키 지원**: 키보드만으로도 Dialog 닫기 가능
- **배경 클릭 닫기**: 모달 외부 클릭 시 자동 종료
- **스크롤 방지**: Dialog 열릴 때 배경 스크롤 차단 및 위치 복원
- **로딩 상태**: API 호출 중 버튼 비활성화로 중복 요청 방지
- **실시간 유효성 검증**: 필수 필드 미입력 시 즉각적인 시각적 피드백

#### 유효성 검사 함수

```typescript
// shared/lib/utils.ts
export const isValidInput = (value: string | undefined | null): boolean => {
  return !!(value && value.trim().length > 0);
};
```

다이얼로그 확인 버튼은 Provider별 필수 필드(AWS: accessKeyId/secretAccessKey, Azure: tenantId/subscriptionId/applicationId/secretKey, GCP: jsonText)가 모두 유효할 때만 활성화됩니다.

---

**작성자**: 조현준 (chohj7636@gmail.com)
