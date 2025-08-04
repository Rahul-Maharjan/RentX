/*=============== MAIN JAVASCRIPT ===============*/

document.addEventListener("DOMContentLoaded", function () {
  /*=============== MOBILE MENU TOGGLE ===============*/
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  // Show menu
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show");
    });
  }

  // Hide menu
  if (navClose) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  }

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });

  /*=============== HEADER SCROLL BACKGROUND ===============*/
  const header = document.querySelector(".header");

  function scrollHeader() {
    if (window.scrollY >= 50) {
      header.classList.add("scroll-header");
    } else {
      header.classList.remove("scroll-header");
    }
  }

  window.addEventListener("scroll", scrollHeader);

  /*=============== SMOOTH SCROLLING FOR NAVIGATION LINKS ===============*/
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /*=============== SCROLL REVEAL ANIMATION ===============*/
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
      }
    });
  }, observerOptions);

  // Observe all elements with data-aos attribute
  document.querySelectorAll("[data-aos]").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });

  /*=============== TESTIMONIALS CAROUSEL ===============*/
  const testimonialCards = document.querySelectorAll(".testimonial__card");
  const testimonialBtns = document.querySelectorAll(".testimonial__btn");
  let currentTestimonial = 0;

  function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach((card) => card.classList.remove("active"));
    testimonialBtns.forEach((btn) => btn.classList.remove("active"));

    // Show selected testimonial
    if (testimonialCards[index]) {
      testimonialCards[index].classList.add("active");
      testimonialBtns[index].classList.add("active");
    }
  }

  // Add click events to testimonial buttons
  testimonialBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      currentTestimonial = index;
      showTestimonial(currentTestimonial);
    });
  });

  // Auto-rotate testimonials
  function autoRotateTestimonials() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  }

  // Start auto-rotation every 5 seconds
  if (testimonialCards.length > 0) {
    setInterval(autoRotateTestimonials, 5000);
  }

  /*=============== CAR MODAL FUNCTIONALITY ===============*/
  const modal = document.getElementById("car-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const rentButtons = document.querySelectorAll(".button[data-car]");

  // Car data
  const carData = {
    "tesla-model-s": {
      title: "Tesla Model S",
      description:
        "Experience the future of driving with this all-electric luxury sedan. The Tesla Model S combines cutting-edge technology with exceptional performance, featuring autopilot capabilities, premium interior, and zero emissions.",
      image:
        "./images/tesla.png",
      price: "$99",
      features: [
        "5 Seats",
        "Electric",
        "Automatic",
        "Autopilot",
        "Premium Sound",
        "Supercharging",
      ],
    },
    "bmw-x5": {
      title: "BMW X5",
      description:
        "The perfect blend of luxury and practicality. This spacious SUV offers commanding road presence, advanced safety features, and premium comfort for up to 7 passengers.",
      image: "./images/bmw.png",
      price: "$79",
      features: [
        "7 Seats",
        "Gasoline",
        "Automatic",
        "All-Wheel Drive",
        "Panoramic Roof",
        "Advanced Safety",
      ],
    },
    "audi-a4": {
      title: "Audi A4",
      description:
        "Elegant and sophisticated, the Audi A4 delivers a refined driving experience with cutting-edge technology and premium materials throughout.",
      image: "./images/audi.png",
      price: "$65",
      features: [
        "5 Seats",
        "Gasoline",
        "Automatic",
        "Quattro AWD",
        "Virtual Cockpit",
        "Bang & Olufsen",
      ],
    },
    "ferrari-488": {
      title: "Ferrari 488",
      description:
        "Unleash your passion for speed with this high-performance sports car. The Ferrari 488 offers an exhilarating driving experience with its powerful V8 engine and precise handling.",
      image:
        "./images/ferrari.png",
      price: "$299",
      features: [
        "2 Seats",
        "V8 Engine",
        "Manual",
        "Carbon Fiber",
        "Track Mode",
        "Racing Seats",
      ],
    },
    "mercedes-c-class": {
      title: "Mercedes C-Class",
      description:
        "Premium comfort meets advanced technology in this luxury sedan. The Mercedes C-Class provides a smooth, quiet ride with exceptional build quality.",
      image:
        "./images/marcedes.png",
      price: "$85",
      features: [
        "5 Seats",
        "Gasoline",
        "Automatic",
        "MBUX System",
        "Ambient Lighting",
        "Safety Assist",
      ],
    },
    "toyota-camry": {
      title: "Toyota Camry",
      description:
        "Reliable, efficient, and comfortable. The Toyota Camry Hybrid offers excellent fuel economy without compromising on performance or comfort.",
      image:
        "./images/toyota.png",
      price: "$45",
      features: [
        "5 Seats",
        "Hybrid",
        "Automatic",
        "Toyota Safety",
        "Fuel Efficient",
        "Spacious Interior",
      ],
    },
  };

  // Open modal
  function openModal(carId) {
    const car = carData[carId];
    if (!car) return;

    // Populate modal content
    document.getElementById("modal-car-title").textContent = car.title;
    document.getElementById("modal-car-description").textContent =
      car.description;
    document.getElementById("modal-car-image").src = car.image;
    document.getElementById("modal-car-image").alt = car.title;
    document.getElementById("modal-car-price").textContent = car.price;

    // Populate features
    const featuresContainer = document.getElementById("modal-car-features");
    featuresContainer.innerHTML = "";
    car.features.forEach((feature) => {
      const span = document.createElement("span");
      span.className = "car__feature";
      span.textContent = feature;
      featuresContainer.appendChild(span);
    });

    // Show modal
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  // Close modal
  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  // Add event listeners for rent buttons
  rentButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const carId = button.getAttribute("data-car");
      openModal(carId);
    });
  });

  // Close modal events
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  /*=============== BOOKING FORM HANDLING ===============*/
  const bookingForm = document.getElementById("booking-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const pickupDate = document.getElementById("pickup-date").value;
      const returnDate = document.getElementById("return-date").value;
      const pickupLocation = document.getElementById("pickup-location").value;

      // Validate dates
      const pickup = new Date(pickupDate);
      const returnDateObj = new Date(returnDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (pickup < today) {
        alert("Pickup date cannot be in the past.");
        return;
      }

      if (returnDateObj <= pickup) {
        alert("Return date must be after pickup date.");
        return;
      }

      if (!pickupLocation.trim()) {
        alert("Please enter a pickup location.");
        return;
      }

      // Simulate booking process
      const button = bookingForm.querySelector(".button");
      const originalText = button.textContent;

      button.textContent = "Processing...";
      button.disabled = true;

      setTimeout(() => {
        alert(
          "Booking request submitted successfully! We will contact you shortly to confirm your reservation."
        );
        closeModal();
        bookingForm.reset();
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    });
  }

  /*=============== FORM ENHANCEMENTS ===============*/
  // Set minimum date to today
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split("T")[0];

  dateInputs.forEach((input) => {
    input.min = today;
  });

  /*=============== SCROLL TO TOP FUNCTIONALITY ===============*/
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = "↑";
  scrollTopBtn.className = "scroll-top";
  scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    `;

  document.body.appendChild(scrollTopBtn);

  // Show/hide scroll to top button
  function toggleScrollTopBtn() {
    if (window.scrollY > 300) {
      scrollTopBtn.style.opacity = "1";
      scrollTopBtn.style.visibility = "visible";
    } else {
      scrollTopBtn.style.opacity = "0";
      scrollTopBtn.style.visibility = "hidden";
    }
  }

  window.addEventListener("scroll", toggleScrollTopBtn);

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /*=============== INITIALIZE AOS (Animate On Scroll) ===============*/
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  /*=============== CONSOLE WELCOME MESSAGE ===============*/
  console.log(
    "%c🚗 Welcome to RentX! %c\nBuilt with modern web technologies",
    "color: #2563eb; font-size: 20px; font-weight: bold;",
    "color: #64748b; font-size: 14px;"
  );
});
