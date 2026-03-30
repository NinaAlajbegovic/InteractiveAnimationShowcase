function initMicroInteractions() {
    const likeBtn = document.getElementById('likeBtn');
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('liked');
            if (likeBtn.classList.contains('liked')) {
                createParticles(likeBtn);
            }
        });
    }

    const notifBtn = document.getElementById('notifBtn');
    const notifBadge = document.getElementById('notifBadge');
    let notifCount = 0;
    if (notifBtn && notifBadge) {
        notifBtn.addEventListener('click', () => {
            notifCount++;
            notifBadge.textContent = notifCount;
            notifBadge.classList.add('show');
            notifBtn.classList.add('ringing');
            setTimeout(() => notifBtn.classList.remove('ringing'), 500);
        });
    }

    const hamburger = document.getElementById('hamburgerDemo');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
        });
    }
}

function createParticles(button) {
    const colors = ['#ef4444', '#f59e0b', '#ec4899', '#8b5cf6', '#10b981'];
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            top: 50%;
            left: 50%;
            pointer-events: none;
        `;
        button.appendChild(particle);

        const angle = (i / 12) * Math.PI * 2;
        const distance = 30 + Math.random() * 20;

        gsap.to(particle, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
}

function initTiltCards() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
        const content = card.querySelector('.tilt-card-content');
        const glow = card.querySelector('.tilt-glow');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;

            gsap.to(content, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000
            });

            if (glow) {
                glow.style.left = x + 'px';
                glow.style.top = y + 'px';
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(content, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}
