# 부트페이 홈페이지

결제도, 쇼핑몰도, 딸깍 한 번으로. 개발자에게는 자유를, 창업자에게는 단순함을 제공하는 통합 커머스 솔루션입니다.

## 🚀 프로젝트 구조

```
homepage/
├── index.html              # 메인 HTML 파일
├── styles/                 # CSS 스타일 파일들
│   ├── main.css           # 메인 스타일 및 디자인 시스템
│   ├── components.css     # 컴포넌트별 스타일
│   └── animations.css     # 애니메이션 효과
├── js/                    # JavaScript 파일들
│   ├── main.js           # 메인 로직 및 컴포넌트 로더
│   └── components.js     # 컴포넌트별 인터랙션
├── components/            # HTML 컴포넌트들
│   ├── header.html       # 헤더 컴포넌트
│   ├── hero.html         # 히어로 섹션
│   ├── problem.html      # 문제점 섹션
│   ├── solution.html     # 솔루션 섹션
│   ├── features.html     # 기능 소개
│   ├── use-cases.html    # 사용 사례
│   ├── integration.html  # 연동 방법
│   ├── analytics.html    # 분석 대시보드
│   ├── trust.html        # 신뢰도 섹션
│   ├── cta.html          # 행동 유도
│   └── footer.html       # 푸터
└── README.md             # 프로젝트 설명서
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary Blue**: #3182F6 (메인 브랜드 컬러)
- **Success Green**: #00D4AA (성공, 완료)
- **Warning Yellow**: #FFB800 (경고, 주의)
- **Error Red**: #F44336 (오류, 실패)
- **Gray Scale**: 50-900 단계별 그레이

### 타이포그래피
- **폰트**: Pretendard (Toss에서 사용하는 폰트)
- **크기**: 1rem ~ 3.5rem (반응형)
- **두께**: 100 ~ 900

### 컴포넌트
- **카드**: Glassmorphism 효과, 호버 애니메이션
- **버튼**: 리플 효과, 호버 변형
- **아이콘**: 호버 시 회전 및 확대
- **입력 필드**: 포커스 효과, 유효성 검사

## ✨ 주요 기능

### 1. 모듈화된 구조
- 컴포넌트별 HTML 분리
- CSS 모듈화 (메인, 컴포넌트, 애니메이션)
- JavaScript 모듈화 (메인, 컴포넌트)

### 2. 반응형 디자인
- 모바일 우선 접근법
- Tailwind CSS 활용
- CSS Grid & Flexbox

### 3. 인터랙티브 요소
- 스크롤 트리거 애니메이션
- 호버 효과 및 마이크로 인터랙션
- 부드러운 전환 효과

### 4. 성능 최적화
- 컴포넌트 지연 로딩
- Intersection Observer 활용
- CSS 애니메이션 최적화

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: CSS 변수, Grid, Flexbox, 애니메이션
- **JavaScript (ES6+)**: 모듈화, 비동기 처리
- **Tailwind CSS**: 유틸리티 클래스
- **Font Awesome**: 아이콘
- **Pretendard**: 한글 폰트

## 📱 반응형 브레이크포인트

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 시작하기

### 1. 프로젝트 클론
```bash
git clone [repository-url]
cd homepage
```

### 2. 로컬 서버 실행
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### 3. 브라우저에서 확인
```
http://localhost:8000
```

## 🔧 개발 가이드

### 새로운 컴포넌트 추가
1. `components/` 폴더에 HTML 파일 생성
2. `styles/components.css`에 스타일 추가
3. `js/components.js`에 인터랙션 추가
4. `index.html`에 컨테이너 추가

### 스타일 수정
- **전역 스타일**: `styles/main.css`
- **컴포넌트 스타일**: `styles/components.css`
- **애니메이션**: `styles/animations.css`

### JavaScript 기능 추가
- **메인 로직**: `js/main.js`
- **컴포넌트 로직**: `js/components.js`

## 📁 파일 설명

### CSS 파일들
- **main.css**: 디자인 시스템, 기본 스타일, 유틸리티
- **components.css**: 버튼, 카드, 폼 등 컴포넌트 스타일
- **animations.css**: 애니메이션 키프레임, 전환 효과

### JavaScript 파일들
- **main.js**: 컴포넌트 로더, 스크롤 이벤트, 유틸리티
- **components.js**: 각 컴포넌트별 인터랙션 로직

### HTML 컴포넌트들
각 섹션별로 분리된 HTML 파일들로 유지보수성 향상

## 🎯 디자인 원칙

1. **단순함**: 복잡하지 않은 직관적인 UI
2. **일관성**: 통일된 디자인 시스템
3. **접근성**: 모든 사용자가 사용할 수 있는 인터페이스
4. **성능**: 빠른 로딩과 부드러운 애니메이션
5. **반응형**: 모든 디바이스에서 최적의 경험

## 🔄 업데이트 내역

### v2.0.0 (현재)
- ✅ 모듈화된 컴포넌트 구조
- ✅ Toss 스타일 → 부트페이 스타일 변경
- ✅ 향상된 애니메이션 및 인터랙션
- ✅ 반응형 디자인 개선
- ✅ 성능 최적화

### v1.0.0
- 초기 버전

## 📞 문의

프로젝트 관련 문의사항이 있으시면 언제든 연락주세요.

---

**부트페이** - 결제도, 쇼핑몰도, 딸깍 한 번으로
