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
