'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function ResultClientEffects() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis();
        const onLenisScroll = () => ScrollTrigger.update();
        lenis.on('scroll', onLenisScroll);

        const tickerFn = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        // ✅ Helper breakpoints
        const isMobile = () => window.innerWidth <= 480;
        const isTablet = () => window.innerWidth <= 768;

        // ✅ Animations d'entrée — désactivées sur mobile (trop agressif)
        if (!isMobile() && document.querySelector('.result-title')) {
            gsap.from('.result-title .line', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.2,
            });
        }

        if (!isMobile() && document.querySelector('.result-desc')) {
            gsap.from('.result-desc', {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.8,
            });
        }

        const rows = document.querySelectorAll('.result-row');
        rows.forEach((row) => {

            // ✅ Entrée des rows — plus subtile sur mobile
            gsap.from(row, {
                y: isMobile() ? 20 : 50,
                opacity: 0,
                duration: isMobile() ? 0.5 : 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            });

            // ✅ Animation de la barre
            const bar = row.querySelector('.result-bar');
            const targetWidth = bar?.getAttribute('data-width');

            if (bar && targetWidth) {
                gsap.to(bar, {
                    width: targetWidth,
                    duration: isMobile() ? 1 : 1.5,
                    ease: 'power4.out',
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                    },
                });
            }

            // ✅ Animation du compteur %
            const percentageEl = row.querySelector('.result-percentage');
            const targetNumber = percentageEl
                ? parseInt(percentageEl.getAttribute('data-target') ?? '0')
                : NaN;

            if (percentageEl && Number.isFinite(targetNumber)) {
                gsap.to({ value: 0 }, {
                    value: targetNumber,
                    duration: isMobile() ? 1 : 1.5,
                    ease: 'power4.out',
                    delay: 0.2,
                    onUpdate: function () {
                        percentageEl.innerText = Math.round(this.targets()[0].value).toString();
                    },
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                    },
                });
            }
        });

        // ✅ Curseur custom — désactivé sur mobile/touch
        const cursor = document.querySelector('.custom-cursor');
        const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

        if (cursor) {
            cursor.style.display = isTouchDevice() ? 'none' : 'block';
        }

        const interactiveElements = document.querySelectorAll('a, button');
        const onMouseMove = (e) => {
            if (!cursor || isTouchDevice()) return;
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out',
            });
        };

        document.addEventListener('mousemove', onMouseMove);

        const enterHandlers = [];
        const leaveHandlers = [];

        if (!isTouchDevice()) {
            interactiveElements.forEach((el) => {
                const onEnter = () => {
                    if (!cursor) return;
                    gsap.to(cursor, {
                        width: 60,
                        height: 60,
                        backgroundColor: 'transparent',
                        border: '2px solid var(--accent-color)',
                        duration: 0.3,
                    });
                };
                const onLeave = () => {
                    if (!cursor) return;
                    gsap.to(cursor, {
                        width: 20,
                        height: 20,
                        backgroundColor: 'var(--accent-color)',
                        border: 'none',
                        duration: 0.3,
                    });
                };
                enterHandlers.push([el, onEnter]);
                leaveHandlers.push([el, onLeave]);
                el.addEventListener('mouseenter', onEnter);
                el.addEventListener('mouseleave', onLeave);
            });
        }

        // ✅ Refresh ScrollTrigger après resize
        const onResize = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener('resize', onResize);

        // ✅ Hamburger menu
        const hamburger = document.getElementById('nav-hamburger');
        const mobileMenu = document.getElementById('nav-mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        let menuOpen = false;

        const toggleMenu = () => {
            menuOpen = !menuOpen;
            hamburger?.classList.toggle('open', menuOpen);
            mobileMenu?.classList.toggle('open', menuOpen);
            // Bloque le scroll quand menu ouvert
            document.body.style.overflow = menuOpen ? 'hidden' : '';
        };

        const closeMenu = () => {
            menuOpen = false;
            hamburger?.classList.remove('open');
            mobileMenu?.classList.remove('open');
            document.body.style.overflow = '';
        };

        hamburger?.addEventListener('click', toggleMenu);

        // Ferme le menu quand on clique un lien
        mobileLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        closeBtn?.addEventListener('click', closeMenu);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            enterHandlers.forEach(([el, fn]) => el.removeEventListener('mouseenter', fn));
            leaveHandlers.forEach(([el, fn]) => el.removeEventListener('mouseleave', fn));
            gsap.ticker.remove(tickerFn);
            try { lenis.off('scroll', onLenisScroll); } catch { /* ignore */ }
            ScrollTrigger.getAll().forEach((t) => t.kill());

            hamburger?.removeEventListener('click', toggleMenu);
            mobileLinks.forEach((link) => link.removeEventListener('click', closeMenu));
            document.body.style.overflow = ''; // sécurité
        };
    }, []);

    return null;
}