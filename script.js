/* ==============================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Interactive features and functionality
   ============================================== */

// ==============================================
// DOCUMENT READY / INITIALIZATION
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully');
    
    // Initialize all features
    initializeHamburgerMenu();
    initializeProjectsFilter();
    initializeLightbox();
    initializeFormValidation();
    initializeSmoothScroll();
});

// ==============================================
// HAMBURGER MENU TOGGLE
// ==============================================

/**
 * Initialize hamburger menu functionality
 * Creates hamburger menu if it doesn't exist and adds click listener
 */
function initializeHamburgerMenu() {
    try {
        // Create hamburger menu if it doesn't exist
        const navContainer = document.querySelector('.nav-container');
        if (!document.querySelector('.hamburger') && navContainer) {
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger';
            hamburger.setAttribute('aria-label', 'Toggle navigation menu');
            hamburger.setAttribute('role', 'button');
            hamburger.setAttribute('tabindex', '0');
            hamburger.innerHTML = '<span></span><span></span><span></span>';
            navContainer.appendChild(hamburger);
        }

        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            // Click event for hamburger icon
            hamburger.addEventListener('click', function() {
                toggleMenu();
            });

            // Keyboard event for accessibility (Enter and Space)
            hamburger.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleMenu();
                }
            });

            // Close menu when a link is clicked
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });

            console.log('Hamburger menu initialized');
        }
    } catch (error) {
        console.error('Error initializing hamburger menu:', error);
    }
}

/**
 * Toggle navigation menu visibility
 */
function toggleMenu() {
    try {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Menu toggled - Active:', navMenu.classList.contains('active'));
        }
    } catch (error) {
        console.error('Error toggling menu:', error);
    }
}

// ==============================================
// PROJECTS FILTER FUNCTIONALITY
// ==============================================

/**
 * Initialize projects filter
 */
