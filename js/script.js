/* ==========================================================================
   Nomad Design — Rachel Lee Portfolio
   Vanilla JS : Nav scroll / Mobile menu / Reveal / Portfolio slider
   ========================================================================== */
(function () {
    'use strict';

    /* ---------- 1. Fixed nav scroll shadow ---------- */
    const nav = document.getElementById('nav');
    if (nav) {
        const onScroll = () => {
            if (window.scrollY > 8) nav.classList.add('is-scrolled');
            else nav.classList.remove('is-scrolled');
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---------- 2. Mobile menu toggle ---------- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        const closeMenu = () => {
            navToggle.classList.remove('is-open');
            navMenu.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };
        navToggle.addEventListener('click', () => {
            const open = navToggle.classList.toggle('is-open');
            navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.style.overflow = open ? 'hidden' : '';
        });
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    /* ---------- 3. IntersectionObserver reveal animation ---------- */
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
    }

    /* ---------- 4. Portfolio Detail Sliders ---------- */
    document.querySelectorAll('.slider').forEach(slider => {
        const track = slider.querySelector('.slider__track');
        const slides = slider.querySelectorAll('.slider__slide');
        const prev = slider.querySelector('.slider__btn--prev');
        const next = slider.querySelector('.slider__btn--next');
        const dots = slider.querySelectorAll('.slider__dot');
        if (!track || slides.length === 0) return;

        let current = 0;
        const go = i => {
            current = Math.max(0, Math.min(slides.length - 1, i));
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.scrollTo({ left: current * slideWidth, behavior: 'smooth' });
            dots.forEach((d, idx) => d.classList.toggle('is-active', idx === current));
        };

        if (prev) prev.addEventListener('click', () => go(current - 1));
        if (next) next.addEventListener('click', () => go(current + 1));
        dots.forEach((d, idx) => d.addEventListener('click', () => go(idx)));

        let scrollTimer;
        track.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const slideWidth = slides[0].getBoundingClientRect().width;
                const idx = Math.round(track.scrollLeft / slideWidth);
                if (idx !== current) {
                    current = idx;
                    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
                }
            }, 80);
        }, { passive: true });
    });
})();
