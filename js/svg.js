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
}
