/*=============== SIMPLIFIED MODAL FUNCTIONALITY ===============*/

class BookingModal {
  constructor() {
    this.modal = document.getElementById("car-modal");
    this.overlay = document.getElementById("modal-overlay");
    this.closeBtn = document.getElementById("modal-close");
    this.bookingForm = document.getElementById("booking-form");
    this.isOpen = false;

    if (this.modal) {
      this.init();
    }
  }

  init() {
    // Close button event
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    // Overlay click event
    if (this.overlay) {
      this.overlay.addEventListener("click", () => this.close());
    }

    // Escape key event
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Form submission
    if (this.bookingForm) {
      this.bookingForm.addEventListener("submit", (e) =>
        this.handleFormSubmit(e)
      );
    }
  }

  open() {
    if (this.isOpen) return;

    this.modal.classList.add("show");
    document.body.style.overflow = "hidden";
    this.isOpen = true;

    // Focus first input
    setTimeout(() => {
      const firstInput = this.modal.querySelector("input, select, textarea");
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  }

  close() {
    if (!this.isOpen) return;

    this.modal.classList.remove("show");
    document.body.style.overflow = "";
    this.isOpen = false;
  }

  handleFormSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this.bookingForm);
    const bookingData = Object.fromEntries(formData);

    // Validate required fields
    const requiredFields = [
      "pickup-date",
      "return-date",
    ];
    const missingFields = requiredFields.filter((field) => !bookingData[field]);

    if (missingFields.length > 0) {
      this.showValidationError(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    // Validate dates
    const pickupDate = new Date(bookingData["pickup-date"]);
    const returnDate = new Date(bookingData["return-date"]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (pickupDate < today) {
      this.showValidationError("Pickup date cannot be in the past");
      return;
    }

    if (returnDate <= pickupDate) {
      this.showValidationError("Return date must be after pickup date");
      return;
    }

    // Process booking
    this.processBooking(bookingData);
  }

  showValidationError(message) {
    // Remove existing error
    const existingError = this.modal.querySelector(".form__error");
    if (existingError) {
      existingError.remove();
    }

    // Create error element
    const errorEl = document.createElement("div");
    errorEl.className = "form__error";
    errorEl.innerHTML = `
            <i class="ri-error-warning-line"></i>
            <span>${message}</span>
        `;

    // Insert before submit button
    const submitBtn = this.modal.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.parentNode.insertBefore(errorEl, submitBtn);
    }

    // Add error styles
    this.addErrorStyles();

    // Remove error after 5 seconds
    setTimeout(() => {
      if (errorEl.parentNode) {
        errorEl.remove();
      }
    }, 5000);
  }

  addErrorStyles() {
    if (!document.getElementById("form-error-styles")) {
      const style = document.createElement("style");
      style.id = "form-error-styles";
      style.textContent = `
                .form__error {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1rem;
                    margin-bottom: 1rem;
                    background: #fef2f2;
                    border: 1px solid #fecaca;
                    border-radius: 6px;
                    color: #dc2626;
                    font-size: 0.875rem;
                }
                
                .form__error i {
                    font-size: 1rem;
                }
                
                .form__success {
                    text-align: center;
                    padding: 2rem;
                    background: #f0f9ff;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                }
                
                .form__success-icon {
                    width: 60px;
                    height: 60px;
                    background: #10b981;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    color: white;
                    font-size: 1.5rem;
                }
                
                .form__success h4 {
                    margin-bottom: 0.5rem;
                    color: #1f2937;
                }
                
                .form__success p {
                    color: #6b7280;
                    margin: 0;
                }
            `;
      document.head.appendChild(style);
    }
  }

  processBooking(bookingData) {
    // Show loading state
    const submitBtn = this.modal.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Processing...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      this.showSuccessMessage(bookingData);

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Close modal after 2 seconds
      setTimeout(() => {
        this.close();
        this.resetForm();
      }, 2000);
    }, 1500);
  }

  showSuccessMessage(bookingData) {
    // Remove existing messages
    const existingMsg = this.modal.querySelector(".form__success");
    if (existingMsg) {
      existingMsg.remove();
    }

    // Create success element
    const successEl = document.createElement("div");
    successEl.className = "form__success";
    successEl.innerHTML = `
            <div class="form__success-icon">
                <i class="ri-check-line"></i>
            </div>
            <div class="form__success-content">
                <h4>Booking Confirmed!</h4>
                <p>Thank you ${bookingData.name}! Your booking has been confirmed. We'll send confirmation details to ${bookingData.email}</p>
            </div>
        `;

    // Insert before form
    const form = this.modal.querySelector(".modal__form");
    if (form) {
      form.parentNode.insertBefore(successEl, form);
    }
  }

  resetForm() {
    if (this.bookingForm) {
      this.bookingForm.reset();

      // Reset calculated fields
      const duration = document.getElementById("duration");
      const totalPrice = document.getElementById("total-price");
      const dailyRate = document.getElementById("daily-rate");

      if (duration) duration.textContent = "1 day";
      if (totalPrice && dailyRate) {
        totalPrice.textContent = dailyRate.textContent;
      }
    }

    // Remove success message
    const successMsg = this.modal.querySelector(".form__success");
    if (successMsg) {
      successMsg.remove();
    }
  }
}

/*=============== INITIALIZE MODAL ===============*/
document.addEventListener("DOMContentLoaded", function () {
  // Initialize booking modal
  const bookingModal = new BookingModal();

  // Set minimum date for form inputs
  const today = new Date().toISOString().split("T")[0];
  const pickupDate = document.getElementById("pickup-date");
  const returnDate = document.getElementById("return-date");

  if (pickupDate) pickupDate.min = today;
  if (returnDate) returnDate.min = today;

  // Make it globally available
  window.bookingModal = bookingModal;
});

// Export for external use
window.BookingModal = BookingModal;
