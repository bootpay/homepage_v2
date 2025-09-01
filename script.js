document.addEventListener('DOMContentLoaded', function() {
    // Get all accordion toggle links
    const accordionToggles = document.querySelectorAll('[data-toggle="collapse"]');
    
    accordionToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const parentAccordion = targetElement.getAttribute('data-parent');
            
            if (parentAccordion) {
                // Close other accordion items in the same group
                const parentElement = document.querySelector(parentAccordion);
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
            
            // Toggle current item
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
});