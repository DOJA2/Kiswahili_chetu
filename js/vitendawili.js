/**
 * JavaScript for the Vitendawili page functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Toggle menu for mobile view
    const menuIcon = document.querySelector('.menu-icon');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            toggleMenu();
        });
    }
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show button when user scrolls down
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Toggle menu for mobile view
function toggleMenu() {
    const navRight = document.querySelector('.nav-right ul');
    navRight.classList.toggle('show');
}
