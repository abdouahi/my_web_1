// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Dynamic background animation
    initDynamicBackground();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Animate elements on scroll
    initScrollAnimation();
    
    // Initialize theme toggle functionality
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
        updateBackgroundForTheme('dark');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Save preference
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Update background colors
        updateBackgroundForTheme(theme);
    });
}

// Update background colors based on theme
function updateBackgroundForTheme(theme) {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Update particle colors
    window.particles?.forEach(particle => {
        if (theme === 'dark') {
            particle.color = `hsl(${Math.random() * 60 + 210}, 50%, 30%)`;
        } else {
            particle.color = `hsl(${Math.random() * 60 + 210}, 70%, 60%)`;
        }
    });
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
            
            // Set color based on theme
            const isDarkTheme = document.body.classList.contains('dark-theme');
            this.color = isDarkTheme 
                ? `hsl(${Math.random() * 60 + 210}, 50%, 30
