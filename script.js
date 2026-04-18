/* ╔══════════════════════════════════════════════════════╗
   ║         Ulatbansi – Interactions & Animations        ║
   ╚══════════════════════════════════════════════════════╝ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Scroll Reveal ────────────────────────────────── */
  const revealTargets = document.querySelectorAll(
    '.architect__container, .about__container, .product__container, ' +
    '.testimonials__heading, .testimonials__grid, ' +
    '.journey__container, .hero__text, .hero__images'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach(el => observer.observe(el));

  /* ─── Navbar scroll effect ─────────────────────────── */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      navbar.style.background = 'rgba(12, 12, 14, 0.88)';
    } else {
      navbar.style.background = 'rgba(12, 12, 14, 0.65)';
    }

    lastScroll = currentScroll;
  }, { passive: true });

  /* ─── Smooth anchor scrolling ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── Stat card counter animation ──────────────────── */
  const statCards = document.querySelectorAll('.stat-card__number');

  const animateCounter = (el) => {
    const text = el.textContent.trim();
    const hasK = text.includes('k');
    const hasPercent = text.includes('%');
    const hasPlus = text.includes('+');

    let raw = text.replace(/[k%+]/g, '');
    const target = parseFloat(raw);

    if (isNaN(target)) return;

    const duration = 1500;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      let current = eased * target;

      let display;
      if (hasK) {
        display = Math.round(current) + 'k';
      } else if (hasPercent) {
        display = Math.round(current) + '%';
      } else {
        display = Math.round(current) + '';
      }
      if (hasPlus) display += '+';

      el.textContent = display;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statCards.forEach(el => statObserver.observe(el));

  /* ─── Journey steps staggered reveal ───────────────── */
  const journeySteps = document.querySelectorAll('.journey__step');
  journeySteps.forEach((step, i) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px)';
    step.style.transition = `opacity 0.6s ${i * 0.2}s cubic-bezier(.4,0,.2,1), transform 0.6s ${i * 0.2}s cubic-bezier(.4,0,.2,1)`;
  });

  const journeyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const steps = entry.target.querySelectorAll('.journey__step');
          steps.forEach(step => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
          });
          journeyObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const journeyContainer = document.querySelector('.journey__steps');
  if (journeyContainer) journeyObserver.observe(journeyContainer);

});
