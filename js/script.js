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

    /* ---------- 1b. Pages with a sub-menu (.pf-tabs): scrolling down
       slides the main nav up and pins the tabs to the top;
       scrolling up brings the nav back ---------- */
    const pfTabsBar = document.querySelector('.pf-tabs');
    if (nav && pfTabsBar) {
        let lastY = window.scrollY;
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y > 80 && y > lastY) {
                nav.classList.add('is-up');
                pfTabsBar.classList.add('is-top');
            } else if (y < lastY || y <= 80) {
                nav.classList.remove('is-up');
                pfTabsBar.classList.remove('is-top');
            }
            lastY = y;
        }, { passive: true });
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
    /* Case-study pages highlight their category tab (keyed by tab href).
       Pages whose filename equals a tab href (portfolio.html, -sonar,
       -erp, -good, -visual) match automatically and are not listed. */
    const tabCategory = {
        'portfolio-vmware.html': 'portfolio-sonar.html',  /* Web UI */
        'portfolio-cmq.html':    'portfolio-sonar.html',  /* Web UI */
        'portfolio-system.html': 'portfolio-sonar.html',  /* Web UI */
        'portfolio-mutok.html':  'portfolio-erp.html',    /* Mobile UI */
        'portfolio-flu.html':    'portfolio-erp.html',    /* Mobile UI */
        'portfolio-ww.html':     'portfolio-good.html',   /* Web */
        'portfolio-aft.html':    'portfolio-good.html',   /* Web */
        'portfolio-taish.html':  'portfolio-good.html',   /* Web */
        'portfolio-game.html':   'portfolio-good.html',   /* Web */
        'portfolio-logo.html':   'portfolio-visual.html'  /* Visual */
    };
    const activeFile = currentFile.startsWith('portfolio-design-system')
        ? 'portfolio.html' /* AI Agent Design System pages → AI Agent tab */
        : (tabCategory[currentFile] || currentFile);
    document.querySelectorAll('.pf-tab').forEach(tab => {
        const tabFile = tab.getAttribute('href').split('/').pop();
        if (tabFile === activeFile) tab.classList.add('is-active');
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

    /* ---------- 5b. Shot strip arrows (scroll one thumbnail per click) ---------- */
    document.querySelectorAll('.shot-strip').forEach(strip => {
        const track = strip.querySelector('.shot-thumbs');
        const prev = strip.querySelector('.shot-strip__btn--prev');
        const next = strip.querySelector('.shot-strip__btn--next');
        if (!track || !prev || !next) return;
        const step = () => {
            const item = track.querySelector('.shot-item');
            return item ? item.getBoundingClientRect().width + 12 : 240;
        };
        prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
        next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

        /* page dots: one per viewport-width "page" of thumbnails */
        const dotsBox = document.createElement('div');
        dotsBox.className = 'shot-strip__dots';
        strip.appendChild(dotsBox);
        let dots = [];
        const maxScroll = () => track.scrollWidth - track.clientWidth;
        const setActive = () => {
            if (!dots.length) return;
            const m = maxScroll();
            const i = m > 0 ? Math.round(track.scrollLeft / m * (dots.length - 1)) : 0;
            dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
        };
        const buildDots = () => {
            const n = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
            dotsBox.innerHTML = '';
            dots = [];
            if (n < 2) { setActive(); return; }
            for (let k = 0; k < n; k++) {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 'shot-strip__dot';
                b.setAttribute('aria-label', 'Page ' + (k + 1) + ' of ' + n);
                b.addEventListener('click', () => track.scrollTo({ left: maxScroll() * k / (n - 1), behavior: 'smooth' }));
                dotsBox.appendChild(b);
                dots.push(b);
            }
            setActive();
        };
        buildDots();
        let dotScrollTimer;
        track.addEventListener('scroll', () => {
            clearTimeout(dotScrollTimer);
            dotScrollTimer = setTimeout(setActive, 80);
        }, { passive: true });
        let dotResizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(dotResizeTimer);
            dotResizeTimer = setTimeout(buildDots, 150);
        });
    });

    /* ---------- 6. Lightbox: click a .shot-thumb to enlarge ---------- */
    const thumbGroups = document.querySelectorAll('.shot-thumbs');
    if (thumbGroups.length) {
        const lb = document.createElement('div');
        lb.className = 'lightbox';
        lb.innerHTML =
            '<button class="lightbox__btn lightbox__btn--prev" aria-label="Previous">&lsaquo;</button>' +
            '<img alt="" />' +
            '<button class="lightbox__btn lightbox__btn--next" aria-label="Next">&rsaquo;</button>' +
            '<button class="lightbox__close" aria-label="Close">&times;</button>';
        document.body.appendChild(lb);
        const lbImg = lb.querySelector('img');
        let group = [];
        let idx = 0;

        let switchTimer;
        /* dir: 0 = no transition (first open), -1 = slide from left, 1 = slide from right */
        const show = (i, dir = 0) => {
            idx = (i + group.length) % group.length;
            const t = group[idx];
            const src = t.dataset.full || t.src;
            clearTimeout(switchTimer);
            if (!dir) {
                lbImg.style.opacity = '';
                lbImg.style.transform = '';
                lbImg.src = src;
                lbImg.alt = t.alt;
                return;
            }
            lbImg.style.opacity = '0';
            lbImg.style.transform = 'translateX(' + (dir > 0 ? -28 : 28) + 'px)';
            switchTimer = setTimeout(() => {
                lbImg.src = src;
                lbImg.alt = t.alt;
                const arrive = () => {
                    lbImg.style.transition = 'none';
                    lbImg.style.transform = 'translateX(' + (dir > 0 ? 28 : -28) + 'px)';
                    void lbImg.offsetWidth; /* flush so the enter position applies before animating */
                    lbImg.style.transition = '';
                    lbImg.style.opacity = '';
                    lbImg.style.transform = '';
                };
                if (lbImg.complete) arrive();
                else lbImg.addEventListener('load', arrive, { once: true });
            }, 220);
        };
        const open = () => { lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
        const close = () => { lb.classList.remove('is-open'); document.body.style.overflow = ''; };

        thumbGroups.forEach(g => {
            const imgs = Array.from(g.querySelectorAll('.shot-thumb img'));
            g.querySelectorAll('.shot-thumb').forEach((btn, i) => {
                btn.addEventListener('click', () => { group = imgs; show(i); open(); });
            });
        });
        lb.querySelector('.lightbox__btn--prev').addEventListener('click', () => show(idx - 1, -1));
        lb.querySelector('.lightbox__btn--next').addEventListener('click', () => show(idx + 1, 1));
        lb.querySelector('.lightbox__close').addEventListener('click', close);
        lb.addEventListener('click', e => { if (e.target === lb) close(); });
        document.addEventListener('keydown', e => {
            if (!lb.classList.contains('is-open')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') show(idx - 1, -1);
            if (e.key === 'ArrowRight') show(idx + 1, 1);
        });
    }

    /* ---------- 7. True Focus text effect (.true-focus) ---------- */
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
        document.querySelectorAll('.true-focus').forEach(container => {
            const words = Array.from(container.querySelectorAll('.tf-word'));
            const frame = container.querySelector('.tf-frame');
            if (!words.length || !frame) return;

            const duration = parseFloat(container.dataset.duration) || 0.5;
            const pause = parseFloat(container.dataset.pause) || 1;
            frame.style.transitionDuration = duration + 's';

            let current = 0;
            const focusWord = i => {
                words.forEach((w, idx) => w.classList.toggle('is-active', idx === i));
                const w = words[i];
                frame.style.width = w.offsetWidth + 'px';
                frame.style.height = w.offsetHeight + 'px';
                frame.style.transform = 'translate(' + w.offsetLeft + 'px,' + w.offsetTop + 'px)';
                frame.classList.add('is-visible');
            };
            focusWord(current);
            setInterval(() => {
                current = (current + 1) % words.length;
                focusWord(current);
            }, (duration + pause) * 1000);
        });
    }

    /* ---------- 8. GA4 click tracking (project cards / category tabs / contact / resume) ---------- */
    if (typeof gtag === 'function') {
        const trackClick = (el, eventName, label) => {
            el.addEventListener('click', () => {
                gtag('event', eventName, { link_text: label, link_url: el.getAttribute('href') || '' });
            });
        };

        document.querySelectorAll('.project__card .btn, .project-grid__item').forEach(el => {
            const card = el.closest('.project__card');
            const titleEl = card ? card.querySelector('.project__title') : null;
            const capEl = el.querySelector('.project-grid__cap');
            const label = (titleEl && titleEl.textContent.trim()) || (capEl && capEl.textContent.trim()) || el.textContent.trim();
            trackClick(el, 'project_card_click', label);
        });

        document.querySelectorAll('.pf-tab').forEach(el => {
            trackClick(el, 'category_tab_click', el.textContent.trim());
        });

        document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
            trackClick(el, 'contact_click', el.textContent.trim());
        });

        document.querySelectorAll('a[href="resume.html"], a[href="enresume.html"]').forEach(el => {
            trackClick(el, 'resume_click', el.textContent.trim());
        });
    }
})();
