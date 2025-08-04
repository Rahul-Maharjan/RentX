/*=============== SUPPORT PAGE FUNCTIONALITY ===============*/

class SupportPage {
  constructor() {
    this.tabButtons = document.querySelectorAll(".tab-btn");
    this.tabContents = document.querySelectorAll(".tab-content");
    this.supportForm = document.getElementById("support-form");
    this.faqItems = document.querySelectorAll(".faq__item");
    this.searchInput = document.getElementById("search-input");
    this.fileInput = document.querySelector(".file-input");

    this.init();
  }

  init() {
    this.setupTabs();
    this.setupForm();
    this.setupFAQ();
    this.setupSearch();
    this.setupFileUpload();
    this.setupFormValidation();
  }

  setupTabs() {
    this.tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabName = button.dataset.tab;
        this.switchTab(tabName, button);
      });
    });
  }

  switchTab(tabName, activeButton) {
    // Remove active class from all buttons and contents
    this.tabButtons.forEach((btn) => btn.classList.remove("active"));
    this.tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and corresponding content
    activeButton.classList.add("active");
    const targetContent = document.getElementById(`${tabName}-tab`);
    if (targetContent) {
      targetContent.classList.add("active");
    }

    // Reset form when switching tabs
    this.supportForm.reset();
    this.clearMessages();
  }

  setupForm() {
    this.supportForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    // Reset button functionality
    const resetBtn = document.querySelector(".btn--secondary");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.supportForm.reset();
        this.clearMessages();
        this.resetFileUpload();
      });
    }
  }

  async handleFormSubmit() {
    const submitBtn = document.querySelector(".btn--primary");
    const formData = new FormData(this.supportForm);

    // Get active tab to determine form type
    const activeTab = document.querySelector(".tab-btn.active").dataset.tab;
    formData.append("form_type", activeTab);

    // Validate form
    if (!this.validateForm(activeTab)) {
      return;
    }

    // Show loading state
    this.setLoadingState(submitBtn, true);

    try {
      // Simulate form submission (replace with actual API call)
      await this.submitForm(formData);

      this.showMessage(
        "success",
        "Your message has been sent successfully! We'll get back to you within 24 hours."
      );
      this.supportForm.reset();
      this.resetFileUpload();
    } catch (error) {
      this.showMessage(
        "error",
        "There was an error sending your message. Please try again."
      );
    } finally {
      this.setLoadingState(submitBtn, false);
    }
  }

  validateForm(formType) {
    const requiredFields = this.getRequiredFields(formType);
    let isValid = true;

    requiredFields.forEach((fieldName) => {
      const field = this.supportForm.querySelector(`[name="${fieldName}"]`);
      if (field && !field.value.trim()) {
        this.showFieldError(field, "This field is required");
        isValid = false;
      } else if (field) {
        this.clearFieldError(field);
      }
    });

    // Email validation
    const emailFields = this.supportForm.querySelectorAll(
      'input[type="email"]'
    );
    emailFields.forEach((field) => {
      if (field.value && !this.isValidEmail(field.value)) {
        this.showFieldError(field, "Please enter a valid email address");
        isValid = false;
      }
    });

    return isValid;
  }

  getRequiredFields(formType) {
    const fieldMap = {
      query: ["name", "email", "category", "subject", "message"],
      feedback: ["feedback_email", "feedback_type", "feedback_message"],
      technical: ["tech_name", "tech_email", "priority", "tech_description"],
    };
    return fieldMap[formType] || [];
  }

  showFieldError(field, message) {
    this.clearFieldError(field);

    const errorElement = document.createElement("div");
    errorElement.className = "field-error";
    errorElement.textContent = message;
    errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        `;

    field.style.borderColor = "#ef4444";
    field.parentNode.appendChild(errorElement);
  }

  clearFieldError(field) {
    const existingError = field.parentNode.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }
    field.style.borderColor = "";
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async submitForm(formData) {
    // Simulate API call - replace with actual endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        Math.random() > 0.1 ? resolve() : reject(new Error("Network error"));
      }, 2000);
    });
  }

  setLoadingState(button, isLoading) {
    if (isLoading) {
      button.classList.add("btn--loading");
      button.innerHTML =
        '<i class="ri-loader-4-line"></i><span>Sending...</span>';
      button.disabled = true;
    } else {
      button.classList.remove("btn--loading");
      button.innerHTML =
        '<i class="ri-send-plane-line"></i><span>Send Message</span>';
      button.disabled = false;
    }
  }

  showMessage(type, text) {
    this.clearMessages();

    const messageElement = document.createElement("div");
    messageElement.className = `message message--${type}`;

    const icon = type === "success" ? "ri-check-line" : "ri-error-warning-line";
    messageElement.innerHTML = `
            <i class="${icon}"></i>
            <span>${text}</span>
        `;

    const formWrapper = document.querySelector(".support-form__wrapper");
    formWrapper.insertBefore(messageElement, this.supportForm);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }

  clearMessages() {
    const existingMessages = document.querySelectorAll(".message");
    existingMessages.forEach((msg) => msg.remove());

    // Clear field errors
    const fieldErrors = document.querySelectorAll(".field-error");
    fieldErrors.forEach((error) => error.remove());

    // Reset field border colors
    const inputs = this.supportForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => (input.style.borderColor = ""));
  }

  setupFAQ() {
    this.faqItems.forEach((item) => {
      const question = item.querySelector(".faq__question");
      question.addEventListener("click", () => {
        this.toggleFAQ(item);
      });
    });
  }

  toggleFAQ(item) {
    const isActive = item.classList.contains("active");

    // Close all FAQ items
    this.faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active");
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active");
    }
  }

  setupSearch() {
    if (!this.searchInput) return;

    this.searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      this.searchFAQs(query);
    });

    // Search button functionality
    const searchBtn = document.querySelector(".search-bar__btn");
    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        const query = this.searchInput.value.toLowerCase();
        this.searchFAQs(query);
      });
    }
  }

  searchFAQs(query) {
    if (!query) {
      this.faqItems.forEach((item) => {
        item.style.display = "block";
      });
      return;
    }

    this.faqItems.forEach((item) => {
      const questionText = item
        .querySelector(".faq__question span")
        .textContent.toLowerCase();
      const answerText = item
        .querySelector(".faq__answer p")
        .textContent.toLowerCase();

      if (questionText.includes(query) || answerText.includes(query)) {
        item.style.display = "block";
        // Highlight the search term (optional)
        this.highlightText(item, query);
      } else {
        item.style.display = "none";
      }
    });
  }

  highlightText(element, query) {
    // Simple text highlighting - can be enhanced
    const questionSpan = element.querySelector(".faq__question span");
    const originalText = questionSpan.textContent;
    const highlightedText = originalText.replace(
      new RegExp(query, "gi"),
      (match) => `<mark style="background: yellow; padding: 0;">${match}</mark>`
    );
    questionSpan.innerHTML = highlightedText;
  }

  setupFileUpload() {
    if (!this.fileInput) return;

    const fileUploadArea = document.querySelector(".file-upload");
    const fileUploadContent = document.querySelector(".file-upload__content");

    // Drag and drop functionality
    fileUploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      fileUploadArea.style.borderColor = "var(--primary-color)";
      fileUploadArea.style.background = "rgba(59, 130, 246, 0.05)";
    });

    fileUploadArea.addEventListener("dragleave", () => {
      fileUploadArea.style.borderColor = "";
      fileUploadArea.style.background = "";
    });

    fileUploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      fileUploadArea.style.borderColor = "";
      fileUploadArea.style.background = "";

      const files = e.dataTransfer.files;
      this.handleFileSelection(files);
    });

    // File input change
    this.fileInput.addEventListener("change", (e) => {
      this.handleFileSelection(e.target.files);
    });
  }

  handleFileSelection(files) {
    const fileUploadContent = document.querySelector(".file-upload__content");
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (files.length === 0) return;

    const validFiles = [];
    const errors = [];

    Array.from(files).forEach((file) => {
      if (file.size > maxSize) {
        errors.push(`${file.name} is too large (max 10MB)`);
      } else if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name} is not a supported file type`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      this.showMessage("error", errors.join(", "));
      return;
    }

    if (validFiles.length > 0) {
      this.displaySelectedFiles(validFiles);
    }
  }

  displaySelectedFiles(files) {
    const fileUploadContent = document.querySelector(".file-upload__content");

    fileUploadContent.innerHTML = `
            <i class="ri-file-check-line"></i>
            <span>${files.length} file(s) selected</span>
            <small>Click to change selection</small>
            <div class="selected-files">
                ${Array.from(files)
                  .map(
                    (file) => `
                    <div class="selected-file">
                        <i class="ri-attachment-line"></i>
                        <span>${file.name}</span>
                        <small>(${this.formatFileSize(file.size)})</small>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  resetFileUpload() {
    if (this.fileInput) {
      this.fileInput.value = "";
    }

    const fileUploadContent = document.querySelector(".file-upload__content");
    if (fileUploadContent) {
      fileUploadContent.innerHTML = `
                <i class="ri-upload-cloud-line"></i>
                <span>Drop files here or click to browse</span>
                <small>PNG, JPG, PDF, DOC (Max 10MB each)</small>
            `;
    }
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  setupFormValidation() {
    // Real-time validation
    const inputs = this.supportForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          this.showFieldError(input, "This field is required");
        } else {
          this.clearFieldError(input);
        }
      });

      input.addEventListener("input", () => {
        this.clearFieldError(input);
      });
    });
  }
}

/*=============== INITIALIZE SUPPORT PAGE ===============*/
document.addEventListener("DOMContentLoaded", function () {
  // Initialize support page functionality
  new SupportPage();

  // Initialize AOS animations
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }

  // Add smooth scrolling for anchor links
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
});

// Export for external use
window.SupportPage = SupportPage;
