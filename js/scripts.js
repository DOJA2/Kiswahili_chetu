/**
 * Kiswahili Website JavaScript
 * Enhanced functionality and interactivity
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("Kiswahili website loaded successfully");
  
  // Set current year in footer
  setCurrentYear();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize image lazy loading for older browsers
  lazyLoadImages();
  
  // Add smooth scrolling to all links
  initSmoothScrolling();
});

/**
 * Sets the current year in the footer copyright text
 */
function setCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Initializes mobile menu functionality with better accessibility
 */
function initMobileMenu() {
  const menuButton = document.querySelector('.menu-icon');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuButton && navMenu) {
    menuButton.addEventListener('click', function() {
      // Toggle menu visibility
      navMenu.classList.toggle('show');
      
      // Toggle button active state for styling
      this.classList.toggle('active');
      
      // Update aria-expanded attribute for accessibility
      const isExpanded = navMenu.classList.contains('show');
      this.setAttribute('aria-expanded', isExpanded);
      
      // Change button text based on state for screen readers
      this.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.nav-right') && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        menuButton.classList.remove('active');
        menuButton.setAttribute('aria-expanded', false);
        menuButton.setAttribute('aria-label', 'Open menu');
      }
    });
  }
}

/**
 * Implements lazy loading for images in older browsers that don't support native lazy loading
 */
function lazyLoadImages() {
  // Check if native lazy loading is supported
  if ('loading' in HTMLImageElement.prototype) {
    console.log('Browser supports native lazy loading');
    return; // Use native lazy loading
  }
  
  // Fallback for browsers that don't support lazy loading
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      // Store the image source in data-src if not already
      if (!img.dataset.src && img.src) {
        img.dataset.src = img.src;
      }
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    // Simply load all images immediately
    lazyImages.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }
}

/**
 * Adds smooth scrolling to all internal links
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Scroll smoothly to the target element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without page reload
        history.pushState(null, null, targetId);
      }
    });
  });
}

/**
 * Toggle menu visibility for mobile view
 * Kept for backward compatibility with existing HTML
 */
function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = document.querySelector('.menu-icon');
  
  if (navMenu) {
    navMenu.classList.toggle('show');
    
    if (menuIcon) {
      menuIcon.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('show');
      menuIcon.setAttribute('aria-expanded', isExpanded);
      menuIcon.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
    }
  }
}
