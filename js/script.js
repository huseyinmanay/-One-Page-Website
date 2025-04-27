document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
    }, 1500);
    
    // Initialize functions
    initHeader();
    initMobileMenu();
    initSkills();
    initPortfolioFilter();
    initTestimonials();
    initBackToTop();
    initLightbox();
    initDarkMode();
});

// Header Scroll Effect
function initHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu ul li a');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        if (closeMenu) {
            closeMenu.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Skill Bars Animation
function initSkills() {
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillsSection && skillBars.length) {
        const animateSkills = function() {
            const sectionPos = skillsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.2;
            
            if (sectionPos < screenPos) {
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress') + '%';
                    bar.style.width = progress;
                });
                window.removeEventListener('scroll', animateSkills);
            }
        };
        
        window.addEventListener('scroll', animateSkills);
        // Trigger once on page load
        animateSkills();
    }
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter items
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Testimonials Slider
function initTestimonials() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (testimonialItems.length) {
        // Create dots
        testimonialItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('testimonial-dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.setAttribute('data-index', index);
            dotsContainer.appendChild(dot);
        });
        
        // Set first testimonial as active
        testimonialItems[0].classList.add('active');
        
        // Dots click event
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
            });
        });
        
        // Auto slide
        let currentIndex = 0;
        const intervalTime = 5000;
        
        function showTestimonial(index) {
            testimonialItems.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonialItems[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentIndex = index;
        }
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        }, intervalTime);
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Lightbox
function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const portfolioZoomBtns = document.querySelectorAll('.portfolio-zoom');
    
    if (lightbox && portfolioZoomBtns.length) {
        portfolioZoomBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const imgSrc = this.getAttribute('href');
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', function() {
                lightbox.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
}

// Dark Mode Toggle
function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or respect OS theme setting
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                this.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                this.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        if (!name.value.trim()) {
            isValid = false;
            showError(name, 'Lütfen adınızı giriniz');
        } else {
            removeError(name);
        }
        
        if (!email.value.trim()) {
            isValid = false;
            showError(email, 'Lütfen e-posta adresinizi giriniz');
        } else if (!isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Lütfen geçerli bir e-posta adresi giriniz');
        } else {
            removeError(email);
        }
        
        if (!subject.value.trim()) {
            isValid = false;
            showError(subject, 'Lütfen konu giriniz');
        } else {
            removeError(subject);
        }
        
        if (!message.value.trim()) {
            isValid = false;
            showError(message, 'Lütfen mesajınızı giriniz');
        } else {
            removeError(message);
        }
        
        if (isValid) {
            // Form is valid, you would typically send data to server here
            // For demo purposes, we'll just show a success message
            contactForm.reset();
            showFormSuccess();
        }
    });
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    } else {
        errorElement.textContent = message;
    }
    
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showFormSuccess() {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.';
    
    // Add message after form
    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
} 