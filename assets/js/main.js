/* =========================================
   RADHE WEB STUDIOS — Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PAGE LOADER ── */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
      }, 600);
    });
    // Fallback
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 2500);
  }

  /* ── NAVBAR ── */
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── ACTIVE NAV LINK ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── SMOOTH SCROLL (for anchor links) ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 16 : 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── SCROLL-TO-TOP ── */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(open => {
        open.classList.remove('open');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ── PORTFOLIO FILTER ── */
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      document.querySelectorAll('.portfolio-card[data-category]').forEach(card => {
        const show = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ── ANIMATED COUNTER ── */
  const animateCounter = (el, target, duration = 2000) => {
    const start = performance.now();
    const startVal = 0;

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(startVal + eased * (target - startVal));
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };

    requestAnimationFrame(step);
  };

  // Observe counters
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseInt(entry.target.dataset.count, 10);
          animateCounter(entry.target, target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* ── MUSIC NOTES GENERATOR ── */
  const notesContainer = document.querySelector('.music-notes');
  if (notesContainer) {
    const symbols = ['♪', '♫', '♬', '♩'];
    const createNote = () => {
      const note = document.createElement('span');
      note.classList.add('note');
      note.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      note.style.left   = `${10 + Math.random() * 80}%`;
      note.style.bottom = `${10 + Math.random() * 40}%`;
      note.style.fontSize = `${1 + Math.random() * 1.2}rem`;
      note.style.animationDuration = `${5 + Math.random() * 4}s`;
      note.style.animationDelay    = `${Math.random() * 3}s`;
      note.style.animationName = Math.random() > 0.5 ? 'noteFloat' : 'noteFloat2';
      notesContainer.appendChild(note);

      note.addEventListener('animationend', () => note.remove());
    };

    // Spawn notes periodically
    setInterval(createNote, 1200);
    // Initial burst
    for (let i = 0; i < 4; i++) setTimeout(createNote, i * 300);
  }

  /* ── HERO PARALLAX ── */
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
        heroContent.style.opacity = Math.max(0, 1 - scrolled / 600);
      }
    }, { passive: true });
  }

  /* ── NAVBAR LOGO FLUTE SHIMMER ── */
  const logoImg = document.querySelector('.navbar-logo .logo-img');
  if (logoImg) {
    logoImg.addEventListener('mouseenter', () => {
      logoImg.style.filter = 'drop-shadow(0 0 12px rgba(201,168,76,0.6))';
    });
    logoImg.addEventListener('mouseleave', () => {
      logoImg.style.filter = '';
    });
  }

});

/* ── FLUTE SVG PATH ANIMATION (hero) ── */
window.addEventListener('load', () => {
  const flutePath = document.querySelector('.flute-path');
  if (flutePath) {
    const length = flutePath.getTotalLength?.() || 1200;
    flutePath.style.strokeDasharray  = length;
    flutePath.style.strokeDashoffset = length;
    flutePath.style.animation = `fluteDraw 3s ease forwards 1s, fluteGlow 3s ease-in-out infinite 4s`;
  }

  // Animate flute holes
  document.querySelectorAll('.flute-hole').forEach((hole, i) => {
    hole.style.animation = `holeAppear 0.4s ease forwards ${2 + i * 0.2}s`;
    hole.style.opacity = '0';
  });
});
