/**
 * JavaScript for the Nahau page functionality
 */

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            toggleMenu();
            // Toggle active class for animation
            this.classList.toggle('active');
            // Update aria attributes for accessibility
            const isExpanded = this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
            this.setAttribute('aria-expanded', isExpanded);
            this.setAttribute('aria-label', isExpanded === 'true' ? 'Close menu' : 'Open menu');
        });
    }
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        // When the user scrolls down 300px from the top of the document, show the button
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        };

        // When the user clicks on the button, scroll to the top of the document
        backToTopButton.addEventListener('click', function() {
            // Add smooth scrolling for better user experience
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
    const navRight = document.getElementById('.nav-right ul');
    if(navRight){
        navRight.classList.toggle('show');
    }
}
