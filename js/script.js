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

    /* ---------- 4a. pf-tab active state from current URL ---------- */
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.pf-tab').forEach(tab => {
        const tabFile = tab.getAttribute('href').split('/').pop();
        if (tabFile === currentFile) tab.classList.add('is-active');
    });

    /* ---------- 4. pf-tabs scroll arrows ---------- */
    const pfTabsInner = document.getElementById('pfTabs');
    const tabBtnPrev = document.querySelector('.pf-tabs__btn--prev');
    const tabBtnNext = document.querySelector('.pf-tabs__btn--next');
    if (pfTabsInner && tabBtnPrev && tabBtnNext) {
        const scrollAmt = 120;
        tabBtnPrev.addEventListener('click', () => pfTabsInner.scrollBy({ left: -scrollAmt, behavior: 'smooth' }));
        tabBtnNext.addEventListener('click', () => pfTabsInner.scrollBy({ left: scrollAmt, behavior: 'smooth' }));
    }

    /* ---------- 4b. Stat count-up (.case-stat__num[data-count]) ---------- */
    const statNums = document.querySelectorAll('.case-stat__num[data-count]');
    if (statNums.length) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const showFinal = el => { el.textContent = el.dataset.count + (el.dataset.suffix || ''); };
        const countUp = el => {
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            const dur = 1200;
            const t0 = performance.now();
            const tick = now => {
                const p = Math.min((now - t0) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased) + suffix;
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };
        if (reduceMotion || !('IntersectionObserver' in window)) {
            statNums.forEach(showFinal);
        } else {
            const statIo = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statIo.unobserve(entry.target);
                        countUp(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            statNums.forEach(el => statIo.observe(el));
        }
    }

    /* ---------- 4c. Pause other videos when one starts playing ---------- */
    const pageVideos = document.querySelectorAll('video');
    if (pageVideos.length > 1) {
        pageVideos.forEach(v => {
            v.addEventListener('play', () => {
                pageVideos.forEach(other => { if (other !== v) other.pause(); });
            });
        });
    }

    /* ---------- 5. Portfolio Detail Sliders ---------- */
    document.querySelectorAll('.slider').forEach(slider => {
        const track = slider.querySelector('.slider__track');
        const slides = slider.querySelectorAll('.slider__slide');
        const prev = slider.querySelector('.slider__btn--prev');
        const next = slider.querySelector('.slider__btn--next');
        const dots = slider.querySelectorAll('.slider__dot');
        if (!track || slides.length === 0) return;

        const isV = slider.classList.contains('slider--v');
        let current = 0;

        const go = i => {
            current = Math.max(0, Math.min(slides.length - 1, i));
            if (isV) {
                const h = slides[0].getBoundingClientRect().height;
                track.scrollTo({ top: current * h, behavior: 'smooth' });
            } else {
                const w = slides[0].getBoundingClientRect().width;
                track.scrollTo({ left: current * w, behavior: 'smooth' });
            }
            dots.forEach((d, idx) => d.classList.toggle('is-active', idx === current));
        };

        if (prev) prev.addEventListener('click', () => go(current - 1));
        if (next) next.addEventListener('click', () => go(current + 1));
        dots.forEach((d, idx) => d.addEventListener('click', () => go(idx)));

        let scrollTimer;
        track.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                if (isV) {
                    const h = slides[0].getBoundingClientRect().height;
                    const idx = Math.round(track.scrollTop / h);
                    if (idx !== current) { current = idx; dots.forEach((d, i) => d.classList.toggle('is-active', i === current)); }
                } else {
                    const w = slides[0].getBoundingClientRect().width;
                    const idx = Math.round(track.scrollLeft / w);
                    if (idx !== current) { current = idx; dots.forEach((d, i) => d.classList.toggle('is-active', i === current)); }
                }
            }, 80);
        }, { passive: true });
    });
})();
