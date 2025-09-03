// SPA Router Class
class SPARouter {
    constructor() {
        this.routes = new Map();
        this.cache = new Map();
        this.currentPage = 'home';
        this.contentContainer = null;
        
        this.setupRoutes();
        this.init();
    }
    
    setupRoutes() {
        this.routes.set('home', { 
            url: 'index.html', 
            title: 'Bootpay - 결제 솔루션',
            selector: '.app-landing-wrap'
        });
        this.routes.set('pg-integration', { 
            url: 'pg-integration.html', 
            title: 'PG 연동 - Bootpay',
            selector: 'body'
        });
        this.routes.set('store', { 
            url: 'store.html', 
            title: '스토어 - Bootpay',
            selector: 'body'
        });
        this.routes.set('price', { 
            url: 'price.html', 
            title: '가격 - Bootpay',
            selector: 'body'
        });
    }
    
    init() {
        this.contentContainer = document.getElementById('spa-content') || document.querySelector('.app-landing-wrap') || document.body;
        this.setupEventListeners();
        
        // Set initial state
        const currentPath = window.location.pathname;
        const route = currentPath === '/' ? 'home' : currentPath.substring(1).replace('.html', '');
        history.replaceState({ route }, document.title, currentPath);
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const route = e.state?.route || 'home';
            this.navigateTo(route, false);
        });
    }
    
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href$=".html"]');
            if (link && !link.classList.contains('external-link')) {
                e.preventDefault();
                const href = link.getAttribute('href');
                const route = href.replace('.html', '');
                this.navigateTo(route);
            }
        });
    }
    
    async navigateTo(route, addToHistory = true) {
        if (!this.routes.has(route)) return;
        
        const routeConfig = this.routes.get(route);
        
        if (addToHistory) {
            history.pushState({ route }, routeConfig.title, route === 'home' ? '/' : `/${route}`);
        }
        
        document.title = routeConfig.title;
        
        try {
            await this.loadAndRenderContent(route, routeConfig);
            this.updateActiveNavigation(route);
        } catch (error) {
            console.error('Navigation failed:', error);
        }
    }
    
    async loadAndRenderContent(route, config) {
        let content = this.cache.get(route);
        
        if (!content) {
            const response = await fetch(config.url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            if (route === 'home') {
                // For home page, get the entire landing wrap
                const homeContent = doc.querySelector('#landing_wrap');
                content = homeContent ? homeContent.innerHTML : doc.body.innerHTML;
            } else {
                // For subpages, get content after header
                const landingWrap = doc.querySelector('#landing_wrap');
                if (landingWrap) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = landingWrap.innerHTML;
                    
                    // Remove header and preloader
                    const header = tempDiv.querySelector('.main-header');
                    const preloader = tempDiv.querySelector('#preloader, .loadscreen');
                    
                    if (header) header.remove();
                    if (preloader) preloader.remove();
                    
                    content = tempDiv.innerHTML;
                } else {
                    content = doc.body.innerHTML;
                }
            }
            
            this.cache.set(route, content);
        }
        
        await this.transitionContent(content);
    }
    
    async transitionContent(newContent) {
        const landingWrap = document.querySelector('#landing_wrap');
        
        if (!landingWrap) {
            console.error('landing_wrap not found');
            return;
        }
        
        // Preserve header
        const header = landingWrap.querySelector('.main-header');
        
        landingWrap.style.opacity = '0';
        landingWrap.style.transition = 'opacity 0.3s ease-in-out';
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Replace content but keep header
        landingWrap.innerHTML = '';
        
        if (header) {
            landingWrap.appendChild(header);
        }
        
        // Add new content after header
        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = newContent;
        
        // Append all content except header elements
        Array.from(contentDiv.children).forEach(child => {
            if (!child.classList.contains('main-header')) {
                landingWrap.appendChild(child);
            }
        });
        
        landingWrap.style.opacity = '1';
        
        // Re-initialize any dynamic components
        this.reinitializeComponents();
    }
    
    updateActiveNavigation(route) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`a[href="${route}.html"], a[href="/"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    reinitializeComponents() {
        // Reinitialize accordion functionality
        initializeAccordion();
        
        // Reinitialize other components as needed
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
}

// Accordion functionality (extracted for reuse)
function initializeAccordion() {
    const accordionToggles = document.querySelectorAll('[data-toggle="collapse"]');
    
    accordionToggles.forEach(function(toggle) {
        if (!toggle) return;
        
        const href = toggle.getAttribute('href');
        if (!href) return;
        
        // Remove existing listeners by cloning
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (!targetElement) return;
            
            const parentAccordion = targetElement.getAttribute('data-parent');
            
            if (parentAccordion) {
                const parentElement = document.querySelector(parentAccordion);
                if (parentElement) {
                    const otherCollapses = parentElement.querySelectorAll('.collapse.show');
                    
                    otherCollapses.forEach(function(collapse) {
                        if (collapse.id !== targetId) {
                            collapse.classList.remove('show');
                            const otherToggle = parentElement.querySelector('[href="#' + collapse.id + '"]');
                            if (otherToggle) {
                                otherToggle.classList.add('collapsed');
                                otherToggle.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });
                }
            }
            
            if (targetElement.classList.contains('show')) {
                targetElement.classList.remove('show');
                this.classList.add('collapsed');
                this.setAttribute('aria-expanded', 'false');
            } else {
                targetElement.classList.add('show');
                this.classList.remove('collapsed');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// Initialize SPA when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAccordion();
    window.spaRouter = new SPARouter();
});