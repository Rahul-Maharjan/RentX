/*=============== MODAL FUNCTIONALITY ===============*/

class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.overlay = this.modal?.querySelector(".modal__overlay");
    this.closeBtn = this.modal?.querySelector(".modal__close");
    this.body = document.body;
    this.isOpen = false;
    this.focusableElements = [];
    this.previousFocus = null;

    if (this.modal) {
      this.init();
    }
  }

  init() {
    // Close button event
    this.closeBtn?.addEventListener("click", () => this.close());

    // Overlay click event
    this.overlay?.addEventListener("click", () => this.close());

    // Escape key event
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    if (this.isOpen) return;

    // Store current focus
    this.previousFocus = document.activeElement;

    // Show modal
    this.modal.classList.add("show");
    this.body.style.overflow = "hidden";
    this.isOpen = true;

    // Focus first element
    setTimeout(() => {
      const firstFocusable = this.modal.querySelector(
        'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 100);
  }

  close() {
    if (!this.isOpen) return;

    // Hide modal
    this.modal.classList.remove("show");
    this.body.style.overflow = "auto";
    this.isOpen = false;

    // Restore focus
    if (this.previousFocus) {
      this.previousFocus.focus();
    }

    // Reset modal content if needed
    this.resetContent();
  }

  resetContent() {
    // Reset form if exists
    const form = this.modal.querySelector("form");
    if (form) {
      form.reset();
    }

    // Clear any error messages
    const errorElements = this.modal.querySelectorAll(
      ".error-message, .form-errors, .booking-success"
    );
    errorElements.forEach((element) => element.remove());

    // Show form again if it was hidden
    const bookingForm = this.modal.querySelector("#booking-form");
    if (bookingForm) {
      bookingForm.style.display = "block";
    }
  }
}

/*=============== CAR MODAL MANAGER ===============*/
class CarModalManager {
  constructor() {
    this.modal = new Modal("car-modal");
    this.carData = {};
    this.init();
  }

  init() {
    // Load car data
    this.loadCarData();

    // Add event listeners to rent buttons
    document.addEventListener("click", (e) => {
      if (
        e.target.matches(".button[data-car]") ||
        e.target.closest(".button[data-car]")
      ) {
        e.preventDefault();
        const button = e.target.matches(".button[data-car]")
          ? e.target
          : e.target.closest(".button[data-car]");
        const carId = button.dataset.car;
        this.openCarModal(carId);
      }
    });

    // Handle booking form submission
    document.addEventListener("submit", (e) => {
      if (e.target.id === "booking-form") {
        e.preventDefault();
        this.handleBookingSubmission(e.target);
      }
    });
  }

  loadCarData() {
    this.carData = {
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
        image: "https://via.placeholder.com/400x300/10b981/ffffff?text=BMW+X5",
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
        image: "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Audi+A4",
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
          "https://via.placeholder.com/400x300/ef4444/ffffff?text=Ferrari+488",
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
          "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Mercedes+C-Class",
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
          "https://via.placeholder.com/400x300/06b6d4/ffffff?text=Toyota+Camry",
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
  }

  openCarModal(carId) {
    const car = this.carData[carId];
    if (!car) {
      console.error(`Car with ID "${carId}" not found`);
      return;
    }

    // Update modal content
    this.updateModalContent(car);

    // Open modal
    this.modal.open();
  }

  updateModalContent(car) {
    // Update basic info
    const titleElement = document.getElementById("modal-car-title");
    const descriptionElement = document.getElementById("modal-car-description");
    const imageElement = document.getElementById("modal-car-image");
    const priceElement = document.getElementById("modal-car-price");

    if (titleElement) titleElement.textContent = car.title;
    if (descriptionElement) descriptionElement.textContent = car.description;
    if (imageElement) {
      imageElement.src = car.image;
      imageElement.alt = car.title;
    }
    if (priceElement) priceElement.textContent = car.price;

    // Update features
    const featuresContainer = document.getElementById("modal-car-features");
    if (featuresContainer) {
      featuresContainer.innerHTML = "";
      car.features.forEach((feature) => {
        const span = document.createElement("span");
        span.className = "car__feature";
        span.textContent = feature;
        featuresContainer.appendChild(span);
      });
    }

    // Set today as minimum date for form inputs
    const today = new Date().toISOString().split("T")[0];
    const dateInputs = document.querySelectorAll(
      '#car-modal input[type="date"]'
    );
    dateInputs.forEach((input) => {
      input.min = today;
    });
  }

  handleBookingSubmission(form) {
    const bookingData = {
      pickupDate: document.getElementById("pickup-date")?.value,
      returnDate: document.getElementById("return-date")?.value,
      pickupLocation: document.getElementById("pickup-location")?.value,
      carTitle: document.getElementById("modal-car-title")?.textContent,
      carPrice: document.getElementById("modal-car-price")?.textContent,
    };

    // Validate form
    const validation = this.validateBookingForm(bookingData);
    if (!validation.isValid) {
      this.showFormErrors(validation.errors);
      return;
    }

    // Clear any existing errors
    this.clearFormErrors();

    // Show loading state
    const submitButton = form.querySelector('.button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Processing...";
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Success
      this.showBookingSuccess(bookingData);

      // Reset form
      form.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;

      // Close modal after a delay
      setTimeout(() => {
        this.modal.close();
      }, 3000);
    }, 2000);
  }

  validateBookingForm(data) {
    const errors = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check pickup date
    if (!data.pickupDate) {
      errors.push("Pickup date is required");
    } else {
      const pickupDate = new Date(data.pickupDate);
      if (pickupDate < today) {
        errors.push("Pickup date cannot be in the past");
      }
    }

    // Check return date
    if (!data.returnDate) {
      errors.push("Return date is required");
    } else if (data.pickupDate) {
      const pickupDate = new Date(data.pickupDate);
      const returnDate = new Date(data.returnDate);
      if (returnDate <= pickupDate) {
        errors.push("Return date must be after pickup date");
      }
    }

    // Check pickup location
    if (!data.pickupLocation || data.pickupLocation.trim().length < 3) {
      errors.push("Please enter a valid pickup location");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  showFormErrors(errors) {
    this.clearFormErrors();

    const errorContainer = document.createElement("div");
    errorContainer.className = "form-errors";
    errorContainer.innerHTML = `
            <ul>
                ${errors.map((error) => `<li>${error}</li>`).join("")}
            </ul>
        `;

    const form = document.getElementById("booking-form");
    form.insertBefore(errorContainer, form.firstChild);
  }

  clearFormErrors() {
    const existingErrors = document.querySelector(".form-errors");
    if (existingErrors) {
      existingErrors.remove();
    }
  }

  showBookingSuccess(data) {
    const successContainer = document.createElement("div");
    successContainer.className = "booking-success";
    successContainer.innerHTML = `
            <div class="success-icon">✅</div>
            <h4>Booking Request Submitted!</h4>
            <p>We'll contact you shortly to confirm your reservation for ${data.carTitle}.</p>
            <div class="booking-details">
                <p><strong>Pickup:</strong> ${data.pickupDate} at ${data.pickupLocation}</p>
                <p><strong>Return:</strong> ${data.returnDate}</p>
                <p><strong>Price:</strong> ${data.carPrice}/day</p>
            </div>
        `;

    const form = document.getElementById("booking-form");
    form.style.display = "none";

    const modalInfo = document.querySelector(".modal__info");
    modalInfo.appendChild(successContainer);
  }
}

/*=============== INITIALIZE ===============*/
document.addEventListener("DOMContentLoaded", function () {
  // Initialize car modal manager
  new CarModalManager();

  /*=============== ADD STYLES FOR FORM ERRORS AND SUCCESS ===============*/
  const modalStyles = document.createElement("style");
  modalStyles.textContent = `
        .form-errors {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 6px;
            padding: 1rem;
            margin-bottom: 1rem;
            color: #dc2626;
        }
        
        .form-errors ul {
            margin: 0;
            padding-left: 1.5rem;
        }
        
        .booking-success {
            text-align: center;
            padding: 2rem;
        }
        
        .success-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .booking-details {
            background: var(--light-color);
            padding: 1rem;
            border-radius: 6px;
            margin-top: 1rem;
            text-align: left;
        }
        
        .booking-details p {
            margin-bottom: 0.5rem;
        }
    `;

  document.head.appendChild(modalStyles);
});
