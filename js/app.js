gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initHeroAnimations();
    initStatCounters();
    initTimingDemo();
    initButtonEffects();
    initGSAPPlayground();
    initTimelineDemo();
    initStaggerDemo();
    initComplexDemos();
    initSVGAnimations();
    initScrollRevealAnimations();
    initParallax();
    initHorizontalScroll();
    initSkillBars();
    initMicroInteractions();
    initTiltCards();
    initPerformanceDemo();
    initFPSMonitor();
    initReadingProgress();
});

function initReadingProgress() {
    const progressBar = document.getElementById('readingProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPos = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        }
    });
});
