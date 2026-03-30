function initSVGAnimations() {
    const drawBtn = document.getElementById('svgDrawBtn');
    if (!drawBtn) return;

    document.querySelectorAll('.draw-path').forEach(path => {
        const length = path.getTotalLength ? path.getTotalLength() : 1000;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
    });

    let drawn = false;
    drawBtn.addEventListener('click', () => {
        drawn = !drawn;
        document.querySelectorAll('.draw-path').forEach((path, i) => {
            const length = path.getTotalLength ? path.getTotalLength() : 1000;
            gsap.to(path, {
                strokeDashoffset: drawn ? 0 : length,
                duration: 2,
                delay: i * 0.3,
                ease: 'power2.inOut'
            });
        });
    });

    ScrollTrigger.create({
        trigger: '.svg-icons-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.from('.svg-icon-item', {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            });
        }
    });
}
