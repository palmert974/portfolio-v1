// Rotating text animation
const rotatingTexts = [
  "responsive web applications",
  "data-driven solutions",
  "user-focused interfaces",
  "full-stack applications",
  "innovative digital experiences"
];

let currentIndex = 0;
const rotatingElement = document.getElementById('rotating-text');

if (rotatingElement) {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % rotatingTexts.length;
    rotatingElement.style.opacity = '0';
    
    setTimeout(() => {
      rotatingElement.textContent = rotatingTexts[currentIndex];
      rotatingElement.style.opacity = '1';
    }, 300);
  }, 3000);
}

// Smooth scroll for anchor links - Fixed version
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        // Calculate offset for sticky navbar
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

// Add scroll-reveal class to elements you want to animate on scroll
document.addEventListener('DOMContentLoaded', () => {
// Add scroll reveal to cards
  document.querySelectorAll('.card').forEach(card => {
    card.classList.add('scroll-reveal');
    observer.observe(card);
  });
  
  // Backward-compat: previous about section structure
  document.querySelectorAll('#about .row.g-4 > div').forEach(item => {
    item.classList.add('scroll-reveal');
    observer.observe(item);
  });

  // Observe any element explicitly marked for reveal
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });
});

// Add transition styles for rotating text
if (rotatingElement) {
  rotatingElement.style.transition = 'opacity 0.3s ease';
}

// Add hover effect for social links
document.querySelectorAll('a[title]').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.2)';
    this.style.transition = 'transform 0.2s ease';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// Form validation
(function() {
  'use strict';
  
  // Bootstrap form validation
  const forms = document.querySelectorAll('.needs-validation');
  
  Array.from(forms).forEach(function(form) {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      form.classList.add('was-validated');
    }, false);
  });
})();

// Active navigation highlighting and navbar scroll effect
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  // Navbar background on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Active section highlighting
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});
