// === MODAL FUNCTIONALITY ===
function openPricingForm() {
    const modal = document.getElementById('pricing-modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closePricingForm() {
    const modal = document.getElementById('pricing-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Handle form submission
function handlePricingFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log('Form data:', data);

    // Show success message
    showNotification('¡Gracias por tu interés! Te contactaremos pronto con la cotización personalizada.', 'success');
    closePricingForm();

    // Reset form
    event.target.reset();
}

// Close modal when clicking outside
function handleModalClick(event) {
    const modal = document.getElementById('pricing-modal');
    if (event.target === modal) {
        closePricingForm();
    }
}

// === MOBILE NAVIGATION ===
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
            });
        });
    }
});

// === SMOOTH SCROLLING ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === FAQ ACCORDION ===
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                otherItem.querySelector('i').style.transform = 'rotate(0deg)';
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});

// === SCROLL ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    const elementsToAnimate = document.querySelectorAll('.hero__text, .section__header, .feature-item, .platform-card, .step-card, .testimonial-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// === STATISTICS COUNTER ANIMATION ===
function animateCounters() {
    const counters = document.querySelectorAll('.hero__stat-number, .stat-number');

    counters.forEach(counter => {
        const target = counter.innerText;
        const isPercentage = target.includes('%');
        const isRating = target.includes('/');
        const numericTarget = parseFloat(target.replace(/[^\d.]/g, ''));

        let current = 0;
        const increment = numericTarget / 50; // 50 frames for animation

        const updateCounter = () => {
            if (current < numericTarget) {
                current += increment;
                if (isPercentage) {
                    counter.innerText = Math.ceil(current) + '%';
                } else if (isRating) {
                    counter.innerText = current.toFixed(1) + '/5';
                } else {
                    counter.innerText = Math.ceil(current).toLocaleString() + (target.includes('+') ? '+' : '');
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target; // Set final value
            }
        };

        updateCounter();
    });
}

// === NAVBAR SCROLL EFFECT ===
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// === FORM HANDLING (if contact forms are added) ===
function handleFormSubmission(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerText = 'Enviado ✓';
                submitBtn.style.backgroundColor = 'var(--success-color)';

                // Reset after 3 seconds
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    form.reset();
                }, 3000);
            }, 2000);
        });
    }
}

// === INITIALIZE ANIMATIONS ON SCROLL ===
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateCounters, 500);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function () {
    const heroStats = document.querySelector('.hero__stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }
});

// === TESTIMONIALS CAROUSEL (if needed) ===
function initTestimonialsCarousel() {
    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (!testimonialGrid) return;

    let currentIndex = 0;
    const cards = testimonialGrid.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;

    function showTestimonials() {
        cards.forEach((card, index) => {
            card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
        });
    }

    // Auto-rotate testimonials on mobile
    if (window.innerWidth <= 768) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            showTestimonials();
        }, 5000);
    }
}

// === LOADING ANIMATION ===
window.addEventListener('load', function () {
    document.body.classList.add('loaded');

    // Initialize components after load
    initTestimonialsCarousel();
});

// === UTILITY FUNCTIONS ===
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification__close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// === RESIZE HANDLER ===
window.addEventListener('resize', function () {
    // Reinitialize components that depend on screen size
    initTestimonialsCarousel();
});

// === COMING SOON DIALOG ===
function openComingSoonDialog(category) {
    const messages = {
        'Hardware': '📱 La página detallada del Hardware estará disponible muy pronto.\n\n🔧 Mientras tanto, conoce más sobre nuestro equipo profesional que incluye:\n• Galaxy Tab A9+ optimizada\n• Lector QR de alta velocidad \n• Soporte ajustable premium\n• Batería externa de larga duración',
        'Credenciales PVC': '🎫 La página detallada de las Credenciales PVC estará disponible muy pronto.\n\n✨ Mientras tanto, conoce las características de nuestras credenciales:\n• Material PVC resistente y duradero\n• Diseño personalizado con colores institucionales\n• Código QR único por estudiante\n• Acabado profesional de alta calidad'
    };

    const message = messages[category] || `La página detallada de ${category} estará disponible muy pronto.`;

    showNotification(`${message}\n\n💬 Por ahora puedes solicitar más información usando el botón "Solicitar Demo" o contactándonos directamente.\n\n¡Gracias por tu interés! 🚀`, 'info');
}