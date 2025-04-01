document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuButton = document.querySelector('.menu-icon');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function() {
            // Toggle the menu
            navMenu.classList.toggle('show');
            
            // Update ARIA attributes for accessibility
            const isExpanded = navMenu.classList.contains('show');
            menuButton.setAttribute('aria-expanded', isExpanded);
            
            // Toggle active class for animation
            menuButton.classList.toggle('active');
        });
    }
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show back to top button when scrolling down
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Update copyright year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
