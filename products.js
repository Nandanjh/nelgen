document.addEventListener('DOMContentLoaded', function() {
    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // Footer category links
    const footerCategoryLinks = document.querySelectorAll('.footer-links a[data-category]');
    footerCategoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-category');
            
            // Find and click the corresponding category button
            const categoryBtn = document.querySelector(`.category-btn[data-category="${category}"]`);
            if (categoryBtn) {
                categoryBtn.click();
                
                // Scroll to products section
                const productsSection = document.querySelector('.products-overview');
                if (productsSection) {
                    window.scrollTo({
                        top: productsSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('data-category')) return; // Skip category links
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Product card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Solution card hover effects
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Ordering steps animation
    const orderingSteps = document.querySelectorAll('.ordering-step');
    
    const stepsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200); // Staggered delay
                stepsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    orderingSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        stepsObserver.observe(step);
    });
    
    // Simple brands slider animation
    const brandLogos = document.querySelectorAll('.brand-logo');
    let currentIndex = 0;
    
    function animateBrands() {
        brandLogos.forEach(logo => {
            logo.style.opacity = '0.7';
            logo.style.filter = 'grayscale(100%)';
        });
        
        brandLogos[currentIndex].style.opacity = '1';
        brandLogos[currentIndex].style.filter = 'grayscale(0%)';
        
        currentIndex = (currentIndex + 1) % brandLogos.length;
    }
    
    // Start animation if brands exist
    if (brandLogos.length > 0) {
        animateBrands(); // Initial highlight
        setInterval(animateBrands, 2000); // Change every 2 seconds
    }
});