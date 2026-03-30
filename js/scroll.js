function initScrollRevealAnimations() {
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                once: true
            }
        });
    });

    gsap.utils.toArray('.demo-block').forEach(block => {
        gsap.from(block, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                once: true
            }
        });
    });

    const revealCards = document.querySelectorAll('.reveal-card');
    revealCards.forEach(card => {
        const classList = card.classList;
        let fromVars = { opacity: 0, duration: 0.8, ease: 'power3.out' };

        if (classList.contains('reveal-fade-up')) fromVars.y = 60;
        else if (classList.contains('reveal-fade-left')) fromVars.x = -100;
        else if (classList.contains('reveal-fade-right')) fromVars.x = 100;
        else if (classList.contains('reveal-scale')) { fromVars.scale = 0.5; fromVars.y = 30; }
        else if (classList.contains('reveal-rotate')) { fromVars.rotation = -15; fromVars.y = 40; }
        else if (classList.contains('reveal-flip')) { fromVars.rotateX = -90; }

        gsap.from(card, {
            ...fromVars,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true
            }
        });
    });

    ScrollTrigger.create({
        trigger: '.hover-demos',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.from('.hover-card', {
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    });

    ScrollTrigger.create({
        trigger: '.loading-demos',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.from('.loading-item', {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'back.out(1.7)'
            });
        }
    });

    ScrollTrigger.create({
        trigger: '.tips-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            gsap.from('.tip-card', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    });
}

function initParallax() {
    const parallaxDemo = document.querySelector('.parallax-demo');
    if (!parallaxDemo) return;

    gsap.utils.toArray('.parallax-shape').forEach(shape => {
        const speed = parseFloat(shape.parentElement.dataset.speed) || 0.5;
        gsap.to(shape, {
            y: -150 * speed,
            x: 30 * speed * (Math.random() > 0.5 ? 1 : -1),
            scale: 1 + 0.2 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: parallaxDemo,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    gsap.to('.parallax-text', {
        y: -80,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
            trigger: parallaxDemo,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });
}

function initHorizontalScroll() {
    const wrapper = document.getElementById('horizontalWrapper');
    const container = document.getElementById('horizontalContainer');
    if (!wrapper || !container) return;

    const getScrollAmount = () => -(container.scrollWidth - wrapper.offsetWidth);

    gsap.to(container, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
            trigger: wrapper,
            start: 'top 15%',
            end: () => '+=' + Math.abs(getScrollAmount()),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: self => self.animation.vars.x = getScrollAmount()
        }
    });
}

function initSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(fill => {
        const width = fill.dataset.width;
        ScrollTrigger.create({
            trigger: fill,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.to(fill, {
                    width: width + '%',
                    duration: 1.5,
                    ease: 'power2.out'
                });
            }
        });
    });
}