function initializeProjectsFilter() {
    try {
        const projectsSection = document.querySelector('.projects');
        
        if (projectsSection) {
            // Create filter buttons dynamically
            createFilterButtons();
            
            // Add event listeners to filter buttons
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(function(button) {
                button.addEventListener('click', function() {
                    const category = this.getAttribute('data-filter');
                    filterProjects(category);
                    
                    // Update active button
                    filterButtons.forEach(function(btn) {
                        btn.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });

            console.log('Projects filter initialized');
        }
    } catch (error) {
        console.error('Error initializing projects filter:', error);
    }
}

/**
 * Create filter buttons for projects
 */
function createFilterButtons() {
    try {
        const projectsSection = document.querySelector('.projects');
        const heading = projectsSection.querySelector('h2');
        
        // Check if filter buttons already exist
        if (!document.querySelector('.filter-buttons')) {
            const filterContainer = document.createElement('div');
            filterContainer.className = 'filter-buttons';
            
            const categories = ['all', 'React', 'Vue.js', 'JavaScript'];
            
            categories.forEach(function(category) {
                const button = document.createElement('button');
                button.className = 'filter-btn ' + (category === 'all' ? 'active' : '');
                button.setAttribute('data-filter', category);
                button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                filterContainer.appendChild(button);
            });
            
            heading.insertAdjacentElement('afterend', filterContainer);
        }
    } catch (error) {
        console.error('Error creating filter buttons:', error);
    }
}

/**
 * Filter projects by category
 * @param {string} category - The category to filter by
 */
function filterProjects(category) {
    try {
        const projectCards = document.querySelectorAll('.project-card');
        let visibleCount = 0;

        projectCards.forEach(function(card) {
            const tags = card.querySelectorAll('.tag');
            const cardCategories = Array.from(tags).map(function(tag) {
                return tag.textContent.trim();
            });

            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = 'block';
                card.style.animation = 'slideInUp 0.6s ease-out';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        console.log('Filtered projects for category: ' + category + ', visible: ' + visibleCount);
    } catch (error) {
        console.error('Error filtering projects:', error);
    }
}

// ==============================================
// LIGHTBOX FUNCTIONALITY
// ==============================================

/**
 * Initialize lightbox for project images
 */
function initializeLightbox() {
    try {
        const projectImages = document.querySelectorAll('.project-image');
        
        projectImages.forEach(function(image) {
            image.style.cursor = 'pointer';
            image.addEventListener('click', function(event) {
                event.preventDefault();
                openLightbox(this.src, this.alt);
            });
        });

        console.log('Lightbox initialized for ' + projectImages.length + ' images');
    } catch (error) {
        console.error('Error initializing lightbox:', error);
    }
}

/**
 * Open lightbox modal with image
 * @param {string} imageSrc - Source of the image
 * @param {string} imageAlt - Alt text for accessibility
 */
function openLightbox(imageSrc, imageAlt) {
    try {
        // Check if lightbox already exists
        let lightboxModal = document.getElementById('lightbox-modal');
        
        if (!lightboxModal) {
            // Create lightbox modal
            lightboxModal = document.createElement('div');
            lightboxModal.id = 'lightbox-modal';
            lightboxModal.className = 'lightbox-modal';
            lightboxModal.setAttribute('role', 'dialog');
            lightboxModal.setAttribute('aria-modal', 'true');
            lightboxModal.setAttribute('aria-label', 'Image lightbox');
            
            lightboxModal.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                    <img id="lightbox-image" src="" alt="" class="lightbox-image">
                    <p id="lightbox-caption" class="lightbox-caption"></p>
                </div>
            `;
            
            document.body.appendChild(lightboxModal);
            
            // Close button event
            const closeBtn = lightboxModal.querySelector('.lightbox-close');
            closeBtn.addEventListener('click', closeLightbox);
            
            // Close on background click
            lightboxModal.addEventListener('click', function(event) {
                if (event.target === this) {
                    closeLightbox();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    closeLightbox();
                }
            });
        }
        
        // Update lightbox content
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;
        lightboxCaption.textContent = imageAlt;
        
        // Display lightbox
        lightboxModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        console.log('Lightbox opened for image: ' + imageAlt);
    } catch (error) {
        console.error('Error opening lightbox:', error);
    }
}

/**
 * Close lightbox modal
 */
function closeLightbox() {
    try {
        const lightboxModal = document.getElementById('lightbox-modal');
        if (lightboxModal) {
            lightboxModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
            console.log('Lightbox closed');
        }
    } catch (error) {
        console.error('Error closing lightbox:', error);
    }
}

// ==============================================
// FORM VALIDATION
// ==============================================

/**
 * Initialize form validation
 */
function initializeFormValidation() {
    try {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            // Real-time validation on input
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(function(input) {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    validateFieldRealTime(this);
                });
            });
            
            // Form submission
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                submitContactForm(this);
            });

            console.log('Form validation initialized');
        }
    } catch (error) {
        console.error('Error initializing form validation:', error);
    }
}

/**
 * Validate a single field
 * @param {HTMLElement} field - The form field to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateField(field) {
    try {
        const value = field.value.trim();
        const name = field.name;
        let isValid = true;
        let errorMessage = '';

        // Name validation
        if (name === 'name') {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Name should only contain letters and spaces';
            }
        }

        // Email validation
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Subject validation
        if (name === 'subject') {
            if (value.length < 3) {
                isValid = false;
                errorMessage = 'Subject must be at least 3 characters long';
            }
        }

        // Message validation
        if (name === 'message') {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
        }

        // Update field styling and error message
        updateFieldStatus(field, isValid, errorMessage);
        return isValid;
    } catch (error) {
        console.error('Error validating field:', error);
        return false;
    }
}

/**
 * Real-time validation feedback as user types
 * @param {HTMLElement} field - The form field being typed
 */
function validateFieldRealTime(field) {
    try {
        const value = field.value.trim();
        const name = field.name;
        let hasMinimumLength = value.length > 0;

        // Name validation
        if (name === 'name' && value.length > 0) {
            hasMinimumLength = value.length >= 2;
        }

        // Email validation
        if (name === 'email' && value.length > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            hasMinimumLength = emailRegex.test(value);
        }

        // Subject validation
        if (name === 'subject' && value.length > 0) {
            hasMinimumLength = value.length >= 3;
        }

        // Message validation
        if (name === 'message' && value.length > 0) {
            hasMinimumLength = value.length >= 10;
        }

        // Remove error message on correct input
        if (hasMinimumLength) {
            removeErrorMessage(field);
        }
    } catch (error) {
        console.error('Error in real-time validation:', error);
    }
}

/**
 * Update field styling based on validation status
 * @param {HTMLElement} field - The form field
 * @param {boolean} isValid - Is the field valid
 * @param {string} errorMessage - Error message to display
 */
function updateFieldStatus(field, isValid, errorMessage) {
    try {
        const formGroup = field.closest('.form-group');
        
        if (!isValid) {
            field.style.borderColor = '#e74c3c';
            
            // Remove existing error message
            removeErrorMessage(field);
            
            // Add error message
            const errorDiv = document.createElement('span');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#e74c3c';
            errorDiv.style.fontSize = '0.85rem';
            errorDiv.style.marginTop = '0.3rem';
            errorDiv.style.display = 'block';
            errorDiv.textContent = errorMessage;
            formGroup.appendChild(errorDiv);
            
            console.log('Field validation failed: ' + field.name + ' - ' + errorMessage);
        } else {
            field.style.borderColor = '#27ae60';
            removeErrorMessage(field);
            console.log('Field validation passed: ' + field.name);
        }
    } catch (error) {
        console.error('Error updating field status:', error);
    }
}

/**
 * Remove error message from field
 * @param {HTMLElement} field - The form field
 */
function removeErrorMessage(field) {
    try {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (errorMessage) {
            errorMessage.remove();
        }
        
        field.style.borderColor = '#bdc3c7';
    } catch (error) {
        console.error('Error removing error message:', error);
    }
}

/**
 * Submit contact form
 * @param {HTMLElement} form - The contact form
 */
function submitContactForm(form) {
    try {
        const inputs = form.querySelectorAll('input, textarea');
        let allValid = true;

        // Validate all fields
        inputs.forEach(function(input) {
            if (!validateField(input)) {
                allValid = false;
            }
        });

        if (allValid) {
            // Get form data
            const formData = new FormData(form);
            console.log('Form submission data:', {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            });

            // Show success message
            showSuccessMessage(form);
            
            // Reset form
            setTimeout(function() {
                form.reset();
                resetFormStyles(form);
            }, 1500);

            console.log('Form submitted successfully');
        } else {
            console.log('Form submission failed - validation errors present');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

/**
 * Show success message after form submission
 * @param {HTMLElement} form - The form element
 */
function showSuccessMessage(form) {
    try {
        let successMsg = form.querySelector('.success-message');
        
        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.style.backgroundColor = '#27ae60';
            successMsg.style.color = 'white';
            successMsg.style.padding = '1rem';
            successMsg.style.borderRadius = '5px';
            successMsg.style.marginBottom = '1rem';
            successMsg.style.textAlign = 'center';
            successMsg.style.fontWeight = '600';
            form.insertBefore(successMsg, form.firstChild);
        }
        
        successMsg.textContent = '✓ Thank you! Your message has been sent successfully.';
        successMsg.style.display = 'block';
        
        // Hide message after 3 seconds
        setTimeout(function() {
            successMsg.style.display = 'none';
        }, 3000);

        console.log('Success message displayed');
    } catch (error) {
        console.error('Error showing success message:', error);
    }
}

/**
 * Reset form field styles
 * @param {HTMLElement} form - The form element
 */
function resetFormStyles(form) {
    try {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(function(input) {
            input.style.borderColor = '#bdc3c7';
            removeErrorMessage(input);
        });
    } catch (error) {
        console.error('Error resetting form styles:', error);
    }
}

// ==============================================
// SMOOTH SCROLL ENHANCEMENT
// ==============================================

/**
 * Initialize smooth scroll for navigation links
 */
function initializeSmoothScroll() {
    try {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const href = this.getAttribute('href');
                
                // Skip if it's just '#'
                if (href === '#') {
                    return;
                }

                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    event.preventDefault();
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    console.log('Scrolled to section: ' + href);
                }
            });
        });

        console.log('Smooth scroll initialized for ' + navLinks.length + ' links');
    } catch (error) {
        console.error('Error initializing smooth scroll:', error);
    }
}

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

/**
 * Log performance and debugging information
 */
function logPerformanceInfo() {
    try {
        const performanceData = window.performance.timing;
        const pageLoadTime = performanceData.loadEventEnd - performanceData.navigationStart;
        
        console.log('=== Performance Metrics ===');
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
        console.log('DOM Content Loaded: ' + (performanceData.domContentLoadedEventEnd - performanceData.navigationStart) + 'ms');
        console.log('=========================');
    } catch (error) {
        console.error('Error logging performance info:', error);
    }
}

/**
 * Add scroll-to-top button functionality
 */
function initializeScrollToTop() {
    try {
        // Create scroll-to-top button
        let scrollTopBtn = document.getElementById('scroll-top-btn');
        
        if (!scrollTopBtn) {
            scrollTopBtn = document.createElement('button');
            scrollTopBtn.id = 'scroll-top-btn';
            scrollTopBtn.innerHTML = '&#8679;';
            scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
            scrollTopBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #2c3e50;
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 20px;
                cursor: pointer;
                display: none;
                z-index: 999;
                transition: all 0.3s ease;
            `;
            document.body.appendChild(scrollTopBtn);
        }

        // Show/hide button on scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        // Scroll to top on click
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        console.log('Scroll-to-top button initialized');
    } catch (error) {
        console.error('Error initializing scroll-to-top button:', error);
    }
}

// Initialize scroll-to-top after page load
window.addEventListener('load', function() {
    initializeScrollToTop();
    logPerformanceInfo();
});

// ==============================================
// ERROR TRACKING
// ==============================================

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

console.log('Portfolio JavaScript file loaded and ready');
