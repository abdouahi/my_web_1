// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Dynamic background animation
    initDynamicBackground();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Animate elements on scroll
    initScrollAnimation();
    
    // Theme toggle functionality
    initThemeToggle();
});

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or default to user preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Save preference
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Update background if needed
        updateBackgroundForTheme();
    });
}

// Update background based on current theme
function updateBackgroundForTheme() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    // Redraw background with theme-appropriate colors
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (isDarkTheme) {
        gradient.addColorStop(0, '#212130');
        gradient.addColorStop(1, '#181825');
    } else {
        gradient.addColorStop(0, '#f0f4ff');
        gradient.addColorStop(1, '#e6f0ff');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

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
            
            // Set color based on current theme
            const isDarkTheme = document.body.classList.contains('dark-theme');
            this.color = isDarkTheme 
                ? `hsl(${Math.random() * 60 + 210}, 50%, 30%)` 
                : `hsl(${Math.random() * 60 + 210}, 70%, 60%)`;
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
    
    // Store particles globally for theme updates
    window.particles = particles;
    
    // Background gradient
    function drawBackground() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        
        if (isDarkTheme) {
            gradient.addColorStop(0, '#212130');
            gradient.addColorStop(1, '#181825');
        } else {
            gradient.addColorStop(0, '#f0f4ff');
            gradient.addColorStop(1, '#e6f0ff');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Connect particles with lines
    function connectParticles() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = 1 - (distance / 100);
                    const lineColor = isDarkTheme ? 
                        `rgba(70, 90, 150, ${opacity * 0.2})` : 
                        `rgba(100, 150, 255, ${opacity * 0.2})`;
                    
                    ctx.strokeStyle = lineColor;
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
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });
}

// Animate elements on scroll
function initScrollAnimation() {
    const fadeElems = document.querySelectorAll('.section-title, .glass-card, .project-card');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each element
    fadeElems.forEach(elem => {
        elem.style.opacity = '0';
        elem.style.transform = 'translateY(20px)';
        elem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(elem);
    });
    
    // Initialize skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('style').split(':')[1];
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        skillsObserver.observe(bar);
    });
}
