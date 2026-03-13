'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function VoteClientEffects() {
    useEffect(() => {
        const form = document.getElementById('voteForm');
        if (!form) return;

        const indicators = document.querySelectorAll('.step-indicator');
        let currentStep = 1;
        const totalSteps = 3;

        const goToStep = (stepNumber) => {
            if (stepNumber < 1 || stepNumber > totalSteps + 1) return;

            const currentEl = document.getElementById(`step-${currentStep}`);
            if (!currentEl) return;

            gsap.to(currentEl, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    currentEl.classList.remove('active');

                    indicators.forEach((ind) => {
                        if (parseInt(ind.dataset.step) === stepNumber) {
                            ind.classList.add('active');
                        } else {
                            ind.classList.remove('active');
                        }
                    });

                    currentStep = stepNumber;
                    const newEl = document.getElementById(`step-${currentStep}`);
                    if (!newEl) return;
                    newEl.classList.add('active');

                    gsap.fromTo(newEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
                },
            });
        };

        const nextBtns = Array.from(document.querySelectorAll('.next-step'));
        const prevBtns = Array.from(document.querySelectorAll('.prev-step'));

        const onNext = () => {
            if (currentStep < totalSteps) goToStep(currentStep + 1);
        };

        const onPrev = () => {
            if (currentStep > 1) goToStep(currentStep - 1);
        };

        nextBtns.forEach((btn) => btn.addEventListener('click', onNext));
        prevBtns.forEach((btn) => btn.addEventListener('click', onPrev));

        const setupValidation = (stepId, inputName) => {
            const stepEl = document.getElementById(stepId);
            if (!stepEl) return;

            const inputs = stepEl.querySelectorAll(`input[name="${inputName}"]`);
            const nextBtn = stepEl.querySelector('.next-step, .submit-vote');

            inputs.forEach((input) => {
                input.addEventListener('change', () => {
                    if (nextBtn) nextBtn.disabled = false;
                });
            });
        };

        setupValidation('step-1', 'faculty');
        setupValidation('step-2', 'year');
        setupValidation('step-3', 'candidate');

        const onSubmit = (e) => {
            e.preventDefault();

            const facultyVal = document.querySelector('input[name="faculty"]:checked')?.value || 'N/A';
            const yearVal = document.querySelector('input[name="year"]:checked')?.value || 'N/A';
            const candidateVal = document.querySelector('input[name="candidate"]:checked')?.value || 'N/A';

            const facEl = document.getElementById('res-faculty');
            const yearEl = document.getElementById('res-year');
            const candEl = document.getElementById('res-candidate');

            if (facEl) facEl.innerText = facultyVal.toUpperCase();
            if (yearEl) yearEl.innerText = yearVal.toUpperCase();
            if (candEl) candEl.innerText = candidateVal.toUpperCase();

            goToStep(4);
        };

        form.addEventListener('submit', onSubmit);

        const cursor = document.querySelector('.custom-cursor');
        const interactiveElements = document.querySelectorAll('a, button, label');

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
            nextBtns.forEach((btn) => btn.removeEventListener('click', onNext));
            prevBtns.forEach((btn) => btn.removeEventListener('click', onPrev));
            form.removeEventListener('submit', onSubmit);

            document.removeEventListener('mousemove', onMouseMove);
            enterHandlers.forEach(([el, fn]) => el.removeEventListener('mouseenter', fn));
            leaveHandlers.forEach(([el, fn]) => el.removeEventListener('mouseleave', fn));
        };
    }, []);

    return null;
}
