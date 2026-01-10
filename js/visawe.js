/**
 * JavaScript for the Visawe page
 * Includes: Search, Alphabet reset, Mobile menu toggle, Back-to-top button, and Footer year
 */

document.addEventListener('DOMContentLoaded', function () {

    /* ==============================
       VISAWE SEARCH FUNCTIONALITY
       ============================== */

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // Create clear button
    const clearBtn = document.createElement('button');
    clearBtn.id = 'clearSearchBtn';
    clearBtn.className = 'clear-search-btn';
    clearBtn.innerHTML = '&times;'; // × symbol
    clearBtn.title = 'Futa utafutaji';

    // Add clear button to search container (before the search button)
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && searchBtn) {
        searchContainer.insertBefore(clearBtn, searchBtn);
    }

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('input', function () {
            clearBtn.style.display = this.value ? 'flex' : 'none';
        });
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') performSearch();
        });

        // Initially hide clear button if input is empty
        clearBtn.style.display = searchInput.value ? 'block' : 'none';
    }

    // Clear search functionality
    clearBtn.addEventListener('click', resetSearch);

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') return;

        // Show filter toggle if not already present
        showFilterToggle();

        const visaweCards = document.querySelectorAll('.visawe-card');
        let foundMatch = false;
        let firstMatch = null;
        let matchCount = 0;

        visaweCards.forEach(card => {
            const term = card.querySelector('.visawe-term').textContent.toLowerCase();
            const meaning = card.querySelector('.visawe-meaning').textContent.toLowerCase();

            if (term.includes(searchTerm) || meaning.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('search-match');
                matchCount++;

                // store the first match to scroll into view
                if (!foundMatch) {
                    firstMatch = card;
                    foundMatch = true;
                }

                // Highlight the match
                card.classList.add('highlight');
                setTimeout(() => {
                    card.classList.remove('highlight');
                }, 2000);
            } else {
                // Don't hide immediately - depends on filter toggle state
                card.classList.remove('search-match');

                // Check filter toggle state
                const filterToggle = document.getElementById('filterToggle');
                if (filterToggle && filterToggle.checked) {
                    card.style.display = 'none';
                }
            }
        });

        // Scroll smoothly to the first match
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Handle "no results" message
        updateNoResultsMessage(foundMatch, searchTerm, matchCount);
    }

    function updateNoResultsMessage(foundMatch, searchTerm, matchCount) {
        // Remove any existing message
        const existingMsg = document.getElementById('noResultsMsg');
        if (existingMsg) existingMsg.remove();

        if (!foundMatch) {
            const msg = document.createElement('div');
            msg.id = 'noResultsMsg';
            msg.className = 'no-results';

            // Create a more detailed message
            const msgContent = document.createElement('p');
            msgContent.textContent = `Hakuna visawe vilivyopatikana kwa "${searchTerm}"`;
            msg.appendChild(msgContent);

            // Add suggestions
            const suggestions = document.createElement('p');
            suggestions.className = 'search-suggestions';
            suggestions.innerHTML = 'Jaribu:<br>• Kutumia neno fupi zaidi<br>• Angalia tahajia yako<br>• Tafuta kwa maana badala ya neno';
            msg.appendChild(suggestions);

            // Add reset button
            const resetButton = document.createElement('button');
            resetButton.className = 'reset-search-btn';
            resetButton.textContent = 'Onyesha visawe vyote';
            resetButton.addEventListener('click', resetSearch);
            msg.appendChild(resetButton);

            // Insert after search container
            const searchContainer = document.querySelector('.search-container');
            if (searchContainer && searchContainer.parentNode) {
                searchContainer.parentNode.insertBefore(msg, searchContainer.nextSibling);
            }
        } else {
            // Show result count
            const msg = document.createElement('div');
            msg.id = 'noResultsMsg';
            msg.className = 'search-results-count';
            msg.textContent = `Imepatikana ${matchCount} ${matchCount === 1 ? 'kisawe' : 'visawe'} kwa "${searchTerm}"`;

            const searchContainer = document.querySelector('.search-container');
            if (searchContainer && searchContainer.parentNode) {
                searchContainer.parentNode.insertBefore(msg, searchContainer.nextSibling);
            }
        }
    }

    function showFilterToggle() {
        // Check if filter toggle already exists
        if (document.getElementById('filterToggleContainer')) return;

        // Create filter toggle container
        const filterContainer = document.createElement('div');
        filterContainer.id = 'filterToggleContainer';
        filterContainer.className = 'filter-toggle-container';

        // Create toggle switch
        const toggleLabel = document.createElement('label');
        toggleLabel.className = 'switch';

        const toggleInput = document.createElement('input');
        toggleInput.type = 'checkbox';
        toggleInput.id = 'filterToggle';
        toggleInput.checked = true; // Default to hiding non-matches

        const toggleSlider = document.createElement('span');
        toggleSlider.className = 'slider';

        toggleLabel.appendChild(toggleInput);
        toggleLabel.appendChild(toggleSlider);

        // Create label text
        const labelText = document.createElement('span');
        labelText.className = 'filter-label';
        labelText.textContent = 'Ficha visawe visivyolingana';

        // Assemble container
        filterContainer.appendChild(toggleLabel);
        filterContainer.appendChild(labelText);

        // Add event listener for toggle
        toggleInput.addEventListener('change', function () {
            const visaweCards = document.querySelectorAll('.visawe-card:not(.search-match)');
            visaweCards.forEach(card => {
                card.style.display = this.checked ? 'none' : 'block';
            });
        });

        // Insert after search container
        const searchContainer = document.querySelector('.search-container');
        const existingMsg = document.getElementById('noResultsMsg');

        if (searchContainer && searchContainer.parentNode) {
            if (existingMsg) {
                searchContainer.parentNode.insertBefore(filterContainer, existingMsg);
            } else {
                searchContainer.parentNode.insertBefore(filterContainer, searchContainer.nextSibling);
            }
        }
    }

    function resetSearch() {
        // Clear search input
        if (searchInput) searchInput.value = '';

        // Show all cards
        const visaweCards = document.querySelectorAll('.visawe-card');
        visaweCards.forEach(card => {
            card.style.display = 'block';
            card.classList.remove('search-match');
        });

        // Remove no results message
        const noResultsMsg = document.getElementById('noResultsMsg');
        if (noResultsMsg) noResultsMsg.remove();

        // Remove filter toggle
        const filterToggle = document.getElementById('filterToggleContainer');
        if (filterToggle) filterToggle.remove();

        // Hide clear button
        const clearBtn = document.getElementById('clearSearchBtn');
        if (clearBtn) clearBtn.style.display = 'none';
    }

    // Reset search when clicking on alphabet navigation
    const alphabetLinks = document.querySelectorAll('.navlist a');
    alphabetLinks.forEach(link => {
        link.addEventListener('click', resetSearch);
    });


    /* ==============================
       NAVIGATION & UI FUNCTIONALITY
       ============================== */

    // Toggle mobile menu
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', function () {
            toggleMenu();
        });
    }

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Set current year automatically in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});


/* ==============================
   GLOBAL FUNCTIONS
   ============================== */

function toggleMenu() {
    const navRight = document.querySelector('.nav-right ul');
    if (navRight) {
        navRight.classList.toggle('show');
    }
}
