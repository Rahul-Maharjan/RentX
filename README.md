# 🚗 RentX - Modern Car Rental Website

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![AOS](https://img.shields.io/badge/AOS-Animations-blue?style=for-the-badge)](https://michalsnik.github.io/aos/)

> **Your trusted partner for premium car rentals. Experience the road like never before.**

A modern, responsive car rental website built with vanilla HTML, CSS, and JavaScript featuring glass morphism design, smooth animations, and comprehensive functionality.

## 🌟 Features

### ✨ Modern UI/UX

- **Glass Morphism Design** - Contemporary aesthetic with translucent elements
- **Smooth Animations** - AOS (Animate On Scroll) integration with custom transitions
- **Responsive Layout** - Mobile-first design that works on all devices
- **Dark Theme** - Modern dark color scheme with gradient accents

### 🚙 Core Functionality

- **Car Fleet Display** - Interactive car cards with detailed specifications
- **Advanced Filtering** - Filter cars by brand, type, and price range
- **Booking Modal** - Comprehensive booking form with date selection and calculations
- **Car Details Modal** - Detailed view with specifications and image gallery
- **Testimonials Carousel** - Customer reviews with automatic sliding
- **Support System** - Dedicated support page with contact forms

### 📱 User Experience

- **Modern Navigation** - Glass effect navigation with smooth scrolling
- **Active Section Highlighting** - Dynamic navigation state management
- **Mobile Menu** - Hamburger menu with smooth animations
- **Search Functionality** - Live search in FAQ section
- **Form Validation** - Real-time validation with error messaging

## 🛠️ Technologies Used

### Frontend Stack

- **HTML5** - Semantic markup with modern elements
- **CSS3** - Advanced features including:
  - CSS Grid & Flexbox
  - Custom Properties (CSS Variables)
  - Backdrop Filters (Glass effect)
  - CSS Animations & Transitions
  - Media Queries for responsiveness
- **Vanilla JavaScript** - ES6+ features including:
  - Classes and Modules
  - Event Handling
  - DOM Manipulation
  - Async/Await
  - Form Validation

### Libraries & APIs

- **AOS (Animate On Scroll)** - Scroll-triggered animations
- **Remix Icons** - Modern icon set
- **Google Fonts** - Inter font family
- **File Upload API** - Drag & drop file handling

## 📁 Project Structure

```
RentX/
├── index.html              # Main homepage
├── support.html            # Support & contact page
├── README.md              # Project documentation
│
├── css/
│   ├── style.css          # Main styles & components
│   ├── support.css        # Support page specific styles
│   └── animation.css      # Custom animations
│
├── js/
│   ├── navigation.js      # Modern navigation functionality
│   ├── cars.js           # Car filtering & modal system
│   ├── testimonials.js   # Testimonials carousel
│   ├── support.js        # Support page functionality
│   └── main.js           # Global utilities
│
└── images/
    ├── hero-car.png      # Hero section car image
    ├── audi.png         # Car brand logos
    ├── bmw.png
    ├── tesla.png
    ├── toyota.png
    ├── ferrari.png
    └── mercedes.webp
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for file uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/rentx.git
   cd rentx
   ```

2. **Open in browser**

   ```bash
   # Option 1: Direct file opening
   open index.html

   # Option 2: Local server (recommended)
   python -m http.server 3000
   # Then visit http://localhost:3000
   ```

3. **Or use Live Server extension in VS Code**
   - Install Live Server extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

## 📋 Features Breakdown

### 🏠 Homepage Sections

#### Hero Section

- **Modern Hero Design** - Floating elements with glass morphism
- **Call-to-Action** - Primary booking button with hover effects
- **Animated Elements** - Staggered animations on scroll

#### How It Works

- **Step-by-step Process** - Visual guide with icons
- **Interactive Cards** - Hover effects and animations

#### Car Fleet

- **Dynamic Grid Layout** - Responsive car card system
- **Advanced Filtering** - Filter by:
  - Brand (All, Audi, BMW, Tesla, Toyota, Ferrari, Mercedes)
  - Car Type (All, Sedan, SUV, Sports, Luxury)
  - Price Range (All, Under $100, $100-200, Over $200)
- **Real-time Updates** - Instant filtering without page reload

#### Testimonials

- **Automatic Carousel** - Auto-sliding testimonials
- **Modern Card Design** - Customer photos and ratings
- **Smooth Transitions** - CSS-based animations

### 🎯 Interactive Modals

#### Car Details Modal

- **Comprehensive Information** - Specifications, features, pricing
- **Image Gallery** - Multiple car images
- **Booking Integration** - Direct booking from details view

#### Booking Modal

- **Smart Calculations** - Automatic price computation
- **Date Validation** - Prevents past date selection
- **Form Validation** - Real-time error checking
- **Responsive Design** - Works on all screen sizes

### 🆘 Support Page

#### Contact Forms

- **Tabbed Interface** - Three form types:
  - General Query
  - Feedback
  - Technical Issue
- **File Upload** - Drag & drop support with validation
- **Form Validation** - Real-time error checking
- **Success/Error Messages** - User feedback system

#### FAQ Section

- **Collapsible Questions** - Smooth accordion animation
- **Search Functionality** - Live search with highlighting
- **Organized Categories** - Grouped by topic

#### Quick Help

- **Action Cards** - Direct access to help options
- **Contact Information** - Multiple contact methods
- **Live Chat Integration** - Ready for chat widget

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-color: #3B82F6      /* Blue */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

/* Background Colors */
--body-color: #0F172A        /* Dark Blue */
--card-color: #1E293B        /* Dark Card */
--glass-bg: rgba(255, 255, 255, 0.05)  /* Glass Effect */

/* Text Colors */
--title-color: #F8FAFC       /* Light Text */
--text-color: #CBD5E1        /* Regular Text */
--text-color-light: #94A3B8  /* Muted Text */
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive Scaling**: Fluid typography with clamp()

### Spacing System

- **Base Unit**: 0.5rem (8px)
- **Scale**: 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem, 8rem

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
@media screen and (min-width: 568px) {
  /* Small tablets */
}
@media screen and (min-width: 768px) {
  /* Tablets */
}
@media screen and (min-width: 1024px) {
  /* Small laptops */
}
@media screen and (min-width: 1152px) {
  /* Desktop */
}
@media screen and (min-width: 1400px) {
  /* Large screens */
}
```

### Mobile Features

- **Touch-Friendly** - Optimized button sizes and spacing
- **Swipe Gestures** - Carousel navigation on mobile
- **Collapsible Menu** - Hamburger navigation with smooth animations
- **Optimized Images** - Responsive images with proper sizing

## ⚡ Performance Optimizations

### Loading Performance

- **Optimized Images** - Compressed images with proper formats
- **CSS Optimization** - Minified styles and efficient selectors
- **JavaScript Optimization** - Event delegation and efficient DOM queries
- **Font Loading** - Optimized Google Fonts loading

### Runtime Performance

- **Smooth Animations** - Hardware-accelerated CSS animations
- **Event Optimization** - Throttled scroll events
- **Memory Management** - Proper event listener cleanup
- **Lazy Loading** - AOS integration for performance

## 🔧 Customization

### Adding New Cars

1. Add car data to `js/cars.js`:

```javascript
{
  id: 'new-car',
  name: 'Car Name',
  brand: 'Brand',
  type: 'Type',
  price: 150,
  image: 'images/car.png',
  // ... other properties
}
```

2. Add car image to `images/` directory

### Modifying Styles

- **CSS Variables** - Modify colors in `:root` selector
- **Component Styles** - Each component has its own section
- **Responsive Design** - Update media queries as needed

### Adding New Sections

1. Add HTML structure
2. Create corresponding CSS styles
3. Add JavaScript functionality if needed
4. Update navigation links

## 🧪 Testing

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Device Testing

- ✅ Mobile (320px - 768px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (1024px+)
- ✅ Large Screens (1400px+)

### Functionality Testing

- ✅ Navigation and scrolling
- ✅ Modal interactions
- ✅ Form validation
- ✅ Filtering system
- ✅ Carousel functionality

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Development Guidelines

- Follow existing code style and structure
- Add comments for complex functionality
- Test on multiple browsers and devices
- Update documentation for new features


## 👨‍💻 Author

**Rahul Maharjan**

- GitHub: [Rahul Maharjan](https://github.com/Rahul-Maharjan)
- LinkedIn: [Profile](https://www.linkedin.com/in/rahul-maharjan-a57256207/)
- Email: rahulmaharjan252@gmail.com

## 🙏 Acknowledgments

- **AOS Library** - For smooth scroll animations
- **Remix Icons** - For the beautiful icon set
- **Google Fonts** - For the Inter font family
- **Inspiration** - Modern car rental websites and design trends

## 🔮 Future Enhancements

- [ ] **Backend Integration** - Connect to real booking system
- [ ] **Payment Gateway** - Integrate payment processing
- [ ] **User Authentication** - Login/signup functionality
- [ ] **Booking Management** - Dashboard for managing bookings
- [ ] **Real-time Chat** - Live customer support
- [ ] **Multi-language** - Internationalization support
- [ ] **PWA Features** - Progressive Web App capabilities
- [ ] **Dark/Light Toggle** - Theme switching option

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[Report Bug](https://github.com/yourusername/rentx/issues) • [Request Feature](https://github.com/yourusername/rentx/issues) • [Documentation](https://github.com/yourusername/rentx/wiki)

</div>
