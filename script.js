// Rotating text animation
const rotatingTexts = [
  "full-stack applications",
  "data pipelines and automation",
  "REST APIs with C# and .NET",
  "React-powered interfaces",
  "DevOps tooling and scripting"
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

// Form validation and submission
(function() {
  'use strict';
  
  // Bootstrap form validation
  const forms = document.querySelectorAll('.needs-validation');
  
  Array.from(forms).forEach(function(form) {
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      
      // If this is the contact form, handle with AJAX
      if (form.id === 'contact-form') {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
        
        try {
          const formData = new FormData(form);
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            // Success - show success message
            showFormMessage('success', 'Thank you for your message! I\'ll get back to you within 24 hours.');
            form.reset();
            form.classList.remove('was-validated');
          } else {
            // Error - show error message
            showFormMessage('error', 'Oops! There was a problem sending your message. Please try again or email me directly.');
          }
        } catch (error) {
          // Network error
          showFormMessage('error', 'Connection error. Please check your internet and try again.');
        } finally {
          // Reset button
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      } else {
        // For other forms, just validate
        form.classList.add('was-validated');
      }
    }, false);
  });
  
  // Helper function to show form messages
  function showFormMessage(type, message) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
      existingAlert.remove();
    }
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show form-alert mt-3`;
    alertDiv.innerHTML = `
      <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insert after the form
    const form = document.getElementById('contact-form');
    form.parentNode.appendChild(alertDiv);
    
    // Auto-dismiss success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 150);
      }, 5000);
    }
  }
})();

// ===== CURSOR GLOW (non-index pages) =====
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// ===== COUNT-UP ANIMATION (data-target, for non-index pages) =====
function animateCountUp(el) {
  const raw = el.dataset.target;
  if (!raw) return;
  const suffix = el.dataset.suffix || '';
  const target = parseFloat(raw);
  const isDecimal = raw.includes('.');
  const duration = 1600;
  const start = performance.now();
  function step(ts) {
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    let display = target >= 1000 ? Math.floor(value).toLocaleString()
                : isDecimal ? value.toFixed(1)
                : Math.floor(value).toString();
    el.textContent = display + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const countUpObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCountUp(e.target); countUpObs.unobserve(e.target); } });
}, { threshold: 0.6 });
document.querySelectorAll('[data-target]').forEach(el => countUpObs.observe(el));

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.22}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('[data-category]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    projectCards.forEach(card => { card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none'; });
  });
});

// ===== ACTIVE NAVIGATION HIGHLIGHTING AND NAVBAR SCROLL EFFECT =====
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
