/*=============== SIMPLE TESTIMONIALS CAROUSEL ===============*/

document.addEventListener("DOMContentLoaded", function () {
  const testimonialCards = document.querySelectorAll(".testimonial__card");
  const testimonialBtns = document.querySelectorAll(".testimonial__btn");
  let currentSlide = 0;
  let autoSlideInterval;

  console.log("Testimonials script loaded");
  console.log("Found cards:", testimonialCards.length);
  console.log("Found buttons:", testimonialBtns.length);

  // Initialize - show first testimonial
  function init() {
    if (testimonialCards.length === 0) return;

    showSlide(0);
    startAutoSlide();
  }

  // Show specific slide
  function showSlide(index) {
    console.log("Showing slide:", index);

    // Hide all cards with smooth animation
    testimonialCards.forEach((card, i) => {
      card.classList.remove("active");
      card.style.opacity = "0";
      card.style.transform = "translateY(30px) scale(0.95)";
      card.style.pointerEvents = "none";
      card.style.zIndex = "1";
    });

    // Remove active class from all buttons
    testimonialBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Show selected card with smooth animation
    if (testimonialCards[index]) {
      setTimeout(() => {
        testimonialCards[index].classList.add("active");
        testimonialCards[index].style.opacity = "1";
        testimonialCards[index].style.transform = "translateY(0) scale(1)";
        testimonialCards[index].style.pointerEvents = "auto";
        testimonialCards[index].style.zIndex = "2";
      }, 100);
    }

    // Activate corresponding button
    if (testimonialBtns[index]) {
      testimonialBtns[index].classList.add("active");
    }

    currentSlide = index;
  }

  // Next slide
  function nextSlide() {
    const next = (currentSlide + 1) % testimonialCards.length;
    showSlide(next);
  }

  // Previous slide
  function prevSlide() {
    const prev =
      (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
    showSlide(prev);
  }

  // Start auto-slide
  function startAutoSlide() {
    if (testimonialCards.length <= 1) return;

    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  // Stop auto-slide
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

  // Add button event listeners
  testimonialBtns.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Button clicked:", index);

      stopAutoSlide();
      showSlide(index);

      // Restart auto-slide after user interaction
      setTimeout(() => {
        startAutoSlide();
      }, 8000);
    });
  });

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      stopAutoSlide();
      prevSlide();
      setTimeout(startAutoSlide, 8000);
    } else if (e.key === "ArrowRight") {
      stopAutoSlide();
      nextSlide();
      setTimeout(startAutoSlide, 8000);
    }
  });

  // Pause on hover
  const testimonialsContainer = document.querySelector(
    ".testimonials__container"
  );
  if (testimonialsContainer) {
    testimonialsContainer.addEventListener("mouseenter", stopAutoSlide);
    testimonialsContainer.addEventListener("mouseleave", startAutoSlide);
  }

  // Initialize the carousel
  init();

  // Make functions available globally for debugging
  window.testimonialsCarousel = {
    showSlide,
    nextSlide,
    prevSlide,
    currentSlide: () => currentSlide,
  };
});
