(function () {
  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }

  function setFooterYear() {
    const y = document.getElementById('current-year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function initTypedHero() {
    if (typeof Typed !== 'undefined') {
      new Typed('#element', {
        strings: ['Prince Chauhan'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1200,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });
    } else {
      const el = document.getElementById('element');
      if (el && !el.textContent) el.textContent = 'Prince Chauhan';
    }
  }

  function initHeroParallax() {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      const h = document.querySelector('.heroInner');
      if (!h) return;
      if (y < window.innerHeight) {
        requestAnimationFrame(() => {
          h.style.transform = `translateY(${y * 0.5}px)`;
          h.style.opacity = String(Math.max(0, 1 - y / window.innerHeight));
        });
      } else {
        h.style.transform = '';
        h.style.opacity = '';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function enableLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      document.querySelectorAll('img').forEach(img => {
        if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
      });
    }
  }

  let srObserver = null;
  function initScrollReveal() {
    if (srObserver) srObserver.disconnect();

    srObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) el.classList.add('revealed');
        else el.classList.remove('revealed');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    const targets = document.querySelectorAll('.projectCard, .skillItem, .statItem');
    targets.forEach(el => {
      el.classList.add('preReveal');
      srObserver.observe(el);
    });
  }

  function monitorKeyboardNav() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
    });
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }

  function init() {
    setFooterYear();
    initTypedHero();
    initHeroParallax();
    enableLazyLoading();
    initScrollReveal();
    monitorKeyboardNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.scrollToSection = scrollToSection;
})();
