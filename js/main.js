// 부트페이 메인 JavaScript


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
        if (e.target && e.target.classList && 
            (e.target.classList.contains('bootpay-button') || 
             e.target.classList.contains('bootpay-button-secondary') ||
             e.target.classList.contains('bootpay-button-ghost'))) {
            
            // 클릭 애니메이션
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 150);
        }
    });
    
    // 카드 호버 효과
    document.addEventListener('mouseenter', function(e) {
        if (e.target && e.target.classList && e.target.classList.contains('bootpay-card')) {
            e.target.style.transform = 'translateY(-8px) scale(1.02)';
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        if (e.target && e.target.classList && e.target.classList.contains('bootpay-card')) {
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

// 통계 숫자 애니메이션
function initStatsAnimations() {
    const statNumbers = document.querySelectorAll('.bootpay-stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue.includes('₩')) {
                    const number = parseInt(finalValue.replace(/[₩,]/g, ''));
                    animateNumber(target, 0, number, 2000, '₩');
                } else if (finalValue.includes('+')) {
                    const number = parseInt(finalValue.replace(/[+,]/g, ''));
                    animateNumber(target, 0, number, 2000, '+');
                } else if (finalValue.includes('%')) {
                    const number = parseFloat(finalValue.replace('%', ''));
                    animateNumber(target, 0, number, 2000, '%');
                } else {
                    const number = parseInt(finalValue.replace(/,/g, ''));
                    animateNumber(target, 0, number, 2000);
                }
                
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// 숫자 애니메이션 함수
function animateNumber(element, start, end, duration, prefix = '') {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (difference * progress));
        
        if (prefix === '₩') {
            element.textContent = `₩${current.toLocaleString()}`;
        } else if (prefix === '+') {
            element.textContent = `+${current.toLocaleString()}`;
        } else if (prefix === '%') {
            element.textContent = `${current.toFixed(1)}%`;
        } else {
            element.textContent = current.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// DOM 로드 완료 후 통계 애니메이션도 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 기존 초기화 함수들
    initScrollAnimations();
    initInteractiveElements();
    initMobileMenu();
    
    // 통계 애니메이션 초기화
    initStatsAnimations();
});
