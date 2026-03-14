'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { submitVote } from '../actions/vote';


export default function VoteClientEffects() {
    useEffect(() => {
        const form = document.getElementById('voteForm');
        if (!form) return;

        // ✅ Redirige vers step-4 directement si déjà voté
        if (localStorage.getItem('upc_voted') === 'true') {
            const allSteps = document.querySelectorAll('.vote-step');
            allSteps.forEach(s => s.classList.remove('active'));
            const step4 = document.getElementById('step-4');
            if (step4) step4.classList.add('active');

            // Cache la progress bar, inutile sur la confirmation
            const progress = document.querySelector('.vote-progress');
            if (progress) progress.style.display = 'none';

            alert('Vous avez déjà voté');
            return;
        }

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
        setupValidation('step-2', 'grade');
        setupValidation('step-3', 'candidate');

        const onSubmit = async (e) => {
            e.preventDefault();

            if (localStorage.getItem('upc_voted') === 'true') {
                alert('Vous avez déjà voté. Un seul vote est autorisé.');
                return;
            }
            const candidat_id = document.querySelector('input[name="candidate"]:checked')?.value
            const id_faculty = Number(document.querySelector('input[name="faculty"]:checked')?.value)
            const id_grade = Number(document.querySelector('input[name="grade"]:checked')?.value);

            console.log('onSubmit', { candidat_id, id_faculty, id_grade });

            // Labels pour l'affichage dans le receipt
            const facultyLabel = (document.querySelector('input[name="faculty"]:checked'))
                ?.closest('label')?.querySelector('.radio-content')?.textContent ?? 'N/A';
            const gradeLabel = (document.querySelector('input[name="grade"]:checked'))
                ?.closest('label')?.querySelector('.radio-content')?.textContent ?? 'N/A';
            const candidateLabel = (document.querySelector('input[name="candidate"]:checked'))
                ?.closest('label')?.querySelector('h3')?.textContent ?? 'N/A';

            // Désactive le bouton pour éviter le double envoi
            const submitBtn = document.querySelector('.submit-vote');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Envoie en cours...';
            }

            try {
                await submitVote(candidat_id, id_faculty, id_grade);

                localStorage.setItem('upc_voted', 'true');
                // Mise à jour du receipt avec les labels lisibles
                const facEl = document.getElementById('res-faculty');
                const gradeEl = document.getElementById('res-grade');
                const candEl = document.getElementById('res-candidate');
                if (facEl) facEl.innerText = facultyLabel;
                if (gradeEl) gradeEl.innerText = gradeLabel;
                if (candEl) candEl.innerText = candidateLabel;


                // ✅ Prépare le partage après le vote
                goToStep(4);

                // Partage
                const siteUrl = `${window.location.origin}/vote`;
                const waBtn = document.getElementById('share-whatsapp');
                const copyBtn = document.getElementById('share-copy');
                const copyConfirm = document.getElementById('copy-confirm');

                const buildMessage = (name) =>
                    `🗳️ Je viens de voter pour ${name} aux élections UPC '26 !\nSoutenez mon candidat et venez voter vous aussi 👉 ${siteUrl}`;

                if (waBtn) {
                    // Nettoie les anciens listeners si re-render
                    const newWaBtn = waBtn.cloneNode(true);
                    waBtn.parentNode?.replaceChild(newWaBtn, waBtn);

                    newWaBtn.addEventListener('click', () => {
                        const msg = buildMessage(candidateLabel);
                        window.open(
                            `https://wa.me/?text=${encodeURIComponent(msg)}`,
                            '_blank'
                        );
                    });
                }

                if (copyBtn) {
                    const newCopyBtn = copyBtn.cloneNode(true);
                    copyBtn.parentNode?.replaceChild(newCopyBtn, copyBtn);

                    newCopyBtn.addEventListener('click', async () => {
                        const msg = buildMessage(candidateLabel);
                        await navigator.clipboard.writeText(msg);

                        if (copyConfirm) {
                            copyConfirm.classList.add('visible');
                            setTimeout(() => copyConfirm.classList.remove('visible'), 2500);
                        }
                    });
                }
            } catch (err) {
                console.error('Vote failed:', err);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'CAST VOTE';
                }
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
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
        closeBtn?.addEventListener('click', closeMenu);
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
