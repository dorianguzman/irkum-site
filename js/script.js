/* =====================================================
   IRIKUM - Artisanal Jewelry
   Website Interactions & Animations
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollAnimations();
    initCursorGlow();
    initSmoothScroll();
    initContactForm();
    initParallaxEffects();
});

/* =====================================================
   NAVIGATION
   ===================================================== */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for nav
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
}

/* =====================================================
   SCROLL ANIMATIONS
   ===================================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* =====================================================
   CURSOR GLOW EFFECT
   ===================================================== */
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (!cursorGlow || window.innerWidth < 768) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor following
    function animateCursor() {
        const ease = 0.15;
        
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;
        
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

/* =====================================================
   SMOOTH SCROLL
   ===================================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =====================================================
   CONTACT FORM
   ===================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzYHQ18c-2mrjzUI-k9n-5VjdVPb8ImvG2Lal8FRQlZ1_XVkjDIk7BqvfZe4UcbRtzE/exec';

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // Success state (no-cors doesn't return response, assume success)
            submitButton.textContent = 'Message Sent ✓';
            submitButton.style.backgroundColor = 'var(--color-gold)';

            // Reset form
            form.reset();

            // Reset button after delay
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);

        } catch (error) {
            // Error state
            submitButton.textContent = 'Error - Try Again';
            submitButton.style.backgroundColor = '#c44';

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });
    
    // Form field animations
    const formGroups = form.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                label.style.color = 'var(--color-gold)';
            });
            
            input.addEventListener('blur', () => {
                label.style.color = '';
            });
        }
    });
}

/* =====================================================
   PARALLAX EFFECTS
   ===================================================== */
function initParallaxEffects() {
    const heroContent = document.querySelector('.hero-content');
    const heroShimmer = document.querySelector('.hero-shimmer');
    const storyAccent = document.querySelector('.story-accent');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        // Hero content subtle parallax
        if (heroContent && scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
        }
        
        // Hero shimmer movement
        if (heroShimmer && scrollY < window.innerHeight) {
            heroShimmer.style.transform = `translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0005})`;
        }
        
        // Story accent movement
        if (storyAccent) {
            const storySection = document.querySelector('.story');
            const storyTop = storySection.offsetTop;
            const storyScroll = scrollY - storyTop + window.innerHeight;
            
            if (storyScroll > 0 && storyScroll < storySection.offsetHeight + window.innerHeight) {
                storyAccent.style.transform = `translateY(${storyScroll * 0.1}px)`;
            }
        }
    });
}

/* =====================================================
   UTILITY: Debounce Function
   ===================================================== */
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

/* =====================================================
   UTILITY: Throttle Function
   ===================================================== */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* =====================================================
   IMAGE LOADING EFFECT
   ===================================================== */
function initImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* =====================================================
   COLLECTION CARD HOVER EFFECT
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const collectionCards = document.querySelectorAll('.collection-card');
    
    collectionCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const overlay = this.querySelector('.collection-overlay');
            if (overlay) {
                overlay.style.background = 'rgba(26, 26, 26, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function(e) {
            const overlay = this.querySelector('.collection-overlay');
            if (overlay) {
                overlay.style.background = '';
            }
        });
    });
});

/* =====================================================
   REVEAL TEXT ANIMATION (Optional Enhancement)
   ===================================================== */
function initTextReveal() {
    const revealElements = document.querySelectorAll('.reveal-text');
    
    revealElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.03}s`;
            element.appendChild(span);
        });
    });
}

/* =====================================================
   PRELOADER (Optional)
   ===================================================== */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

/* =====================================================
   TESTIMONIAL CAROUSEL (For future use with multiple testimonials)
   ===================================================== */
class TestimonialCarousel {
    constructor(container) {
        this.container = container;
        this.testimonials = container.querySelectorAll('.testimonial-item');
        this.currentIndex = 0;
        this.autoplayInterval = null;
        
        if (this.testimonials.length > 1) {
            this.init();
        }
    }
    
    init() {
        this.showTestimonial(0);
        this.startAutoplay();
    }
    
    showTestimonial(index) {
        this.testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        this.currentIndex = index;
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.showTestimonial(nextIndex);
    }
    
    prev() {
        const prevIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.showTestimonial(prevIndex);
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.next(), 6000);
    }
    
    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }
}

/* =====================================================
   CONSOLE EASTER EGG
   ===================================================== */
console.log(`
%c✦ IRIKUM ✦
%cWhere Light Becomes Legacy

Artisanal jewelry designed in Amsterdam,
handcrafted with love in México.

www.irikum.com
`, 
'color: #C9A962; font-size: 24px; font-weight: bold; font-family: Georgia, serif;',
'color: #666; font-size: 12px; font-family: sans-serif;'
);
