document.addEventListener('DOMContentLoaded', function() {
    // JavaScript code to add interactivity if needed
    console.log("DOM fully loaded and parsed");
});

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('show');
  }
