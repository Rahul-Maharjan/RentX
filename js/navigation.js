/*=============== MODERN NAVIGATION FUNCTIONALITY ===============*/

class ModernNavigation {
  constructor() {
    this.header = document.querySelector(".header");
    this.navToggle = document.querySelector(".nav__toggle");
    this.navMenu = document.querySelector(".nav__menu");
    this.navClose = document.querySelector(".nav__close");
    this.navLinks = document.querySelectorAll(".nav__link");
    this.lastScrollY = window.scrollY;

    this.init();
  }

  init() {
    // Mobile menu toggle
    this.setupMobileMenu();

    // Scroll effects
    this.setupScrollEffects();

    // Active section highlighting
    this.setupActiveSection();

    // Smooth scrolling
    this.setupSmoothScrolling();
  }

  setupMobileMenu() {
    // Open mobile menu
    this.navToggle?.addEventListener("click", () => {
      this.navMenu.classList.add("show");
      this.navToggle.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    // Close mobile menu
    this.navClose?.addEventListener("click", () => {
      this.closeMobileMenu();
    });

    // Close menu when clicking on a link
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !this.navMenu.contains(e.target) &&
        !this.navToggle.contains(e.target)
      ) {
        this.closeMobileMenu();
      }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMobileMenu();
      }
    });
  }

  closeMobileMenu() {
    this.navMenu.classList.remove("show");
    this.navToggle.classList.remove("active");
    document.body.style.overflow = "";
  }

  setupScrollEffects() {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Add scrolled class for header styling
      if (currentScrollY > 50) {
        this.header.classList.add("scrolled");
      } else {
        this.header.classList.remove("scrolled");
      }

      // Hide/show header on scroll (optional)
      if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
        this.header.style.transform = "translateY(-100%)";
      } else {
        this.header.style.transform = "translateY(0)";
      }

      this.lastScrollY = currentScrollY;
    });
  }

  setupActiveSection() {
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          // Remove active class from all links
          this.navLinks.forEach((link) => {
            link.classList.remove("active");
          });

          // Add active class to current section link
          const activeLink = document.querySelector(
            `.nav__link[data-section="${sectionId}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    });
  }

  setupSmoothScrolling() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const headerHeight = this.header.offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }
}

/*=============== INITIALIZE NAVIGATION ===============*/
document.addEventListener("DOMContentLoaded", function () {
  // Initialize modern navigation
  new ModernNavigation();

  // Initialize AOS if available
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }
});

// Export for external use
window.ModernNavigation = ModernNavigation;
