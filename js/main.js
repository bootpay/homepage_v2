// 부트페이 메인 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 컴포넌트 로드
    loadComponents();
    
    // 스크롤 애니메이션 초기화
    initScrollAnimations();
    
    // 인터랙티브 요소 초기화
    initInteractiveElements();
    
    // 모바일 메뉴 초기화
    initMobileMenu();
});

// 컴포넌트 로드 함수
async function loadComponents() {
    const components = [
        { id: 'header-container', file: 'components/header.html' },
        { id: 'hero-container', file: 'components/hero.html' },
        { id: 'problem-container', file: 'components/problem.html' },
        { id: 'solution-container', file: 'components/solution.html' },
        { id: 'features-container', file: 'components/features.html' },
        { id: 'use-cases-container', file: 'components/use-cases.html' },
        { id: 'integration-container', file: 'components/integration.html' },
        { id: 'analytics-container', file: 'components/analytics.html' },
        { id: 'trust-container', file: 'components/trust.html' },
        { id: 'cta-container', file: 'components/cta.html' },
        { id: 'footer-container', file: 'components/footer.html' }
    ];
    
    for (const component of components) {
        try {
            const response = await fetch(component.file);
            if (response.ok) {
                const html = await response.text();
                document.getElementById(component.id).innerHTML = html;
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            console.warn(`Failed to load component: ${component.file}`, error);
            // Fallback: 기본 HTML 내용 제공
            loadFallbackContent(component.id);
        }
    }
}

// Fallback 콘텐츠 로드
function loadFallbackContent(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 각 컨테이너별 기본 콘텐츠
    const fallbackContent = {
        'header-container': `
            <header class="bootpay-nav">
                <div class="container-wide">
                    <nav class="flex items-center justify-between py-6">
                        <div class="bootpay-logo">
                            <i class="fa-solid fa-bolt"></i>
                            <span>부트페이</span>
                        </div>
                        <div class="hidden lg:flex items-center space-x-8">
                            <a href="#payment" class="bootpay-nav-link">결제</a>
                            <a href="#store" class="bootpay-nav-link">쇼핑몰</a>
                            <a href="#pricing" class="bootpay-nav-link">가격</a>
                        </div>
                        <button class="bootpay-button">시작하기</button>
                    </nav>
                </div>
            </header>
        `,
        'hero-container': `
            <section class="bootpay-hero">
                <div class="container-wide text-center py-20">
                    <h1 class="text-5xl lg:text-6xl font-bold mb-8">
                        결제도, 쇼핑몰도,<br>
                        <span class="text-gradient">딸깍 한 번으로.</span>
                    </h1>
                    <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        코드 몇 줄이면 API 연동, 클릭 한 번이면 쇼핑몰 오픈.<br>
                        개발자에게는 자유를, 창업자에게는 단순함을.
                    </p>
                    <div class="flex flex-wrap justify-center gap-4">
                        <button class="bootpay-button">결제 시작하기</button>
                        <button class="bootpay-button-secondary">쇼핑몰 시작하기</button>
                    </div>
                </div>
            </section>
        `,
        'footer-container': `
            <footer class="bg-gray-900 text-white py-16">
                <div class="container-wide text-center">
                    <div class="flex items-center justify-center mb-6">
                        <i class="fa-solid fa-bolt text-blue-400 text-2xl mr-3"></i>
                        <span class="text-2xl font-bold">부트페이</span>
                    </div>
                    <p class="text-gray-400 mb-6">
                        결제도, 쇼핑몰도, 딸깍 한 번으로.
                    </p>
                    <p class="text-gray-500">© 2025 부트페이. All rights reserved.</p>
                </div>
            </footer>
        `
    };
    
    if (fallbackContent[containerId]) {
        container.innerHTML = fallbackContent[containerId];
    } else {
        container.innerHTML = `<div class="p-8 text-center text-gray-500">컴포넌트 로딩 중...</div>`;
    }
}

// 스크롤 애니메이션 초기화
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 스크롤 트리거 요소들 관찰
    document.querySelectorAll('.scroll-trigger').forEach(el => {
        observer.observe(el);
    });
}

// 인터랙티브 요소 초기화
function initInteractiveElements() {
    // 버튼 클릭 효과
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('bootpay-button') || 
            e.target.classList.contains('bootpay-button-secondary') ||
            e.target.classList.contains('bootpay-button-ghost')) {
            
            // 리플 효과 생성
            createRippleEffect(e);
        }
    });
    
    // 카드 호버 효과
    document.addEventListener('mouseenter', function(e) {
        if (e.target.classList.contains('bootpay-card')) {
            e.target.style.transform = 'translateY(-8px) scale(1.02)';
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        if (e.target.classList.contains('bootpay-card')) {
            e.target.style.transform = 'translateY(0) scale(1)';
        }
    }, true);
}

// 리플 효과 생성
function createRippleEffect(event) {
    const button = event.currentTarget;
    if (!button) return;
    
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// 모바일 메뉴 초기화
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.lg\\:hidden');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }
}

// 모바일 메뉴 토글
function toggleMobileMenu() {
    // 모바일 메뉴 구현
    console.log('Mobile menu toggle');
}

// 스무스 스크롤
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 네비게이션 링크 클릭 이벤트
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        smoothScrollTo(targetId);
    }
});

// 스크롤 진행률 표시
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // 프로그레스 바 업데이트 (필요시)
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// 스크롤 이벤트 리스너
window.addEventListener('scroll', function() {
    updateScrollProgress();
    
    // 헤더 스타일 변경
    const header = document.querySelector('.bootpay-nav');
    if (header) {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', function() {
    // 반응형 처리
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
        // 모바일 전용 처리
    } else {
        // 데스크톱 전용 처리
    }
});

// 로딩 완료 후 애니메이션 시작
window.addEventListener('load', function() {
    // 페이지 로드 완료 후 애니메이션 시작
    document.body.classList.add('loaded');
    
    // 초기 애니메이션 요소들 활성화
    setTimeout(() => {
        document.querySelectorAll('.animate-fade-in-up').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
});

// 유틸리티 함수들
const BootpayUtils = {
    // 디바운스 함수
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 스로틀 함수
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 로컬 스토리지 헬퍼
    storage: {
        get: function(key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (e) {
                return null;
            }
        },
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('Failed to save to localStorage:', e);
            }
        }
    }
};

// 전역 객체에 유틸리티 추가
window.BootpayUtils = BootpayUtils;
