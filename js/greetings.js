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
    
    if (backToTopButton) {
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
    }
    
    // Image Modal Functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close');
    const bodyPartImages = document.querySelectorAll('.body-part-image img');
    
    // Function to open the modal
    window.openModal = function(img) {
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        
        // Hide the scroll bar on the body
        document.body.style.overflow = 'hidden';
    };
    
    // Open modal when an image is clicked
    bodyPartImages.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this);
        });
    });
    
    // Close the modal when the close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            
            // Restore the scroll bar on the body
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close the modal when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            
            // Restore the scroll bar on the body
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            
            // Restore the scroll bar on the body
            document.body.style.overflow = 'auto';
        }
    });
    
    // Update copyright year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
