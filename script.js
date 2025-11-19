// script.js - JavaScript functionality for Nail Glam website

document.addEventListener('DOMContentLoaded', function() {
    
    // ======================
    // FORM VALIDATION
    // ======================
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulate form submission
                const submitButton = enquiryForm.querySelector('input[type="submit"]');
                const originalText = submitButton.value;
                
                submitButton.value = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    showFormMessage('Thank you! Your enquiry has been sent successfully.', 'success');
                    enquiryForm.reset();
                    submitButton.value = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }
        });
    }

    function validateForm() {
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (!name.value.trim()) {
            nameError.textContent = 'Please enter your full name';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Email validation
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            emailError.textContent = 'Please enter your email address';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Phone validation
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phone.value.trim()) {
            phoneError.textContent = 'Please enter your phone number';
            isValid = false;
        } else if (!phoneRegex.test(phone.value)) {
            phoneError.textContent = 'Please enter a valid phone number';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        // Message validation
        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (!message.value.trim()) {
            messageError.textContent = 'Please enter your enquiry message';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            messageError.textContent = 'Please provide more details in your enquiry';
            isValid = false;
        } else {
            messageError.textContent = '';
        }

        return isValid;
    }

    function showFormMessage(message, type) {
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }

    // ======================
    // TESTIMONIAL SLIDER
    // ======================
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            testimonials[index].classList.add('active');
            currentTestimonial = index;
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                let nextIndex = currentTestimonial + 1;
                if (nextIndex >= testimonials.length) nextIndex = 0;
                showTestimonial(nextIndex);
            });
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                let prevIndex = currentTestimonial - 1;
                if (prevIndex < 0) prevIndex = testimonials.length - 1;
                showTestimonial(prevIndex);
            });
        }
        
        // Auto-rotate testimonials
        setInterval(() => {
            if (nextButton) nextButton.click();
        }, 5000);
    }

    // ======================
    // CALL TO ACTION BUTTON
    // ======================
    const ctaButton = document.getElementById('ctaButton');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            window.location.href = 'enquiry.html';
        });
    }

    // ======================
    // SMOOTH SCROLLING
    // ======================
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ======================
    // BACK TO TOP BUTTON
    // ======================
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // ======================
    // IMAGE LIGHTBOX/GALLERY
    // ======================
    const galleryImages = document.querySelectorAll('.image-gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Simple alert for demonstration - could be enhanced with a proper lightbox
            alert('Image: ' + this.alt);
        });
    });

    // ======================
    // ENHANCE USER EXPERIENCE
    // ======================
    
    // Add loading state to images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Form field enhancements
    document.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    console.log('Nail Glam website JavaScript loaded successfully!');
});

// ======================
// ADDITIONAL UTILITY FUNCTIONS
// ======================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Local storage for user preferences
function saveUserPreference(key, value) {
    localStorage.setItem(`nailglam_${key}`, value);
}

function getUserPreference(key) {
    return localStorage.getItem(`nailglam_${key}`);
}