// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Dynamic background animation
    initDynamicBackground();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Animate elements on scroll
    initScrollAnimation();
    
    // Initialize blur section interactions
    initBlurSections();
});

// Dynamic Background with Particles/Gradient Effect
function initDynamicBackground() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 60 + 210}, 70%, 60%)`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.min(window.innerWidth * 0.1, 100);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Background gradient
    function drawBackground() {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#f0f4ff');
        gradient.addColorStop(1, '#e6f0ff');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Connect particles with lines
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = 1 - (distance / 100);
                    ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw gradient background
        drawBackground();
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        // Connect particles with lines
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.glass-nav')) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
    
    // Update active link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach((item) => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Blur sections interaction
function initBlurSections() {
    const blurSections = document.querySelectorAll('.blur-section');
    
    blurSections.forEach(section => {
        const overlay = section.querySelector('.overlay-text');
        const content = section.querySelector('.about-content, .projects-grid');
        
        // Add hover interactions for desktop users
        section.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            if (content) {
                content.style.filter = 'blur(3px)';
            }
        });
        
        section.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0.9';
            if (content) {
                content.style.filter = 'blur(5px)';
            }
        });
        
        // Add click interaction for mobile users
        section.addEventListener('click', () => {
            section.classList.toggle('active');
            if (section.classList.contains('active')) {
                overlay.style.opacity = '0.5';
                if (content) {
                    content.style.filter = 'blur(2px)';
                }
            } else {
                overlay.style.opacity = '0.9';
                if (content) {
                    content.style.filter = 'blur(5px)';
                }
            }
        });
    });
}

// Animate elements on scroll with Intersection Observer
function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(el => {
        observer.observe(el);
    });
    
    // Observe glass cards
    document.querySelectorAll('.glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add the visible class which will be used in CSS
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .glass-card.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            .section-title.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
}
