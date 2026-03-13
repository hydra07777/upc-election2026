'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HomeClientEffects() {
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

    const cursor = document.querySelector('.custom-cursor');
    const links = document.querySelectorAll('a, .btn-massive, .card');

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

    links.forEach((link) => {
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

      enterHandlers.push([link, onEnter]);
      leaveHandlers.push([link, onLeave]);
      link.addEventListener('mouseenter', onEnter);
      link.addEventListener('mouseleave', onLeave);
    });

    if (document.querySelector('.hero-section') && document.querySelector('.hero-title')) {
      gsap.to('.hero-title', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    const timerEl = document.getElementById('timer');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    let timerInterval;

    if (timerEl && daysEl && hoursEl && minutesEl && secondsEl) {
      const countDownDate = new Date();
      countDownDate.setDate(countDownDate.getDate() + 14);

      const updateTimer = () => {
        const now = new Date().getTime();
        const distance = countDownDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
          clearInterval(timerInterval);
          timerEl.innerHTML =
            "<div class='time-block' style='width: auto; padding: 1.5rem 3rem;'><span class='time-value'>ELECTION DAY</span></div>";
        }
      };

      updateTimer();
      timerInterval = setInterval(updateTimer, 1000);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);

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
