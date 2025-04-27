document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission (in a real application, this would be an AJAX request)
            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form for future use
                contactForm.reset();
            }, 1000);
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Form validation
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    formInputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        // Remove error on focus
        input.addEventListener('focus', function() {
            this.classList.remove('error');
            
            // Remove error message if it exists
            const errorMessage = this.parentElement.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
    
    // Form validation before submit
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = document.querySelector('.error');
                if (firstError) {
                    window.scrollTo({
                        top: firstError.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // Input validation function
    function validateInput(input) {
        // Skip non-required fields that are empty
        if (!input.hasAttribute('required') && input.value.trim() === '') {
            return true;
        }
        
        // Remove any existing error message
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        
        let isValid = true;
        let message = '';
        
        // Check if empty
        if (input.hasAttribute('required') && input.value.trim() === '') {
            isValid = false;
            message = 'This field is required';
        } 
        // Email validation
        else if (input.type === 'email' && input.value.trim() !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value.trim())) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }
        // Phone validation (optional)
        else if (input.type === 'tel' && input.value.trim() !== '') {
            const phonePattern = /^[0-9\+\-\(\)\s]{10,15}$/;
            if (!phonePattern.test(input.value.trim())) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        }
        
        // Add error class and message if invalid
        if (!isValid) {
            input.classList.add('error');
            
            // Create error message element
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            
            // Add error message after input
            input.parentElement.appendChild(errorElement);
        } else {
            input.classList.remove('error');
        }
        
        return isValid;
    }
    
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
    
    // Contact card hover effects
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Map info card hover effects
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Add CSS for form validation
    const style = document.createElement('style');
    style.textContent = `
        .contact-form input.error,
        .contact-form textarea.error,
        .contact-form select.error {
            border-color: #ff3860;
        }
        
        .error-message {
            color: #ff3860;
            font-size: 0.85rem;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);
});