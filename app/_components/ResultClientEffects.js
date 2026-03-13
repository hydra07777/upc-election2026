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

        const tickerFn = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        if (document.querySelector('.result-title')) {
            gsap.from('.result-title .line', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.2,
            });
        }

        if (document.querySelector('.result-desc')) {
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
            gsap.from(row, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            const bar = row.querySelector('.result-bar');
            const targetWidth = bar?.getAttribute('data-width');

            if (bar && targetWidth) {
                gsap.to(bar, {
                    width: targetWidth,
                    duration: 1.5,
                    ease: 'power4.out',
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            }

            const percentageEl = row.querySelector('.result-percentage');
            const targetNumber = percentageEl ? parseInt(percentageEl.getAttribute('data-target')) : NaN;

            if (percentageEl && Number.isFinite(targetNumber)) {
                gsap.to({ value: 0 }, {
                    value: targetNumber,
                    duration: 1.5,
                    ease: 'power4.out',
                    delay: 0.2,
                    onUpdate: function () {
                        percentageEl.innerText = Math.round(this.targets()[0].value);
                    },
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            }
        });

        const cursor = document.querySelector('.custom-cursor');
        const interactiveElements = document.querySelectorAll('a, button');

        const onMouseMove = (e) => {
            if (!cursor) return;
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

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            enterHandlers.forEach(([el, fn]) => el.removeEventListener('mouseenter', fn));
            leaveHandlers.forEach(([el, fn]) => el.removeEventListener('mouseleave', fn));

            gsap.ticker.remove(tickerFn);

            try {
                lenis.off('scroll', onLenisScroll);
            } catch {
                // ignore
            }

            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return null;
}
