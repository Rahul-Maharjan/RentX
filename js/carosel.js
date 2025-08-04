/*=============== CAROUSEL FUNCTIONALITY ===============*/

class Carousel {
  constructor(container) {
    this.container = container;
    this.cards = container.querySelectorAll(".testimonial__card");
    this.buttons = container.querySelectorAll(".testimonial__btn");
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;

    // Debug log
    console.log("Carousel initialized with:", {
      container: this.container,
      cards: this.cards.length,
      buttons: this.buttons.length,
    });

    this.init();
  }

  init() {
    if (this.cards.length === 0) return;

    // Initialize all cards as hidden first
    this.cards.forEach((card, index) => {
      if (index === 0) {
        card.classList.add("active");
        card.style.opacity = "1";
        card.style.transform = "translateX(0)";
        card.style.pointerEvents = "auto";
      } else {
        card.classList.remove("active");
        card.style.opacity = "0";
        card.style.transform = "translateX(100px)";
        card.style.pointerEvents = "none";
      }
    });

    // Set first button as active
    if (this.buttons.length > 0) {
      this.buttons[0].classList.add("active");
    }

    // Add button event listeners
    this.buttons.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Button clicked:", index, "data-slide:", btn.dataset.slide);

        // Get the slide index from data-slide attribute or use the button index
        const slideIndex = btn.dataset.slide
          ? parseInt(btn.dataset.slide)
          : index;
        this.goToSlide(slideIndex);
      });
    });

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    // Add touch support
    this.addTouchSupport();

    // Start autoplay
    this.startAutoPlay();

    // Pause autoplay on hover
    this.container.addEventListener("mouseenter", () => this.pauseAutoPlay());
    this.container.addEventListener("mouseleave", () => this.startAutoPlay());
  }

  showTestimonial(index) {
    // Validate index
    if (index < 0 || index >= this.cards.length) {
      console.warn("Invalid testimonial index:", index);
      return;
    }

    console.log("Showing testimonial:", index);

    // Remove active class from all testimonials and buttons
    this.cards.forEach((card, cardIndex) => {
      card.classList.remove("active");
      card.style.opacity = "0";
      card.style.transform = "translateX(100px)";
      card.style.pointerEvents = "none";
    });

    this.buttons.forEach((btn) => btn.classList.remove("active"));

    // Show selected testimonial with animation
    const targetCard = this.cards[index];
    const targetButton = this.buttons[index];

    if (targetCard) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        targetCard.classList.add("active");
        targetCard.style.opacity = "1";
        targetCard.style.transform = "translateX(0)";
        targetCard.style.pointerEvents = "auto";
      }, 50);
    }

    if (targetButton) {
      targetButton.classList.add("active");
    }

    this.currentIndex = index;
  }

  goToSlide(index) {
    if (index !== this.currentIndex) {
      this.showTestimonial(index);
      this.restartAutoPlay();
    }
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.cards.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    if (this.cards.length <= 1) return;

    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  restartAutoPlay() {
    this.pauseAutoPlay();
    this.startAutoPlay();
  }

  addTouchSupport() {
    let startX = 0;
    let startY = 0;
    let isSwipe = false;

    this.container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwipe = true;
    });

    this.container.addEventListener("touchmove", (e) => {
      if (!isSwipe) return;
      e.preventDefault();
    });

    this.container.addEventListener("touchend", (e) => {
      if (!isSwipe) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Check if it's a horizontal swipe
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }

      isSwipe = false;
    });
  }

  destroy() {
    this.pauseAutoPlay();
    this.buttons.forEach((btn) => {
      btn.replaceWith(btn.cloneNode(true));
    });
  }
}

/*=============== HERO IMAGE CAROUSEL ===============*/
class HeroCarousel {
  constructor() {
    this.images = [
      "images/hero-car.png",
      "https://via.placeholder.com/500x300/2563eb/ffffff?text=Car+2",
      "https://via.placeholder.com/500x300/10b981/ffffff?text=Car+3",
    ];
    this.currentImageIndex = 0;
    this.heroImg = document.querySelector(".hero__img");

    if (this.heroImg && this.images.length > 1) {
      this.init();
    }
  }

  init() {
    setInterval(() => {
      this.nextImage();
    }, 8000);
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.updateImage();
  }

  updateImage() {
    const img = this.heroImg;
    img.style.opacity = "0.7";

    setTimeout(() => {
      img.src = this.images[this.currentImageIndex];
      img.style.opacity = "1";
    }, 300);
  }
}

/*=============== INITIALIZE CAROUSELS ===============*/
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing carousels...");

  // Initialize testimonials carousel
  const testimonialsContainer = document.querySelector(
    ".testimonials__container"
  );

  if (testimonialsContainer) {
    console.log("Found testimonials container, initializing carousel...");
    const carousel = new Carousel(testimonialsContainer);

    // Make carousel available globally for debugging
    window.testimonialsCarousel = carousel;

    // Add direct button event listeners as fallback
    const buttons = document.querySelectorAll(".testimonial__btn");
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Direct button click:", index);
        carousel.goToSlide(index);
      });
    });
  } else {
    console.warn("Testimonials container not found!");
  }

  // Initialize hero carousel
  new HeroCarousel();

  /*=============== CARS SECTION FILTERING ===============*/
  const filterButtons = document.querySelectorAll(".filter-btn");
  const carCards = document.querySelectorAll(".car__card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter cars
      carCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 100);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  /*=============== LOADING ANIMATIONS ===============*/
  const loadingElements = document.querySelectorAll(".loading");

  loadingElements.forEach((element) => {
    setTimeout(() => {
      element.classList.add("loaded");
    }, 1000);
  });

  /*=============== PRICE RANGE FILTER ===============*/
  const priceRange = document.getElementById("price-range");
  const priceDisplay = document.getElementById("price-display");

  if (priceRange) {
    priceRange.addEventListener("input", (e) => {
      const value = e.target.value;
      priceDisplay.textContent = `$${value}`;

      // Filter cars by price
      carCards.forEach((card) => {
        const priceText = card.querySelector(".car__price").textContent;
        const price = parseInt(priceText.replace("$", ""));

        if (price <= value) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});

/*=============== EXPORT FOR EXTERNAL USE ===============*/
window.RentXCarousel = Carousel;
window.RentXHeroCarousel = HeroCarousel;
