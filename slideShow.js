let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector(".slides");
    const slideWidth = document.querySelector(".slide").offsetWidth; // Get single slide width
    const totalSlides = document.querySelectorAll(".slide").length;
    const visibleSlides = Math.floor(100 / 35); // Number of slides visible at a time

    currentIndex += direction;

    // Reset immediately when reaching the last set of slides
    if (currentIndex >= totalSlides - visibleSlides) {
        currentIndex = 0; // Jump back to the start (slide 1)
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - visibleSlides; // Jump to the last valid position
    }

    slides.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
}
