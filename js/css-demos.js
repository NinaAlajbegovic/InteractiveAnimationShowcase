function initTimingDemo() {
    const btn = document.getElementById('triggerTiming');
    if (!btn) return;
    let moved = false;

    btn.addEventListener('click', () => {
        const balls = document.querySelectorAll('.timing-ball');
        moved = !moved;
        balls.forEach(ball => {
            ball.classList.toggle('moved', moved);
        });
    });
}

function initButtonEffects() {
    document.querySelectorAll('.btn-ripple').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    document.querySelectorAll('[data-magnetic]').forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(this, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
    });
}
