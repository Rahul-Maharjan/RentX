/*=============== CARS FILTERING FUNCTIONALITY ===============*/

class CarsFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll(".filter__btn");
    this.carCards = document.querySelectorAll(".car__card");
    this.init();
  }

  init() {
    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.handleFilterClick(e);
      });
    });
  }

  handleFilterClick(e) {
    const clickedButton = e.target;
    const filter = clickedButton.dataset.filter;

    // Update active button
    this.filterButtons.forEach((btn) => btn.classList.remove("active"));
    clickedButton.classList.add("active");

    // Filter cars
    this.filterCars(filter);
  }

  filterCars(filter) {
    this.carCards.forEach((card, index) => {
      const category = card.dataset.category;
      const shouldShow = filter === "all" || category === filter;

      if (shouldShow) {
        // Show the card
        card.style.display = "block";
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        // Animate in with delay
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
          card.style.transition = "all 0.4s ease";
        }, index * 100);
      } else {
        // Hide the card
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  }
}

/*=============== VIEW DETAILS FUNCTIONALITY ===============*/

class CarDetails {
  constructor() {
    this.viewButtons = document.querySelectorAll(".car__btn--view");
    this.modal = document.getElementById("car-modal");
    this.init();
  }

  init() {
    this.viewButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const carId = btn.dataset.car;
        this.showCarDetails(carId);
      });
    });
  }

  showCarDetails(carId) {
    // Populate modal with car data
    this.populateModal(carId);

    // Show modal
    this.modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  populateModal(carId) {
    // Car data
    const carData = {
      "tesla-model-s": {
        name: "Tesla Model S",
        image: "./images/tesla.png",
        price: 99,
        description:
          "Experience the future of driving with the Tesla Model S. This all-electric luxury sedan combines cutting-edge technology with unparalleled performance, featuring autopilot capabilities and a sleek, aerodynamic design.",
        specs: [
          { icon: "ri-user-line", text: "5 Seats" },
          { icon: "ri-flashlight-line", text: "Electric" },
          { icon: "ri-settings-3-line", text: "Automatic" },
          { icon: "ri-speed-line", text: "0-60 in 3.1s" },
        ],
      },
      "bmw-x5": {
        name: "BMW X5",
        image: "./images/bmw.png",
        price: 79,
        description:
          "The BMW X5 is the perfect blend of luxury and practicality. This spacious SUV offers premium comfort for up to 7 passengers while maintaining the sporty driving dynamics BMW is known for.",
        specs: [
          { icon: "ri-user-line", text: "7 Seats" },
          { icon: "ri-gas-station-line", text: "Gasoline" },
          { icon: "ri-settings-3-line", text: "Automatic" },
          { icon: "ri-car-line", text: "4WD" },
        ],
      },
      "audi-a4": {
        name: "Audi A4",
        image: "./images/audi.png",
        price: 65,
        description:
          "The Audi A4 represents the pinnacle of German engineering and design. This elegant sedan features cutting-edge technology, premium materials, and a refined driving experience.",
        specs: [
          { icon: "ri-user-line", text: "5 Seats" },
          { icon: "ri-gas-station-line", text: "Gasoline" },
          { icon: "ri-settings-3-line", text: "Automatic" },
          { icon: "ri-shield-check-line", text: "Safety+" },
        ],
      },
      "ferrari-488": {
        name: "Ferrari 488",
        image: "./images/farrari.png",
        price: 299,
        description:
          "Unleash your passion for speed with the Ferrari 488. This high-performance sports car delivers an exhilarating driving experience with its powerful V8 engine and aerodynamic design.",
        specs: [
          { icon: "ri-user-line", text: "2 Seats" },
          { icon: "ri-gas-station-line", text: "Gasoline" },
          { icon: "ri-hand-coin-line", text: "Manual" },
          { icon: "ri-rocket-line", text: "661 HP" },
        ],
      },
      "mercedes-c-class": {
        name: "Mercedes C-Class",
        image: "./images/marcedise.webp",
        price: 85,
        description:
          "The Mercedes C-Class sets the standard for luxury sedans. With advanced safety features, premium comfort, and sophisticated design, it delivers an exceptional driving experience.",
        specs: [
          { icon: "ri-user-line", text: "5 Seats" },
          { icon: "ri-gas-station-line", text: "Gasoline" },
          { icon: "ri-settings-3-line", text: "Automatic" },
          { icon: "ri-shield-star-line", text: "Premium" },
        ],
      },
      "toyota-camry": {
        name: "Toyota Camry",
        image: "./images/toyota.png",
        price: 45,
        description:
          "The Toyota Camry hybrid offers the perfect balance of efficiency and performance. This reliable sedan features excellent fuel economy and a comfortable ride for city and highway driving.",
        specs: [
          { icon: "ri-user-line", text: "5 Seats" },
          { icon: "ri-leaf-line", text: "Hybrid" },
          { icon: "ri-settings-3-line", text: "Automatic" },
          { icon: "ri-gas-station-line", text: "50+ MPG" },
        ],
      },
    };

    const car = carData[carId];
    if (!car) return;

    // Update modal content
    const modalImage = document.getElementById("modal-car-image");
    const modalTitle = document.getElementById("modal-car-title");
    const modalDescription = document.getElementById("modal-car-description");
    const modalPrice = document.getElementById("modal-car-price");
    const modalFeatures = document.getElementById("modal-car-features");
    const dailyRate = document.getElementById("daily-rate");
    const totalPrice = document.getElementById("total-price");

    modalImage.src = car.image;
    modalImage.alt = car.name;
    modalTitle.textContent = car.name;
    modalDescription.textContent = car.description;
    modalPrice.textContent = `$${car.price}`;
    dailyRate.textContent = `$${car.price}`;
    totalPrice.textContent = `$${car.price}`;

    // Update specs
    modalFeatures.innerHTML = car.specs
      .map(
        (spec) => `
            <div class="modal__spec">
                <div class="modal__spec-icon">
                    <i class="${spec.icon}"></i>
                </div>
                <span class="modal__spec-text">${spec.text}</span>
            </div>
        `
      )
      .join("");
  }
}

/*=============== INITIALIZE ON DOM LOAD ===============*/

document.addEventListener("DOMContentLoaded", function () {
  // Initialize cars filtering
  new CarsFilter();

  // Initialize car details
  new CarDetails();

  // Close modal functionality
  const modal = document.getElementById("car-modal");
  const closeBtn = document.getElementById("modal-close");
  const overlay = document.getElementById("modal-overlay");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    });
  }

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });

  // Form calculation
  const pickupDate = document.getElementById("pickup-date");
  const returnDate = document.getElementById("return-date");
  const duration = document.getElementById("duration");
  const totalPriceEl = document.getElementById("total-price");
  const dailyRateEl = document.getElementById("daily-rate");

  function calculateTotal() {
    if (pickupDate.value && returnDate.value) {
      const pickup = new Date(pickupDate.value);
      const returnD = new Date(returnDate.value);
      const timeDiff = returnD.getTime() - pickup.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff > 0) {
        const dailyRate = parseInt(dailyRateEl.textContent.replace("$", ""));
        const total = dailyRate * daysDiff;

        duration.textContent = `${daysDiff} day${daysDiff > 1 ? "s" : ""}`;
        totalPriceEl.textContent = `$${total}`;
      }
    }
  }

  if (pickupDate && returnDate) {
    pickupDate.addEventListener("change", calculateTotal);
    returnDate.addEventListener("change", calculateTotal);
  }
});

// Export for external use
window.CarsFilter = CarsFilter;
window.CarDetails = CarDetails;
