function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3
    })
    .to('.line-1', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.3')
    .to('.line-2', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5')
    .to('.line-3', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5')
    .to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4')
    .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4')
    .to('.hero-stats', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.3');
}

function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    innerText: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    onUpdate: function() {
                        stat.textContent = Math.round(parseFloat(stat.textContent)) + '+';
                    }
                });
            }
        });
    });
}
