document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for about hero section
    const aboutHero = document.querySelector('.about-hero');
    if (aboutHero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < aboutHero.offsetHeight) {
                aboutHero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
        });
    }
    
    // Mission and Vision cards hover effect
    const missionCard = document.querySelector('.mission-card');
    const visionCard = document.querySelector('.vision-card');
    
    if (missionCard) {
        missionCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        missionCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    if (visionCard) {
        visionCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        visionCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Quality cards staggered animation - FIXED
    const qualityCards = document.querySelectorAll('.quality-card');
    if (qualityCards.length > 0) {
        qualityCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        const qualityObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150); // Staggered delay
                    qualityObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        qualityCards.forEach(card => {
            qualityObserver.observe(card);
        });
    }
    
    // Team member cards hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const bio = this.querySelector('.member-bio');
            if (bio) {
                bio.style.maxHeight = bio.scrollHeight + 'px';
                bio.style.opacity = '1';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const bio = this.querySelector('.member-bio');
            if (bio) {
                bio.style.maxHeight = null;
                bio.style.opacity = '0.8';
            }
        });
    });
    
    // Removed the problematic code that was causing the disappearing effect
    
    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});