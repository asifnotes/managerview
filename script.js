// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger-menu');
  const navList = document.querySelector('.nav-list');

  if (hamburger && navList) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navList.classList.toggle('active');
    });

    // Close nav when a link is clicked
    document.querySelectorAll('.nav-list li a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', (event) => {
      if (!navList.contains(event.target) && !hamburger.contains(event.target)) {
        navList.classList.remove('active');
      }
    });
  }

  // Testimonial Slider Functionality
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  let currentTestimonial = 0;

  if (testimonialCards.length > 0) {
    // Show the first testimonial initially
    testimonialCards[currentTestimonial].style.display = 'block';
    if (dots.length > 0) {
      dots[currentTestimonial].classList.add('active');
    }

    // Function to show specific testimonial
    function showTestimonial(index) {
      // Hide all testimonials
      testimonialCards.forEach(card => {
        card.style.display = 'none';
      });

      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });

      // Show selected testimonial
      if (testimonialCards[index]) {
        testimonialCards[index].style.display = 'block';
      }

      // Add active class to selected dot
      if (dots[index]) {
        dots[index].classList.add('active');
      }

      currentTestimonial = index;
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
      });
    });

    // Auto-rotate testimonials every 5 seconds
    if (testimonialCards.length > 1) {
      setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
      }, 5000);
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add scroll event listener for scroll arrow
  const scrollArrow = document.querySelector('.scroll-arrow');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }

  // Enhanced keyboard accessibility
  document.addEventListener('keydown', (e) => {
    // Escape key closes navigation menu
    if (e.key === 'Escape' && navList && navList.classList.contains('active')) {
      navList.classList.remove('active');
      hamburger?.focus();
    }

    // Enter or Space key on hamburger menu
    if ((e.key === 'Enter' || e.key === ' ') && e.target === hamburger) {
      e.preventDefault();
      hamburger.click();
    }
  });

  // Focus management for accessibility
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  
  // Trap focus in navigation menu when open
  if (navList) {
    const firstFocusableElement = navList.querySelector(focusableElements);
    const focusableContent = navList.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
      if (!navList.classList.contains('active')) return;

      const isTabPressed = e.key === 'Tab';
      if (!isTabPressed) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement?.focus();
          e.preventDefault();
        }
      }
    });
  }

  // Performance optimization: Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Form validation helper (if forms exist)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          field.setAttribute('aria-invalid', 'true');
        } else {
          field.classList.remove('error');
          field.setAttribute('aria-invalid', 'false');
        }
      });

      if (!isValid) {
        e.preventDefault();
        const firstError = form.querySelector('.error');
        firstError?.focus();
      }
    });
  });
});