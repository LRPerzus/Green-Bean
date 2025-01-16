function checkMobileView() {
    const overlay = document.getElementById("mobile-overlay");
    
    // If window width is greater than 768px (not mobile)
    if (window.innerWidth > 768) {
        overlay.classList.add("show");  // Show overlay
    } else {
        overlay.classList.remove("show");  // Hide overlay
    }
}

// Check when the page loads and when the window is resized
window.onload = checkMobileView;
window.onresize = checkMobileView;