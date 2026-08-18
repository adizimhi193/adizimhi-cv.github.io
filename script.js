// =========================================================
// Adi Zimhi — portfolio interactions
// 1) Scroll-triggered reveal (async, only fires as elements enter view)
// 2) EN / HE language toggle with RTL support
// 3) Mobile nav
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .skill-card, .pipeline');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // slight async stagger so items don't all pop at once
        setTimeout(() => entry.target.classList.add('in-view'), i * 40);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => io.observe(el));

  /* ---------- pipeline fill bar ---------- */
  const pipeline = document.getElementById('pipeline');
  const fill = document.getElementById('pipelineFill');
  if (pipeline && fill) {
    const pio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fill.style.width = '100%';
          pio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    pio.observe(pipeline);
  }

  /* ---------- 2. Language toggle ---------- */
  const langToggle = document.getElementById('langToggle');
  const htmlEl = document.documentElement;
  let currentLang = 'en';

  function applyLang(lang) {
    currentLang = lang;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-en]').forEach(el => {
      const val = el.getAttribute(lang === 'he' ? 'data-he' : 'data-en');
      if (val !== null) el.innerHTML = val;
    });

    langToggle.querySelector('span').textContent = lang === 'he' ? 'EN' : 'HE';
    document.title = lang === 'he'
      ? 'עדי זימחי — מהנדס בדיקות ואוטומציה'
      : 'Adi Zimhi — QA Automation Engineer';
  }

  langToggle.addEventListener('click', () => {
    applyLang(currentLang === 'en' ? 'he' : 'en');
  });

  /* ---------- 3. Mobile nav ---------- */
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
});
