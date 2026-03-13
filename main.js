import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

console.log(Lenis)

gsap.registerPlugin(ScrollTrigger)

// Initialize Lenis for smooth scroll
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const links = document.querySelectorAll('a, .btn-massive, .card');

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: 'power2.out'
  });
});

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    gsap.to(cursor, {
      width: 60,
      height: 60,
      backgroundColor: 'transparent',
      border: '2px solid var(--accent-color)',
      duration: 0.3
    });
  });
  link.addEventListener('mouseleave', () => {
    gsap.to(cursor, {
      width: 20,
      height: 20,
      backgroundColor: 'var(--accent-color)',
      border: 'none',
      duration: 0.3
    });
  });
});

// Parallax Hero
gsap.to('.hero-title', {
  yPercent: 50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

revealElements.forEach(el => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Countdown Timer
const countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 14); // 2 weeks from now

const updateTimer = () => {
  const now = new Date().getTime();
  const distance = countDownDate.getTime() - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, '0');
  document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

  if (distance < 0) {
    clearInterval(timerInterval);
    document.getElementById("timer").innerHTML = "<div class='time-block' style='width: auto; padding: 1.5rem 3rem;'><span class='time-value'>ELECTION DAY</span></div>";
  }
};

updateTimer(); // Initial call
const timerInterval = setInterval(updateTimer, 1000);

