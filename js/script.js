// Mobile Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Smooth Scrolling
const smoothScroll = () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();

            // Close mobile menu if open
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }

            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the target element smoothly
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Active Navigation Link Highlight
const activeNavHighlight = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// Form Validation
const formValidation = () => {
    const form = document.getElementById('contactForm');
    
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const inputs = [nameInput, emailInput, subjectInput, messageInput];
        
        // Show error message
        const showError = (input, message) => {
            const errorElement = input.nextElementSibling;
            errorElement.textContent = message;
            input.style.borderColor = '#ff3860';
        };
        
        // Show success
        const showSuccess = (input) => {
            const errorElement = input.nextElementSibling;
            errorElement.textContent = '';
            input.style.borderColor = '#09c372';
        };
        
        // Check if email is valid
        const isValidEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
        
        // Check required fields
        const checkRequired = (inputArr) => {
            let isValid = true;
            
            inputArr.forEach(input => {
                if (input.value.trim() === '') {
                    showError(input, `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`);
                    isValid = false;
                } else {
                    showSuccess(input);
                }
            });
            
            return isValid;
        };
        
        // Event listeners for real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (input.value.trim() === '') {
                    showError(input, `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`);
                } else if (input === emailInput && !isValidEmail(input.value)) {
                    showError(input, 'Email is not valid');
                } else {
                    showSuccess(input);
                }
            });
            
            input.addEventListener('input', function() {
                if (input.value.trim() !== '') {
                    if (input === emailInput && !isValidEmail(input.value)) {
                        showError(input, 'Email is not valid');
                    } else {
                        showSuccess(input);
                    }
                }
            });
        });
        
        // Form submit event
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isRequiredValid = checkRequired(inputs);
            const isEmailValid = isValidEmail(emailInput.value);
            
            if (isRequiredValid && isEmailValid) {
                // If all validations pass, show success message
                alert('Success! Your message has been sent.');
                form.reset();
                
                // Reset border colors
                inputs.forEach(input => {
                    input.style.borderColor = '';
                });
            } else if (!isEmailValid && emailInput.value.trim() !== '') {
                showError(emailInput, 'Email is not valid');
            }
        });
    }
};

// Header scroll effect
const headerScroll = () => {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
};

// Project card hover effect
const projectHover = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
};

// Scroll animation for elements
const scrollAnimation = () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
};

// Add a typing animation effect for the home section text
const typingAnimation = () => {
    const text = document.querySelector('.text-content h1');
    if (!text) return;
    
    const originalText = text.innerHTML;
    text.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            text.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
};

// Enhance the preloadImages function with more robust fallback handling
const preloadImages = () => {
    const projectImages = document.querySelectorAll('.project-img img');
    
    // Fallback images for each project type
    const fallbackImages = {
        'TradeX': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'MeetSphere': 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'NetConnect': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'StayEase': 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
        'AIChatHub': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        'default': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    };
    
    projectImages.forEach(img => {
        // Initially add loading state
        const parent = img.closest('.project-img');
        parent.classList.add('loading');
        
        // Get the project name from alt attribute or default
        const projectName = img.alt || 'default';
        
        // When image is loaded, remove loading state
        img.onload = function() {
            parent.classList.remove('loading');
            parent.classList.add('loaded');
        };
        
        // If image fails to load
        img.onerror = function() {
            console.log(`Image failed to load: ${img.src}`);
            parent.classList.remove('loading');
            // Try to use the specific fallback for this project
            if (fallbackImages[projectName]) {
                img.src = fallbackImages[projectName];
            } else {
                // Use the default fallback
                img.src = fallbackImages['default'];
            }
            
            // Add a second error handler in case the fallback also fails
            img.onerror = function() {
                console.log('Fallback image also failed to load');
                parent.classList.add('error');
                // Use a placeholder
                img.src = 'https://via.placeholder.com/800x500?text=Image+Not+Available';
            };
        };
    });
};

// Initialize all functions
const initApp = () => {
    navSlide();
    smoothScroll();
    activeNavHighlight();
    formValidation();
    headerScroll();
    projectHover();
    scrollAnimation();
    typingAnimation();
    preloadImages();
};

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp); 