// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initDarkMode();
    
    // Dynamic background animation
    initDynamicBackground();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Animate elements on scroll
    initScrollAnimation();
    
    // Initialize blur section interactions
    initBlurSections();

	// Add this function call to initialize the contact form submission
	initContactForm();

	document.addEventListener('DOMContentLoaded', function() {
    // Other initializations...
    
    // Add this function call to update the footer year dynamically
    updateFooterYear();
});

// Add this function definition at the end of the file
function updateFooterYear() {
    const footerYear = document.querySelector('.glass-footer p');
    if (footerYear) {
        footerYear.textContent = `© ${new Date().getFullYear()} ABOUAHI. All rights reserved.`;
    }
}
});

// Dark Mode Implementation
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved user preference
    const darkMode = localStorage.getItem('darkMode');
    
    // Apply saved preference on load
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
        adjustCanvasColorsForDarkMode(true);
    }
    
    // Toggle dark/light mode when button is clicked
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Dark mode
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            adjustCanvasColorsForDarkMode(true);
        } else {
            // Light mode
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            adjustCanvasColorsForDarkMode(false);
        }
    });
}

// Adjust canvas colors for dark mode
function adjustCanvasColorsForDarkMode(isDarkMode) {
    // This function will be called by initDynamicBackground()
    window.isDarkMode = isDarkMode; 
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
			
			// Adjust particle color based on dark mode
			if (window.isDarkMode) {
				this.color = `hsl(${Math.random() * 60 + 210}, 70%, 40%)`; // Darker particles
			} else {
				this.color = `hsl(${Math.random() * 60 + 210}, 70%, 60%)`; // Original particles
			}
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
    // Background gradient
function drawBackground() {
    const isDark = window.isDarkMode;
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
    if (isDark) {
        // Dark mode gradient
        gradient.addColorStop(0, '#121619');
        gradient.addColorStop(1, '#1a1e24');
    } else {
        // Light mode gradient
        gradient.addColorStop(0, '#f0f4ff');
        gradient.addColorStop(1, '#e6f0ff');
    }
    
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
					// Adjust line color based on dark mode
					const lineColor = window.isDarkMode ? 
						`rgba(60, 100, 200, ${opacity * 0.2})` : 
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

		// Inside initBlurSections function
blurSections.forEach(section => {
    const overlay = section.querySelector('.overlay-text');
    const content = section.querySelector('.about-content, .projects-grid');
    
    // Hover interactions for desktop users
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
        if (window.innerWidth <= 768) { // Only apply for mobile users
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
        }
    });
});
        
        // Add click interaction for mobile users
        // section.addEventListener('click', () => {
        //     section.classList.toggle('active');
        //     if (section.classList.contains('active')) {
        //         overlay.style.opacity = '0.5';
        //         if (content) {
        //             content.style.filter = 'blur(2px)';
        //         }
        //     } else {
        //         overlay.style.opacity = '0.9';
        //         if (content) {
        //             content.style.filter = 'blur(5px)';
        //         }
        //     }
        // });
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

function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Add form submission logic here
            const formData = new FormData(contactForm);
            // Example: Send formData to a server using fetch
            fetch('https://formspree.io/f/meoaojle', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Handle success
                alert('Message sent successfully!');
            })
            .catch(error => {
                // Handle error
                alert('An error occurred. Please try again.');
            });
        });
    }
}
