$(document).ready(function () {
    // Toggle sidebar menu visibility
    $('.menu-btn').click(function () {
        $('.sidebar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
    });

    // Handle active link state
    $('.sidebar-link').click(function () {
        // Remove 'active' class from all links
        $('.sidebar-link').removeClass('active');
        // Add 'active' class to the clicked link
        $(this).addClass('active');
    });
});

function setActiveLink() {
    // Get the current hash from the URL, default to "#home" if no hash exists
    const currentHash = window.location.hash || "#home";

    // Remove the 'active' class from all sidebar links
    document.querySelectorAll('.sidebar-link').forEach((link) => {
      link.classList.remove('active');
    });

    // Add the 'active' class to the link with the matching href
    const activeLink = document.querySelector(`.sidebar-link a[href="${currentHash}"]`);
    if (activeLink) {
      activeLink.parentElement.classList.add('active');
    }

    // If the hash is missing, redirect to #home
    if (!window.location.hash) {
      window.location.hash = "#home";
    }
  }

  // Call the function on page load and hash change
  window.addEventListener('load', setActiveLink);
  window.addEventListener('hashchange', setActiveLink);
