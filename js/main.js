/**
 * Tanner Law Firm Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.practice-card, .testimonial-card, .team-card, .badge-item');
    animateElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Form validation (for contact page)
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');

            let isValid = true;

            // Simple validation
            if (name && name.value.trim() === '') {
                showError(name, 'Please enter your name');
                isValid = false;
            } else if (name) {
                clearError(name);
            }

            if (email && !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else if (email) {
                clearError(email);
            }

            if (message && message.value.trim() === '') {
                showError(message, 'Please enter your message');
                isValid = false;
            } else if (message) {
                clearError(message);
            }

            if (isValid) {
                // Show success message (in real implementation, this would submit to a server)
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorEl = formGroup.querySelector('.error-message');

        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            errorEl.style.color = '#e53e3e';
            errorEl.style.fontSize = '0.875rem';
            errorEl.style.marginTop = '0.25rem';
            errorEl.style.display = 'block';
            formGroup.appendChild(errorEl);
        }

        errorEl.textContent = message;
        input.style.borderColor = '#e53e3e';
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorEl = formGroup.querySelector('.error-message');

        if (errorEl) {
            errorEl.remove();
        }

        input.style.borderColor = '';
    }

    function showSuccessMessage() {
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            background-color: #48bb78;
            color: white;
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
            text-align: center;
        `;
        successDiv.textContent = 'Thank you for your message! We will get back to you soon.';

        contactForm.insertBefore(successDiv, contactForm.firstChild);

        // Remove success message after 5 seconds
        setTimeout(function() {
            successDiv.remove();
        }, 5000);
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
                } else {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }

            e.target.value = value;
        });
    }

    // Counter animation for badge numbers
    function animateCounters() {
        const counters = document.querySelectorAll('.badge-number');

        counters.forEach(function(counter) {
            const target = counter.textContent;
            const hasPlus = target.includes('+');
            const hasPercent = target.includes('%');
            const hasM = target.includes('M');
            const hasDollar = target.includes('$');

            let numericValue = parseInt(target.replace(/[^0-9]/g, ''));

            if (isNaN(numericValue)) return;

            let current = 0;
            const increment = numericValue / 50;
            const duration = 2000;
            const stepTime = duration / 50;

            counter.textContent = hasDollar ? '$0' : '0';

            const timer = setInterval(function() {
                current += increment;

                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }

                let display = Math.floor(current);

                if (hasDollar) display = '$' + display;
                if (hasM) display += 'M';
                if (hasPercent) display += '%';
                if (hasPlus) display += '+';

                counter.textContent = display;
            }, stepTime);
        });
    }

    // Trigger counter animation when badges section is visible
    const badgesSection = document.querySelector('.trust-badges');

    if (badgesSection) {
        const badgesObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    badgesObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        badgesObserver.observe(badgesSection);
    }

    // Active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
