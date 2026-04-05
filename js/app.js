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
    initBackToTop();
    initABToggle();

    // Refresh all ScrollTrigger positions after pins are created
    ScrollTrigger.refresh();
});

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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

function initABToggle() {
    const toggleBtn = document.getElementById('abToggleBtn');
    const settings = document.getElementById('abSettings');
    const status = document.getElementById('abStatus');
    const radios = document.querySelectorAll('input[name="animVersion"]');
    if (!toggleBtn || !settings) return;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settings.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.ab-toggle-panel')) {
            settings.classList.remove('open');
        }
    });

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const version = radio.value;
            if (version === 'A') {
                document.body.classList.add('version-a');
                gsap.globalTimeline.timeScale(100);
                gsap.defaults({ duration: 0.001, ease: 'none' });
                if (status) status.innerHTML = 'Aktivna: <strong>Verzija A</strong> (Kontrolna)';
            } else {
                document.body.classList.remove('version-a');
                gsap.globalTimeline.timeScale(1);
                gsap.defaults({ duration: 0.5, ease: 'power3.out' });
                if (status) status.innerHTML = 'Aktivna: <strong>Verzija B</strong> (Bogate animacije)';
            }
        });
    });
}
