function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

(function setFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();

(function activateScrollReveal() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When it comes into view → animate
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
            } 
            // When it leaves viewport → reset so animation works again
            else {
                entry.target.classList.remove("revealed");
            }
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        const revealTargets = document.querySelectorAll('.projectCard, .skillItem, .statItem');
        revealTargets.forEach(el => {
            el.classList.add("preReveal");
            observer.observe(el);
        });
    });
})();

(function heroParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const heroContent = document.querySelector('.heroInner');
        if (!heroContent) return;
        if (scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
            heroContent.style.opacity = Math.max(0, 1 - scrollY / window.innerHeight);
        } else {
            heroContent.style.transform = '';
            heroContent.style.opacity = '';
        }
    }, { passive: true });
})();

(function navActivePlaceholder() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY > top && scrollY <= top + height) {}
        });
    });
})();

(function enableImageLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    }
})();

(function activateScrollReveal() {
    const options = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                // REMOVE THIS TO FIX HOVER:
                // observer.unobserve(entry.target);
            }
        });
    }, options);

    document.addEventListener("DOMContentLoaded", () => {
        const revealTargets = document.querySelectorAll(
            ".projectCard, .skillItem, .statItem"
        );

        revealTargets.forEach(el => {
            el.classList.add("preReveal");
            observer.observe(el);
        });
    });
})();

(function monitorKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {}
        if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
    });
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
})();

console.log('%c👋 Welcome to my portfolio!', 'font-size:20px; font-weight:700;');
console.log("%cInterested in the code? Check out the source on GitHub!", "font-size:14px;");

(function initTypedHero() {
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
        if (el) el.textContent = 'Prince Chauhan';
    }
})();
