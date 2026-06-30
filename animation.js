/**
 * Portfolio Animation Layer
 * Vanilla JS + CSS — No dependencies
 * Features: Scroll reveals, count-up stats, cursor glow, magnetic buttons, scroll progress
 */

// ============================================================================
// 1. SCROLL REVEAL SYSTEM
// ============================================================================
class ScrollReveal {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -6% 0px'
      }
    );
    this.revealedElements = new Set();
    this.init();
  }

  init() {
    const elements = document.querySelectorAll('[data-scroll]');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = `opacity 0.8s cubic-bezier(0.22, 0.61, 0.18, 1), 
                             transform 0.8s cubic-bezier(0.22, 0.61, 0.18, 1)`;
      
      // Apply per-element stagger via data-delay
      if (el.dataset.delay) {
        el.style.transitionDelay = `${el.dataset.delay}ms`;
      }
      
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.revealedElements.has(entry.target)) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        this.revealedElements.add(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// ============================================================================
// 2. COUNT-UP STAT NUMBERS
// ============================================================================
class CountUpNumbers {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.6
      }
    );
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    const elements = document.querySelectorAll('[data-count]');
    elements.forEach(el => this.observer.observe(el));
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
        this.animateCount(entry.target);
        this.animatedElements.add(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  animateCount(element) {
    const target = parseFloat(element.dataset.count);
    const isDecimal = element.dataset.count.includes('.');
    const hasPlus = element.textContent.includes('+');
    const hasSeparator = element.textContent.includes(',');
    
    const startTime = performance.now();
    const duration = 1500; // ms

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out: 1 - (1 - p)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = target * easeProgress;

      let formatted = isDecimal 
        ? current.toFixed(1) 
        : Math.floor(current);

      // Add thousands separator
      if (hasSeparator) {
        formatted = this.formatNumber(formatted);
      }

      // Add + suffix if original had it
      if (hasPlus) {
        formatted += '+';
      }

      element.textContent = formatted;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

// ============================================================================
// 3. CURSOR-FOLLOW GLOW (Hero Section)
// ============================================================================
class CursorFollowGlow {
  constructor() {
    this.hero = document.querySelector('[data-glow-hero]');
    if (!this.hero) return;

    // Create glow element
    this.glow = document.createElement('div');
    this.glow.classList.add('cursor-glow');
    this.hero.appendChild(this.glow);

    // Only enable on desktop (hover-capable devices)
    if (window.matchMedia('(hover: hover)').matches) {
      this.hero.addEventListener('pointermove', (e) => this.handlePointerMove(e));
      this.hero.addEventListener('pointerleave', () => this.resetGlow());
    }
  }

  handlePointerMove(e) {
    const rect = this.hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.glow.style.left = `${x}px`;
    this.glow.style.top = `${y}px`;
    this.glow.style.opacity = '1';
  }

  resetGlow() {
    this.glow.style.opacity = '0';
  }
}

// ============================================================================
// 4. MAGNETIC BUTTONS
// ============================================================================
class MagneticButton {
  constructor() {
    this.buttons = document.querySelectorAll('[data-magnetic]');
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.style.transition = 'transform 0.2s ease-out';
      
      btn.addEventListener('pointermove', (e) => this.handleMove(btn, e));
      btn.addEventListener('pointerleave', () => this.handleLeave(btn));
    });
  }

  handleMove(btn, e) {
    if (!window.matchMedia('(hover: hover)').matches) return; // Skip on touch

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const force = 1 - distance / maxDistance;
      const translateX = dx * force * 0.22;
      const translateY = dy * force * 0.3;

      btn.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  }

  handleLeave(btn) {
    btn.style.transform = 'translate(0, 0)';
  }
}

// ============================================================================
// 5. SCROLL PROGRESS BAR
// ============================================================================
class ScrollProgressBar {
  constructor() {
    this.progressBar = document.querySelector('[data-scroll-progress]');
    if (!this.progressBar) {
      this.createProgressBar();
    }
    this.init();
  }

  createProgressBar() {
    this.progressBar = document.createElement('div');
    this.progressBar.setAttribute('data-scroll-progress', '');
    this.progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: var(--accent, #d41f2a);
      width: 0%;
      z-index: 9999;
      transition: width 0.1s ease-out;
      will-change: width;
    `;
    document.body.insertBefore(this.progressBar, document.body.firstChild);
  }

  init() {
    window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
    this.updateProgress();
  }

  updateProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    this.progressBar.style.width = `${progress}%`;
  }
}

// ============================================================================
// 6. ACTIVE SECTION NAVIGATION
// ============================================================================
class ActiveSectionNav {
  constructor() {
    this.navLinks = document.querySelectorAll('[data-nav-link]');
    if (this.navLinks.length === 0) return;

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        rootMargin: '-45% 0px -50% 0px'
      }
    );
    this.init();
  }

  init() {
    // Get all sections that have corresponding nav links
    this.navLinks.forEach(link => {
      const sectionId = link.dataset.navLink;
      const section = document.getElementById(sectionId);
      if (section) {
        this.observer.observe(section);
      }
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        this.navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to matching link
        const activeLink = document.querySelector(
          `[data-nav-link="${entry.target.id}"]`
        );
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
}

// ============================================================================
// 7. AMBIENT CSS ANIMATIONS
// ============================================================================
class AmbientAnimations {
  constructor() {
    this.injectKeyframes();
  }

  injectKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
      /* Status dot pulse */
      @keyframes status-pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.6;
          transform: scale(1.1);
        }
      }

      /* Gentle float */
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-12px);
        }
      }

      /* Horizontal marquee (for logo strip) */
      @keyframes marquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      /* Text glow flicker (Kanye-inspired) */
      @keyframes glow-flicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
          text-shadow: 0 0 10px rgba(212, 31, 42, 0.8);
        }
        20%, 24%, 55% {
          text-shadow: 0 0 5px rgba(212, 31, 42, 0.4);
        }
      }

      /* Apply animations */
      .status-pulse {
        animation: status-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      .float-element {
        animation: float 4s ease-in-out infinite;
      }

      .marquee-track {
        animation: marquee 20s linear infinite;
      }

      .glow-flicker {
        animation: glow-flicker 1.5s ease-in-out infinite;
      }

      /* Cursor glow blob */
      .cursor-glow {
        position: absolute;
        width: 150px;
        height: 150px;
        background: radial-gradient(circle, rgba(212, 31, 42, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        filter: blur(40px);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease-out;
        transform: translate(-50%, -50%);
        will-change: left, top;
      }

      /* GPU optimization */
      [data-scroll],
      [data-magnetic],
      .cursor-glow {
        will-change: transform, opacity;
      }

      /* Respect prefers-reduced-motion */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ============================================================================
// 8. INITIALIZE ALL ANIMATIONS
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  new ScrollReveal();
  new CountUpNumbers();
  new CursorFollowGlow();
  new MagneticButton();
  new ScrollProgressBar();
  new ActiveSectionNav();
  new AmbientAnimations();

  console.log('✨ Portfolio animations initialized');
});

// ============================================================================
// 9. UTILITY: Check if element is in viewport
// ============================================================================
window.isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// ============================================================================
// 10. UTILITY: Smooth scroll to element
// ============================================================================
window.smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
