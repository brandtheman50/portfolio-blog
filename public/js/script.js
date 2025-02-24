document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".sidebar ul a");

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      // Remove 'active' from all links
      navLinks.forEach(link => link.classList.remove("active"));

      // Add 'active' class to the clicked link
      this.classList.add("active");

      // Smooth scroll behavior
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 50,
          behavior: "smooth"
        });
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("menu-toggle").addEventListener("click", function(event) {
      document.querySelector(".sidebar").classList.toggle("active");
      document.querySelector(".overlay").classList.toggle("active");
  });

  // Close sidebar when clicking outside
  document.addEventListener("click", function(event) {
      let sidebar = document.querySelector(".sidebar");
      let toggleButton = document.getElementById("menu-toggle");

      // Check if the clicked element is NOT inside the sidebar or the toggle button
      if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
          sidebar.classList.remove("active");
          document.querySelector(".overlay").classList.remove("active"); // Hide overlay
      }
  });
});