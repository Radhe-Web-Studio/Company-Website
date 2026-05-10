/* =========================================
   RADHE WEB STUDIOS — Scroll Animations JS
   Uses IntersectionObserver (no external libs)
   ========================================= */

(function () {
  'use strict';

  /* ── INTERSECTION OBSERVER FOR SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after reveal for performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all reveal elements
  const observeReveal = () => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
      .forEach(el => revealObserver.observe(el));
  };

  /* ── STAGGER CHILDREN ── */
  const staggerChildren = (parent, selector, baseDelay = 0, step = 0.1) => {
    if (!parent) return;
    parent.querySelectorAll(selector).forEach((child, i) => {
      child.classList.add('reveal');
      child.style.transitionDelay = `${baseDelay + i * step}s`;
      revealObserver.observe(child);
    });
  };

  /* ── APPLY REVEALS TO PAGE SECTIONS ── */
  const initReveal = () => {
    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
      el.classList.add('reveal');
    });

    // Service cards — stagger
    document.querySelectorAll('.services-grid .service-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });

    // Niche cards
    document.querySelectorAll('.niche-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.15}s`;
    });

    // Portfolio cards
    document.querySelectorAll('.portfolio-card').forEach((el, i) => {
      el.classList.add('reveal-scale');
      el.style.transitionDelay = `${i * 0.08}s`;
    });

    // Pricing cards
    document.querySelectorAll('.pricing-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.12}s`;
    });

    // Why items
    document.querySelectorAll('.why-item').forEach((el, i) => {
      el.classList.add('reveal-left');
      el.style.transitionDelay = `${i * 0.1}s`;
    });

    // Why visual
    const whyVisual = document.querySelector('.why-visual');
    if (whyVisual) whyVisual.classList.add('reveal-right');

    // Process steps
    document.querySelectorAll('.process-step').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.15}s`;
    });

    // Testimonials
    document.querySelectorAll('.testimonial-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.12}s`;
    });

    // FAQ items
    document.querySelectorAll('.faq-item').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.07}s`;
    });

    // Value cards
    document.querySelectorAll('.value-card').forEach((el, i) => {
      el.classList.add('reveal-scale');
      el.style.transitionDelay = `${i * 0.1}s`;
    });

    // Contact cards
    document.querySelectorAll('.contact-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.12}s`;
    });

    // About grid
    const aboutLeft = document.querySelector('.about-grid .about-img');
    const aboutRight = document.querySelector('.about-grid .about-content');
    if (aboutLeft) aboutLeft.classList.add('reveal-left');
    if (aboutRight) aboutRight.classList.add('reveal-right');

    // Generic content reveals
    document.querySelectorAll('.cta-banner .cta-title, .cta-banner .cta-subtitle, .cta-banner .cta-actions').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.15}s`;
    });

    // Hours cards
    document.querySelectorAll('.hours-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.1}s`;
    });

    // Services detail
    document.querySelectorAll('.service-detail-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.1}s`;
    });

    // Footer brand
    const footerBrand = document.querySelector('.footer-brand');
    if (footerBrand) footerBrand.classList.add('reveal');

    document.querySelectorAll('.footer-col').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${0.1 + i * 0.08}s`;
    });

    // Now observe everything
    observeReveal();
  };

  /* ── FLUTE DRAW ANIMATION ON SCROLL INTO VIEW ── */
  const fluteSection = document.querySelector('.hero-flute-wrap');
  if (fluteSection) {
    // Already animated on load in main.js
  }

  /* ── PARALLAX BLOBS ── */
  const blobs = document.querySelectorAll('.blob');
  if (blobs.length && window.innerWidth > 768) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          blobs.forEach((blob, i) => {
            const speed = 0.08 + i * 0.04;
            const dir = i % 2 === 0 ? 1 : -1;
            blob.style.transform = `translateY(${dir * scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── TYPING CURSOR EFFECT (optional hero badge) ── */
  const typingEl = document.querySelector('[data-typing]');
  if (typingEl) {
    const words = typingEl.dataset.typing.split('|');
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const word = words[wordIndex];
      if (!deleting) {
        typingEl.textContent = word.slice(0, ++charIndex);
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typingEl.textContent = word.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 60 : 100);
    };

    setTimeout(type, 1000);
  }

  /* ── SMOOTH IMAGE LAZY LOAD ── */
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.classList.add('img-loaded');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
  }

  /* ── GOLD CURSOR TRAIL (desktop only) ── */
  if (window.innerWidth > 992 && window.matchMedia('(pointer: fine)').matches) {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed; width: 8px; height: 8px;
      border-radius: 50%; pointer-events: none; z-index: 9999;
      background: rgba(201,168,76,0.5);
      transition: transform 0.1s ease, opacity 0.3s ease;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(trail);

    document.addEventListener('mousemove', e => {
      trail.style.left = e.clientX - 4 + 'px';
      trail.style.top  = e.clientY - 4 + 'px';
      trail.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      trail.style.opacity = '0';
    });
  }

  /* ── INIT ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }

})();
