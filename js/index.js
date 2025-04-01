/**
 * JavaScript for the index page functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the menu icon for mobile view
    const menuIcon = document.querySelector('.menu-icon');
    
    if (menuIcon) {
        // Make sure the toggleMenu function is properly bound to the menu icon
        menuIcon.addEventListener('click', function() {
            toggleMenu();
        });
    }
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
