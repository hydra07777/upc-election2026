import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lenis for smooth scroll
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initial Hero Animation
    gsap.from('.result-title .line', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from('.result-desc', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
    });

    // Animate the result rows on scroll
    const rows = document.querySelectorAll('.result-row');

    rows.forEach((row, index) => {
        // Animate the row container itself
        gsap.from(row, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        // Animate the progress bar width
        const bar = row.querySelector('.result-bar');
        const targetWidth = bar.getAttribute('data-width');

        gsap.to(bar, {
            width: targetWidth,
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.2,
            scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        // Animate the percentage numbers counting up
        const percentageEl = row.querySelector('.result-percentage');
        const targetNumber = parseInt(percentageEl.getAttribute('data-target'));

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
                toggleActions: 'play none none none'
            }
        });
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button');

    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    width: 60,
                    height: 60,
                    backgroundColor: 'transparent',
                    border: '2px solid var(--accent-color)',
                    duration: 0.3
                });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    width: 20,
                    height: 20,
                    backgroundColor: 'var(--accent-color)',
                    border: 'none',
                    duration: 0.3
                });
            });
        });
    }
});
