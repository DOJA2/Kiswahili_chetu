document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuButton = document.querySelector('.menu-icon');
    const navMenu = document.getElementById('nav-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function () {
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
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function () {
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
    window.openModal = function (img) {
        modal.style.display = 'block';
        modalImg.src = img.src;
        modalImg.alt = img.alt;

        // Hide the scroll bar on the body
        document.body.style.overflow = 'hidden';
    };

    // Open modal when an image is clicked
    bodyPartImages.forEach(img => {
        img.addEventListener('click', function () {
            openModal(this);
        });
    });

    // Close the modal when the close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            modal.style.display = 'none';

            // Restore the scroll bar on the body
            document.body.style.overflow = 'auto';
        });
    }

    // Close the modal when clicking outside the image
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';

            // Restore the scroll bar on the body
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (event) {
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

    // --- Search Functionality ---
    const searchInput = document.getElementById('searchInput');
    const searchCards = document.querySelectorAll('.section-card');
    const bodyPartSection = document.querySelector('section.section-card'); // The Body Parts section
    const bodyPartItems = document.querySelectorAll('.body-part-item');
    const sectionContainers = document.querySelectorAll('.section-container');

    // Create No Results message if it doesn't exist
    let noResultsMsg = document.querySelector('.no-results');
    if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results';
        noResultsMsg.innerHTML = '<i class="fas fa-search-minus"></i> Samahani, hatujapata maneno unayotafuta.';
        const main = document.querySelector('main');
        main.insertBefore(noResultsMsg, sectionContainers[0]);
    }

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase().trim();
            let totalFound = 0;

            // 1. Filter standard section cards
            searchCards.forEach(card => {
                const title = card.querySelector('h2')?.textContent.toLowerCase() || '';
                const items = card.querySelectorAll('p:not(.note)');
                let cardHasMatch = title.includes(searchTerm);

                // Don't process the Body Parts section here as it's complex
                if (card.querySelector('#partsOfBody')) return;

                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (searchTerm === '' || text.includes(searchTerm)) {
                        item.style.display = 'flex';
                        cardHasMatch = true;
                    } else {
                        item.style.display = 'none';
                    }
                });

                if (cardHasMatch) {
                    card.style.display = 'flex';
                    totalFound++;
                } else {
                    card.style.display = 'none';
                }
            });

            // 2. Filter Body Parts specifically (Grid and Gallery)
            const bodyPartsSection = document.getElementById('partsOfBody')?.closest('.section-card');
            if (bodyPartsSection) {
                let bodyMatch = false;

                // Check Grid Items
                bodyPartItems.forEach(item => {
                    const english = item.querySelector('.english').textContent.toLowerCase();
                    const swahili = item.querySelector('.swahili').textContent.toLowerCase();
                    if (searchTerm === '' || english.includes(searchTerm) || swahili.includes(searchTerm)) {
                        item.style.display = 'flex';
                        bodyMatch = true;
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Check Image Gallery Items
                const galleryItems = document.querySelectorAll('.body-part-image');
                galleryItems.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (searchTerm === '' || text.includes(searchTerm)) {
                        item.style.display = 'block';
                        bodyMatch = true;
                    } else {
                        item.style.display = 'none';
                    }
                });

                if (bodyMatch || searchTerm === '') {
                    bodyPartsSection.style.display = 'block';
                    if (searchTerm !== '') totalFound++;
                } else {
                    bodyPartsSection.style.display = 'none';
                }
            }

            // 3. Show/Hide section containers
            sectionContainers.forEach(container => {
                const visibleCards = Array.from(container.children).filter(child =>
                    child.classList.contains('section-card') && child.style.display !== 'none'
                );
                container.style.display = visibleCards.length > 0 ? 'grid' : 'none';
            });

            // 4. No Results message
            noResultsMsg.style.display = (totalFound === 0 && searchTerm !== '') ? 'block' : 'none';
        });

        // Trigger search on button click too
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                searchInput.focus();
            });
        }
    }
});
