function initGSAPPlayground() {
    const playBtn = document.getElementById('gsapPlay');
    const reverseBtn = document.getElementById('gsapReverse');
    const resetBtn = document.getElementById('gsapReset');
    if (!playBtn) return;

    const box1 = document.querySelector('.box-1');
    const box2 = document.querySelector('.box-2');
    const box3 = document.querySelector('.box-3');

    let tl = null;

    function createTimeline() {
        if (tl) tl.kill();
        tl = gsap.timeline({ paused: true });

        tl.to(box1, {
            x: 100,
            rotation: 360,
            borderRadius: '50%',
            duration: 1,
            ease: 'power2.inOut'
        })
        .from(box2, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .fromTo(box3,
            { y: -50, rotation: -180, opacity: 0 },
            { y: 0, rotation: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            '-=0.3'
        );

        return tl;
    }

    createTimeline();

    playBtn.addEventListener('click', () => {
        if (tl.progress() === 1) {
            tl.restart();
        } else {
            tl.play();
        }
    });

    reverseBtn.addEventListener('click', () => tl.reverse());
    resetBtn.addEventListener('click', () => {
        tl.kill();
        gsap.set([box1, box2, box3], { clearProps: 'all' });
        createTimeline();
    });
}

function initTimelineDemo() {
    const playBtn = document.getElementById('tlPlay');
    const reverseBtn = document.getElementById('tlReverse');
    const pauseBtn = document.getElementById('tlPause');
    const resetBtn = document.getElementById('tlReset');
    const progressBar = document.getElementById('tlProgress');
    if (!playBtn) return;

    const circle = document.querySelector('.tl-circle');
    const square = document.querySelector('.tl-square');
    const triangle = document.querySelector('.tl-triangle');
    const diamond = document.querySelector('.tl-diamond');

    let tl = null;

    function createTL() {
        if (tl) tl.kill();

        tl = gsap.timeline({
            paused: true,
            onUpdate: () => {
                if (progressBar) {
                    progressBar.style.width = (tl.progress() * 100) + '%';
                }
            }
        });

        tl.from(circle, { scale: 0, duration: 0.5, ease: 'back.out(1.7)' })
          .from(square, { x: -100, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
          .from(triangle, { y: 50, rotation: -180, duration: 0.6, ease: 'power3.out' }, '-=0.3')
          .from(diamond, { scale: 0, rotation: 360, duration: 0.5, ease: 'power2.out' })
          .to([circle, square], { y: -30, stagger: 0.1, duration: 0.4, ease: 'power2.inOut' })
          .to([triangle, diamond], { y: -20, stagger: 0.1, duration: 0.4, ease: 'power2.inOut' }, '-=0.3')
          .to('.tl-element', { y: 0, duration: 0.3, ease: 'bounce.out', stagger: 0.05 });

        return tl;
    }

    createTL();

    playBtn.addEventListener('click', () => {
        if (tl.progress() === 1) tl.restart();
        else tl.play();
    });
    reverseBtn.addEventListener('click', () => tl.reverse());
    pauseBtn.addEventListener('click', () => tl.pause());
    resetBtn.addEventListener('click', () => {
        tl.kill();
        gsap.set('.tl-element', { clearProps: 'all' });
        if (progressBar) progressBar.style.width = '0%';
        createTL();
    });
}

function initStaggerDemo() {
    const btn = document.getElementById('staggerPlay');
    if (!btn) return;
    const items = document.querySelectorAll('.stagger-item');

    btn.addEventListener('click', () => {
        gsap.fromTo(items,
            { scale: 0.5, opacity: 0.3, borderRadius: '50%' },
            {
                scale: 1,
                opacity: 1,
                borderRadius: '12px',
                duration: 0.5,
                ease: 'back.out(1.7)',
                stagger: {
                    each: 0.05,
                    from: 'center',
                    grid: [5, 5]
                },
                onComplete: () => {
                    gsap.to(items, {
                        scale: 0.5,
                        opacity: 0.3,
                        borderRadius: '50%',
                        duration: 0.4,
                        delay: 0.5,
                        stagger: { each: 0.05, from: 'edges', grid: [5, 5] }
                    });
                }
            }
        );
    });
}

function initComplexDemos() {
    const splitBtn = document.getElementById('splitTextBtn');
    const splitText = document.getElementById('splitTextDemo');
    if (splitBtn && splitText) {
        splitBtn.addEventListener('click', () => {
            const text = splitText.textContent;
            splitText.innerHTML = '';
            text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.classList.add('split-char');
                span.textContent = char === ' ' ? '\u00A0' : char;
                splitText.appendChild(span);
            });

            gsap.fromTo('.split-char',
                { opacity: 0, y: 20, rotateX: -90 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.5,
                    stagger: 0.02,
                    ease: 'back.out(1.7)'
                }
            );
        });
    }

    const flipCard = document.getElementById('flipCard');
    if (flipCard) {
        flipCard.addEventListener('click', () => {
            flipCard.classList.toggle('flipped');
        });
    }

    const morphBtn = document.getElementById('morphBtn');
    const morphShape = document.getElementById('morphShape');
    if (morphBtn && morphShape) {
        morphBtn.addEventListener('click', () => {
            morphShape.classList.toggle('morphed');
        });
    }
}
