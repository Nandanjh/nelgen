document.addEventListener('DOMContentLoaded', function() {
    // Category filter functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const instrumentCards = document.querySelectorAll('.instrument-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter instrument cards
            instrumentCards.forEach(card => {
                if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                    card.classList.remove('hidden');
                    // Reset animation for visible cards
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    // Trigger reflow
                    void card.offsetWidth;
                    
                    // Apply animation with slight delay based on index
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // Instrument card hover effects
    instrumentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Application card hover effects
    const applicationCards = document.querySelectorAll('.application-card');
    applicationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Demo option hover effects
    const demoOptions = document.querySelectorAll('.demo-option');
    demoOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Check if the link also has a data-category attribute
            const category = this.getAttribute('data-category');
            if (category) {
                // Find and click the corresponding category button
                const categoryBtn = document.querySelector(`.category-btn[data-category="${category}"]`);
                if (categoryBtn) {
                    categoryBtn.click();
                }
            }
            
            // Scroll to the target element
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 100); // Small delay for better visual effect
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    revealElements.forEach((feature) => {
        revealObserver.observe(feature);
    });
    
    // Demo benefits animation
    const demoBenefits = document.querySelectorAll('.demo-benefits li');
    
    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150); // Staggered delay
                benefitsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    demoBenefits.forEach((benefit, index) => {
        benefit.style.opacity = '0';
        benefit.style.transform = 'translateX(-20px)';
        benefit.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        benefitsObserver.observe(benefit);
    });
    
    // Financing features animation
    const financingFeatures = document.querySelectorAll('.financing-features li');
    
    const financingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100); // Staggered delay
                financingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    financingFeatures.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-15px)';
        feature.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        financingObserver.observe(feature);
    });
});