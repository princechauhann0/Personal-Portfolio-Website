(function appInit() {
  const log = (...args) => console.log('%cSR:', 'color: #2b8a3e; font-weight:700', ...args);

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }

  window.scrollToSection = scrollToSection;

  function setFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
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
      log('Typed.js initialized');
    } else {
      const el = document.getElementById('element');
      if (el && !el.textContent) el.textContent = 'Prince Chauhan';
      log('Typed.js not found — fallback text set');
    }
  }

  function initHeroParallax() {
    const onScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const heroContent = document.querySelector('.heroInner');
      if (!heroContent) return;
      if (scrollY < window.innerHeight) {
        window.requestAnimationFrame(() => {
          heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
          heroContent.style.opacity = String(Math.max(0, 1 - scrollY / window.innerHeight));
        });
      } else {
        heroContent.style.transform = '';
        heroContent.style.opacity = '';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    log('Hero parallax attached');
  }

  function enableImageLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      document.querySelectorAll('img').forEach(img => {
        if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
      });
      log('Native image lazy-loading enabled');
    } else {
      log('Native lazy-loading not supported (no-op)');
    }
  }

  let srObserver = null;
  function initScrollReveal() {
    try { if (srObserver && typeof srObserver.disconnect === 'function') srObserver.disconnect(); } catch (e) {}
    const options = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
    srObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add('revealed');
        } else {
          el.classList.remove('revealed');
        }
      });
    }, options);
    const revealTargets = document.querySelectorAll('.projectCard, .skillItem, .statItem');
    if (!revealTargets || revealTargets.length === 0) {
      log('No reveal targets found (selector: .projectCard, .skillItem, .statItem)');
    } else {
      revealTargets.forEach(el => {
        if (!el.classList.contains('preReveal')) el.classList.add('preReveal');
        srObserver.observe(el);
      });
      log('ScrollReveal observing', revealTargets.length, 'elements');
    }
  }

  function monitorKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
    });
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }

  function doInit() {
    setFooterYear();
    initTypedHero();
    initHeroParallax();
    enableImageLazyLoading();
    initScrollReveal();
    monitorKeyboardNav();
    log('appInit complete');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', doInit);
  } else {
    doInit();
  }

  window.__debugSR = {
    refresh: () => {
      log('refresh() called — re-initializing scroll reveal');
      initScrollReveal();
    },
    disconnect: () => {
      if (srObserver) {
        srObserver.disconnect();
        log('observer disconnected');
      } else {
        log('no observer to disconnect');
      }
    }
  };
})();
window.scrollToSection = scrollToSection;
