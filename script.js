/* =============================================
   Tamara Palmer Portfolio — Main Script
   GSAP ScrollTrigger + Typed.js + UI utils
   ============================================= */

// ── Year ────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Cursor Glow ─────────────────────────────
const glow = document.querySelector('.cursor-glow');
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ── Navbar scroll class ──────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── GSAP Animations ──────────────────────────
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // HERO — index.html only
  if (document.getElementById('hero-text')) {

    gsap.from('.hero-img', {
      scale: 0.85, opacity: 0, duration: 0.9, ease: 'back.out(1.4)'
    });

    gsap.timeline()
      .from('.hero-label',   { y: 12, opacity: 0, duration: 0.45, ease: 'power2.out' })
      .from('.hero-headline',{ y: 28, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.2')
      .from('.hero-tagline', { y: 18, opacity: 0, duration: 0.6,  ease: 'power2.out' }, '-=0.35')
      .from('.metric-card',  { y: 22, opacity: 0, duration: 0.5,  stagger: 0.08, ease: 'power3.out' }, '-=0.3')
      .from('.brand-badge',  { scale: 0.82, opacity: 0, duration: 0.35, stagger: 0.06, ease: 'back.out(1.4)' }, '-=0.2')
      .from('.hero-animated .btn',            { y: 14, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, '-=0.1')
      .from('.hero-animated .d-flex.gap-4 a', { opacity: 0, duration: 0.35, stagger: 0.08, ease: 'power1.out' }, '-=0.1');

    // Metric count-ups (fire after delay)
    document.querySelectorAll('.metric-number').forEach(el => {
      const raw    = el.textContent.replace(/[^0-9.]/g, '');
      const target = parseFloat(raw);
      if (!target) return;
      const suffix = el.textContent.replace(/[0-9.,]/g, '');
      gsap.fromTo({ val: 0 }, { val: target }, {
        duration: 1.6, ease: 'power2.out', delay: 1.3,
        onUpdate: function () {
          const v = this.targets()[0].val;
          el.textContent = (target >= 1000 ? Math.round(v).toLocaleString() : v.toFixed(target % 1 !== 0 ? 1 : 0)) + suffix;
        }
      });
    });
  }

  // ── Generic scroll-reveal (all pages) ────────
  gsap.utils.toArray('.scroll-reveal').forEach(el => {
    gsap.fromTo(el, { y: 24, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Project cards stagger
  gsap.utils.toArray('.project-card').forEach((el, i) => {
    gsap.from(el, {
      y: 50, opacity: 0, duration: 0.75, delay: (i % 2) * 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Skills cards stagger
  gsap.utils.toArray('.col-md-4 .card').forEach((el, i) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Speaking cards
  gsap.utils.toArray('.speaking-card').forEach((el, i) => {
    gsap.from(el, {
      y: 30, opacity: 0, duration: 0.6, delay: i * 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Article / about cards
  gsap.utils.toArray('.article-card').forEach(el => {
    gsap.from(el, {
      x: -24, opacity: 0, duration: 0.65, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Timeline
  gsap.utils.toArray('.timeline-item, .timeline-card').forEach((el, i) => {
    gsap.from(el, {
      x: i % 2 === 0 ? -28 : 28, opacity: 0, duration: 0.65, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Stat count-ups (about.html — data-target)
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    if (!target) return;
    const isDecimal = (el.dataset.target || '').includes('.');
    gsap.fromTo({ val: 0 }, { val: target }, {
      duration: 1.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      onUpdate: function () {
        const v = this.targets()[0].val;
        el.textContent = (isDecimal ? v.toFixed(1) : target >= 1000 ? Math.round(v).toLocaleString() : Math.floor(v)) + suffix;
      }
    });
  });

  // Section headings fade
  gsap.utils.toArray('h1:not(.hero-headline), h2').forEach(el => {
    if (el.closest('#hero')) return;
    gsap.from(el, {
      y: 28, opacity: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
}

// ── Typed.js (index.html only) ──────────────
if (typeof Typed !== 'undefined' && document.getElementById('typed-role')) {
  new Typed('#typed-role', {
    strings: [
      'Associate DevOps Engineer',
      'Full-Stack Developer&nbsp;',
      'C#/.NET &amp; React&nbsp;',
      'Tech Speaker &amp; Chase Scholar'
    ],
    typeSpeed: 48,
    backSpeed: 28,
    backDelay: 2400,
    startDelay: 700,
    loop: true,
    smartBackspace: true
  });
}

// ── Magnetic Buttons ─────────────────────────
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ── Formspree AJAX (contact.html) ───────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      return;
    }
    const btn = contactForm.querySelector('[type="submit"]');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending…';
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        contactForm.innerHTML = `
          <div class="text-center py-5">
            <div style="font-size:3rem;margin-bottom:1rem;">✅</div>
            <h5 class="text-white fw-bold mb-2">Message sent!</h5>
            <p class="text-muted-2">I'll get back to you within 24 hours.</p>
          </div>`;
      } else {
        btn.disabled = false;
        btn.innerHTML = orig;
        alert('Something went wrong. Please email TamaraPalmer013@yahoo.com directly.');
      }
    } catch {
      btn.disabled = false;
      btn.innerHTML = orig;
      alert('Network error. Please email TamaraPalmer013@yahoo.com directly.');
    }
  });
}

// ── Smooth anchor scrolling ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = (navbar ? navbar.offsetHeight : 72) + 12;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});
