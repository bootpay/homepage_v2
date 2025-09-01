# Dexam Landing Page Demo
npx http-server -p 8000
이 프로젝트는 [Dexam - Pure VueJs + HTML + Bootstrap 4 Template](https://demos.ui-lib.com/dexam-angular-html/views/landing.v2.html)을 다운로드하여 편집 가능한 형태로 정리한 것입니다.

## 프로젝트 구조

```
demo_download/
├── index.html              # 메인 HTML 파일 (landing.v2.html 복사본)
├── assets/                 # CSS, JavaScript, 이미지, 폰트 등 리소스
│   ├── styles/            # CSS 파일들
│   │   ├── vendor/        # 외부 라이브러리 CSS
│   │   └── css/           # 메인 테마 CSS
│   ├── js/                # JavaScript 파일들
│   │   ├── vendor/        # 외부 라이브러리 JS
│   │   └── es5/           # ES5 호환 스크립트
│   ├── images/            # 이미지 파일들
│   └── fonts/             # 폰트 파일들
├── views/                  # 원본 HTML 파일들 (다양한 버전)
└── README.md              # 이 파일
```

## 주요 기능

- **반응형 디자인**: Bootstrap 4 기반의 모바일 친화적 레이아웃
- **다양한 섹션**: 헤더, 서비스, 제품, 뉴스, FAQ, 연락처 등
- **인터랙티브 요소**: 슬라이더, 애니메이션, 커스터마이저
- **모던 UI**: 깔끔하고 현대적인 디자인

## 시작하기

1. `index.html` 파일을 웹 브라우저에서 열어보세요
2. 로컬 웹 서버를 실행하여 모든 기능을 테스트할 수 있습니다

## 편집하기

### HTML 수정
- `index.html` 파일을 편집하여 콘텐츠를 변경하세요
- `views/` 폴더에 다양한 버전의 템플릿이 있습니다

### CSS 수정
- `assets/styles/css/themes/lite-purple.min.css`에서 메인 스타일을 수정하세요
- `assets/styles/vendor/`에서 외부 라이브러리 스타일을 확인하세요

### JavaScript 수정
- `assets/js/es5/script.min.js`에서 메인 기능을 수정하세요
- `assets/js/vendor/`에서 외부 라이브러리를 확인하세요

### 이미지 교체
- `assets/images/` 폴더에서 이미지를 교체하세요
- SVG 파일들은 벡터 그래픽으로 쉽게 편집할 수 있습니다

## 사용된 기술

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **JavaScript**: ES5 호환 스크립트
- **Bootstrap 4**: 반응형 프레임워크
- **jQuery**: DOM 조작 및 이벤트 처리
- **Slick**: 이미지 슬라이더
- **AOS**: 스크롤 애니메이션
- **Perfect Scrollbar**: 커스텀 스크롤바

## 라이선스

원본 템플릿의 라이선스를 확인하시기 바랍니다.

## 지원

문제가 있거나 질문이 있으시면 이슈를 생성해 주세요.
