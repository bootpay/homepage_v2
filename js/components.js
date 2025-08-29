// 부트페이 컴포넌트 JavaScript

// 컴포넌트 로드 상태 관리
const ComponentLoader = {
    loadedComponents: new Set(),
    
    markAsLoaded: function(componentId) {
        this.loadedComponents.add(componentId);
    },
    
    isLoaded: function(componentId) {
        return this.loadedComponents.has(componentId);
    },
    
    getLoadedCount: function() {
        return this.loadedComponents.size;
    }
};

// 컴포넌트 애니메이션 관리
const ComponentAnimations = {
    // 스크롤 트리거 애니메이션
    initScrollTriggers: function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // 지연 애니메이션 처리
                    const delayElements = entry.target.querySelectorAll('[class*="animate-delay-"]');
                    delayElements.forEach(el => {
                        const delayClass = Array.from(el.classList).find(cls => cls.startsWith('animate-delay-'));
                        if (delayClass) {
                            const delay = delayClass.split('-')[2];
                            setTimeout(() => {
                                el.style.opacity = '1';
                                el.style.transform = 'translateY(0)';
                            }, delay * 100);
                        }
                    });
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.scroll-trigger').forEach(el => {
            observer.observe(el);
        });
    },
    
    // 페이드 인 애니메이션
    initFadeAnimations: function() {
        const fadeElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-fade-in-scale');
        
        fadeElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
};

// 인터랙티브 컴포넌트 관리
const InteractiveComponents = {
    // 카드 호버 효과
    initCardHoverEffects: function() {
        const cards = document.querySelectorAll('.bootpay-card, .bootpay-card-feature');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    },
    
    // 버튼 클릭 효과
    initButtonEffects: function() {
        const buttons = document.querySelectorAll('.bootpay-button, .bootpay-button-secondary, .bootpay-button-ghost');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // 리플 효과 생성
                this.createRippleEffect(e);
                
                // 클릭 애니메이션
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    },
    
    // 아이콘 박스 애니메이션
    initIconBoxAnimations: function() {
        const iconBoxes = document.querySelectorAll('.bootpay-icon-box');
        
        iconBoxes.forEach(box => {
            box.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            box.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
};

// 폼 컴포넌트 관리
const FormComponents = {
    // 입력 필드 포커스 효과
    initInputFocusEffects: function() {
        const inputs = document.querySelectorAll('.bootpay-input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    },
    
    // 체크박스 커스텀 스타일
    initCustomCheckboxes: function() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            const wrapper = document.createElement('div');
            wrapper.className = 'custom-checkbox';
            
            checkbox.parentNode.insertBefore(wrapper, checkbox);
            wrapper.appendChild(checkbox);
            
            // 체크박스 상태 변경 이벤트
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    wrapper.classList.add('checked');
                } else {
                    wrapper.classList.remove('checked');
                }
            });
        });
    }
};

// 네비게이션 컴포넌트 관리
const NavigationComponents = {
    // 스크롤 시 헤더 스타일 변경
    initScrollHeader: function() {
        const header = document.querySelector('.bootpay-nav');
        
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    },
    
    // 모바일 메뉴 토글
    initMobileMenu: function() {
        const mobileMenuButton = document.querySelector('.lg\\:hidden');
        const mobileMenu = document.createElement('div');
        
        if (mobileMenuButton) {
            mobileMenu.className = 'mobile-menu hidden lg:hidden';
            mobileMenu.innerHTML = `
                <div class="bg-white border-t border-gray-200 py-4">
                    <div class="container">
                        <div class="space-y-4">
                            <a href="#payment" class="block text-gray-700 hover:text-blue-600 py-2">결제</a>
                            <a href="#store" class="block text-gray-700 hover:text-blue-600 py-2">쇼핑몰</a>
                            <a href="#pricing" class="block text-gray-700 hover:text-blue-600 py-2">가격</a>
                            <a href="#developers" class="block text-gray-700 hover:text-blue-600 py-2">개발자</a>
                            <a href="#cases" class="block text-gray-700 hover:text-blue-600 py-2">고객사례</a>
                            <div class="border-t border-gray-200 pt-4 mt-4">
                                <a href="#login" class="block text-gray-700 hover:text-blue-600 py-2">로그인</a>
                                <button class="w-full bootpay-button mt-2">시작하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(mobileMenu);
            
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
            
            // 외부 클릭 시 메뉴 닫기
            document.addEventListener('click', function(e) {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    }
};

// 통계 컴포넌트 관리
const StatsComponents = {
    // 숫자 카운트 애니메이션
    initCountAnimations: function() {
        const statNumbers = document.querySelectorAll('.bootpay-stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    
                    if (finalValue.includes('₩')) {
                        const number = parseInt(finalValue.replace(/[₩,]/g, ''));
                        this.animateNumber(target, 0, number, 2000, '₩');
                    } else if (finalValue.includes('+')) {
                        const number = parseInt(finalValue.replace(/[+,]/g, ''));
                        this.animateNumber(target, 0, number, 2000, '+');
                    } else if (finalValue.includes('%')) {
                        const number = parseFloat(finalValue.replace('%', ''));
                        this.animateNumber(target, 0, number, 2000, '%');
                    } else {
                        const number = parseInt(finalValue.replace(/,/g, ''));
                        this.animateNumber(target, 0, number, 2000);
                    }
                    
                    observer.unobserve(target);
                }
            });
        });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    },
    
    // 숫자 애니메이션 함수
    animateNumber: function(element, start, end, duration, prefix = '') {
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
};

// 컴포넌트 초기화 함수
function initComponents() {
    ComponentAnimations.initScrollTriggers();
    ComponentAnimations.initFadeAnimations();
    
    InteractiveComponents.initCardHoverEffects();
    InteractiveComponents.initButtonEffects();
    InteractiveComponents.initIconBoxAnimations();
    
    FormComponents.initInputFocusEffects();
    FormComponents.initCustomCheckboxes();
    
    NavigationComponents.initScrollHeader();
    NavigationComponents.initMobileMenu();
    
    StatsComponents.initCountAnimations();
}

// DOM 로드 완료 후 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
} else {
    initComponents();
}

// 전역 객체에 컴포넌트 관리자 추가
window.BootpayComponents = {
    ComponentLoader,
    ComponentAnimations,
    InteractiveComponents,
    FormComponents,
    NavigationComponents,
    StatsComponents,
    initComponents
};
