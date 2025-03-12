document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('checkbox');
    const themeToggleWrapper = document.querySelector('.theme-switch-wrapper');
    
    // Function to set theme
    function setTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);
        
        // Update checkbox state
        themeToggle.checked = themeName === 'dark';
    }
    
    // Function to toggle between light and dark themes
    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }
    
    // Event listener for theme toggle
    themeToggle.addEventListener('change', function() {
        toggleTheme();
    });
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Use saved theme preference
        setTheme(savedTheme);
    } else {
        // Check if user prefers dark mode
        const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersColorScheme.matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
        
        // Listen for changes to the OS theme
        prefersColorScheme.addEventListener('change', function(e) {
            setTheme(e.matches ? 'dark' : 'light');
        });
    }
    
    // Add pulse animation to theme toggle on page load
    setTimeout(() => {
        themeToggleWrapper.classList.add('pulse');
        setTimeout(() => {
            themeToggleWrapper.classList.remove('pulse');
        }, 1000);
    }, 1500);
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
