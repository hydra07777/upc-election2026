import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('voteForm');
    if (!form) return;

    const steps = document.querySelectorAll('.vote-step');
    const indicators = document.querySelectorAll('.step-indicator');
    let currentStep = 1;
    const totalSteps = 3;

    // Function to handle step transitions
    const goToStep = (stepNumber) => {
        if (stepNumber < 1 || stepNumber > totalSteps + 1) return;

        // Fade out current step
        const currentEl = document.getElementById(`step-${currentStep}`);
        gsap.to(currentEl, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                currentEl.classList.remove('active');

                // Update indicators
                indicators.forEach(ind => {
                    if (parseInt(ind.dataset.step) === stepNumber) {
                        ind.classList.add('active');
                    } else {
                        ind.classList.remove('active');
                    }
                });

                // Prepare and fade in new step
                currentStep = stepNumber;
                const newEl = document.getElementById(`step-${currentStep}`);
                newEl.classList.add('active');

                gsap.fromTo(newEl,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                );
            }
        });
    };

    // Setup Next/Prev button listeners
    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                goToStep(currentStep + 1);
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
        });
    });

    // Enable continue buttons when a radio is selected in current step
    const setupValidation = (stepId, inputName) => {
        const stepEl = document.getElementById(stepId);
        const inputs = stepEl.querySelectorAll(`input[name="${inputName}"]`);
        const nextBtn = stepEl.querySelector('.next-step, .submit-vote');

        inputs.forEach(input => {
            input.addEventListener('change', () => {
                if (nextBtn) nextBtn.disabled = false;
            });
        });
    };

    setupValidation('step-1', 'faculty');
    setupValidation('step-2', 'year');
    setupValidation('step-3', 'candidate');

    // Handle Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather data safely (ensure something is selected, though buttons are disabled otherwise)
        const facultyVal = document.querySelector('input[name="faculty"]:checked')?.value || 'N/A';
        const yearVal = document.querySelector('input[name="year"]:checked')?.value || 'N/A';
        const candidateVal = document.querySelector('input[name="candidate"]:checked')?.value || 'N/A';

        // Populate receipt
        document.getElementById('res-faculty').innerText = facultyVal.toUpperCase();
        document.getElementById('res-year').innerText = yearVal.toUpperCase();
        document.getElementById('res-candidate').innerText = candidateVal.toUpperCase();

        // Transition to success screen (step 4)
        goToStep(4);
    });

    // Custom Cursor (copied from main.js for standalone vote page if needed, though they usually share)
    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button, label');

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
