function initPerformanceDemo() {
    const compareBtn = document.getElementById('perfCompare');
    if (!compareBtn) return;

    const badBox = document.getElementById('badBox');
    const goodBox = document.getElementById('goodBox');
    let running = false;

    compareBtn.addEventListener('click', () => {
        if (running) return;
        running = true;

        badBox.style.left = '10px';
        badBox.style.width = '60px';
        badBox.style.height = '60px';
        gsap.set(goodBox, { x: 0, scale: 1 });

        const parent = badBox.parentElement;
        const maxLeft = parent.offsetWidth - 70;

        let startTime = performance.now();
        function badAnimate() {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / 2000, 1);
            const eased = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            badBox.style.left = (10 + eased * maxLeft) + 'px';
            badBox.style.width = (60 + Math.sin(progress * Math.PI * 4) * 10) + 'px';
            badBox.style.height = (60 + Math.sin(progress * Math.PI * 4) * 10) + 'px';

            if (progress < 1) {
                requestAnimationFrame(badAnimate);
            } else {
                setTimeout(() => {
                    badBox.style.left = '10px';
                    badBox.style.width = '60px';
                    badBox.style.height = '60px';
                    running = false;
                }, 500);
            }
        }
        requestAnimationFrame(badAnimate);

        gsap.to(goodBox, {
            x: maxLeft,
            duration: 2,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.to(goodBox, { x: 0, duration: 0.3, delay: 0.2 });
            }
        });
    });

    const shadowBtn = document.getElementById('shadowCompare');
    if (shadowBtn) {
        const shadowBad = document.getElementById('shadowBadBox');
        const shadowGood = document.getElementById('shadowGoodBox');
        let shadowRunning = false;

        shadowBtn.addEventListener('click', () => {
            if (shadowRunning) return;
            shadowRunning = true;

            let startTime = performance.now();
            function animateShadowBad() {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / 2000, 1);
                const intensity = Math.sin(progress * Math.PI * 3) * 30 + 30;
                shadowBad.style.boxShadow = `0 ${intensity}px ${intensity * 2}px rgba(239, 68, 68, ${0.3 + progress * 0.4})`;
                if (progress < 1) {
                    requestAnimationFrame(animateShadowBad);
                } else {
                    shadowBad.style.boxShadow = '';
                    shadowRunning = false;
                }
            }
            requestAnimationFrame(animateShadowBad);

            gsap.fromTo(shadowGood, 
                { '--shadow-opacity': 0 },
                { '--shadow-opacity': 1, duration: 1, yoyo: true, repeat: 2, ease: 'sine.inOut' }
            );
            gsap.to(shadowGood.querySelector('::after') || shadowGood, {
                keyframes: [
                    { scale: 1, duration: 0.3 },
                    { scale: 1.05, duration: 0.3 },
                    { scale: 1, duration: 0.3 }
                ],
                repeat: 2
            });
            let sStart = performance.now();
            function animateShadowGood() {
                const elapsed = performance.now() - sStart;
                const progress = Math.min(elapsed / 2000, 1);
                const opacity = Math.sin(progress * Math.PI * 3);
                shadowGood.style.setProperty('--shadow-opacity', Math.abs(opacity));
                if (progress < 1) requestAnimationFrame(animateShadowGood);
                else shadowGood.style.removeProperty('--shadow-opacity');
            }
            shadowGood.style.cssText += '';
            const styleEl = document.createElement('style');
            styleEl.id = 'shadow-good-style';
            styleEl.textContent = `.shadow-good-box::after { opacity: var(--shadow-opacity, 0) !important; }`;
            if (!document.getElementById('shadow-good-style')) document.head.appendChild(styleEl);
            requestAnimationFrame(animateShadowGood);
        });
    }

    const colorBtn = document.getElementById('colorCompare');
    if (colorBtn) {
        const colorBad = document.getElementById('colorBadBox');
        const colorGood = document.getElementById('colorGoodBox');
        let colorRunning = false;

        colorBtn.addEventListener('click', () => {
            if (colorRunning) return;
            colorRunning = true;

            const colors = [
                [239, 68, 68],
                [139, 92, 246],
                [6, 182, 212],
                [16, 185, 129],
                [245, 158, 11]
            ];
            let startTime = performance.now();
            function animateColorBad() {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / 3000, 1);
                const idx = progress * (colors.length - 1);
                const from = colors[Math.floor(idx)];
                const to = colors[Math.min(Math.ceil(idx), colors.length - 1)];
                const t = idx - Math.floor(idx);
                const r = Math.round(from[0] + (to[0] - from[0]) * t);
                const g = Math.round(from[1] + (to[1] - from[1]) * t);
                const b = Math.round(from[2] + (to[2] - from[2]) * t);
                colorBad.style.background = `rgb(${r},${g},${b})`;
                if (progress < 1) requestAnimationFrame(animateColorBad);
                else {
                    colorBad.style.background = '';
                    colorRunning = false;
                }
            }
            requestAnimationFrame(animateColorBad);

            const goodStyle = document.createElement('style');
            goodStyle.id = 'color-good-style';
            goodStyle.textContent = `.color-good-box::after { opacity: var(--color-opacity, 0) !important; }`;
            if (!document.getElementById('color-good-style')) document.head.appendChild(goodStyle);

            let cStart = performance.now();
            function animateColorGood() {
                const elapsed = performance.now() - cStart;
                const progress = Math.min(elapsed / 3000, 1);
                const opacity = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;
                colorGood.style.setProperty('--color-opacity', opacity);
                if (progress < 1) requestAnimationFrame(animateColorGood);
                else colorGood.style.removeProperty('--color-opacity');
            }
            requestAnimationFrame(animateColorGood);
        });
    }

    const manyBtn = document.getElementById('manyCompare');
    if (manyBtn) {
        const badStage = document.getElementById('manyBadStage');
        const goodStage = document.getElementById('manyGoodStage');
        let manyRunning = false;

        manyBtn.addEventListener('click', () => {
            if (manyRunning) return;
            manyRunning = true;

            badStage.querySelectorAll('.mini-dot').forEach(d => d.remove());
            goodStage.querySelectorAll('.mini-dot').forEach(d => d.remove());

            const count = 80;

            const badDots = [];
            for (let i = 0; i < count; i++) {
                const dot = document.createElement('div');
                dot.className = 'mini-dot';
                dot.style.cssText = `position:absolute;width:8px;height:8px;border-radius:50%;background:hsl(${(i/count)*360},70%,60%);left:${Math.random()*80+10}%;top:${Math.random()*80+10}%;`;
                badStage.appendChild(dot);
                badDots.push(dot);
            }

            let startTime = performance.now();
            let badReqId;
            function badManyAnimate() {
                const elapsed = performance.now() - startTime;
                if (elapsed > 3000) {
                    badDots.forEach(d => d.remove());
                    manyRunning = false;
                    return;
                }
                badDots.forEach((dot, i) => {
                    const w = dot.offsetWidth;
                    dot.style.left = (parseFloat(dot.style.left) + Math.sin(elapsed/300 + i) * 0.3) + '%';
                    dot.style.top = (parseFloat(dot.style.top) + Math.cos(elapsed/300 + i) * 0.3) + '%';
                    dot.style.width = (8 + Math.sin(elapsed/200 + i) * 3) + 'px';
                    dot.style.height = (8 + Math.sin(elapsed/200 + i) * 3) + 'px';
                });
                badReqId = requestAnimationFrame(badManyAnimate);
            }
            requestAnimationFrame(badManyAnimate);

            const goodDots = [];
            for (let i = 0; i < count; i++) {
                const dot = document.createElement('div');
                dot.className = 'mini-dot';
                dot.style.cssText = `position:absolute;width:8px;height:8px;border-radius:50%;background:hsl(${(i/count)*360},70%,60%);left:${Math.random()*80+10}%;top:${Math.random()*80+10}%;`;
                goodStage.appendChild(dot);
                goodDots.push(dot);
            }

            gsap.to(goodDots, {
                x: 'random(-40, 40)',
                y: 'random(-20, 20)',
                scale: 'random(0.5, 2)',
                duration: 1.5,
                ease: 'sine.inOut',
                stagger: { each: 0.01, repeat: 1, yoyo: true },
                onComplete: () => {
                    goodDots.forEach(d => d.remove());
                }
            });
        });
    }
}

function initFPSMonitor() {
    const canvas = document.getElementById('fpsCanvas');
    const counter = document.getElementById('fpsCounter');
    const goodBtn = document.getElementById('fpsGood');
    const badBtn = document.getElementById('fpsBad');
    const stopBtn = document.getElementById('fpsStop');
    const boxesContainer = document.getElementById('fpsBoxes');

    if (!canvas || !goodBtn) return;

    const ctx = canvas.getContext('2d');
    const fpsHistory = [];
    let lastTime = performance.now();
    let fpsAnimId = null;
    let stressAnimId = null;
    let stressBoxes = [];

    function measureFPS() {
        const now = performance.now();
        const fps = Math.round(1000 / (now - lastTime));
        lastTime = now;

        fpsHistory.push(Math.min(fps, 120));
        if (fpsHistory.length > 60) fpsHistory.shift();

        if (counter) {
            counter.textContent = fps + ' FPS';
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        [30, 60].forEach(line => {
            const y = canvas.height - (line / 120) * canvas.height;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();

            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.font = '10px Inter';
            ctx.fillText(line + '', 4, y - 4);
        });

        const barWidth = canvas.width / 60;
        fpsHistory.forEach((fps, i) => {
            const height = (fps / 120) * canvas.height;
            const y = canvas.height - height;

            let color;
            if (fps >= 50) color = '#10b981';
            else if (fps >= 30) color = '#f59e0b';
            else color = '#ef4444';

            ctx.fillStyle = color;
            ctx.fillRect(i * barWidth, y, barWidth - 1, height);
        });

        fpsAnimId = requestAnimationFrame(measureFPS);
    }

    function startGoodAnimation() {
        stopStress();
        boxesContainer.innerHTML = '';
        stressBoxes = [];

        for (let i = 0; i < 50; i++) {
            const box = document.createElement('div');
            box.classList.add('fps-mini-box');
            box.style.background = `hsl(${(i / 50) * 360}, 70%, 60%)`;
            boxesContainer.appendChild(box);
            stressBoxes.push(box);
        }

        gsap.to(stressBoxes, {
            x: 'random(-100, 100)',
            y: 'random(-30, 30)',
            rotation: 'random(-180, 180)',
            scale: 'random(0.5, 1.5)',
            duration: 2,
            ease: 'power2.inOut',
            stagger: { each: 0.02, repeat: -1, yoyo: true }
        });

        if (!fpsAnimId) measureFPS();
    }

    function startBadAnimation() {
        stopStress();
        boxesContainer.innerHTML = '';
        stressBoxes = [];

        for (let i = 0; i < 200; i++) {
            const box = document.createElement('div');
            box.classList.add('fps-mini-box');
            box.style.background = `hsl(${(i / 200) * 360}, 70%, 60%)`;
            box.style.position = 'relative';
            boxesContainer.appendChild(box);
            stressBoxes.push(box);
        }

        function stressLoop() {
            stressBoxes.forEach((box, i) => {
                const width = box.offsetWidth;
                box.style.marginLeft = (Math.sin(Date.now() / 500 + i) * 10) + 'px';
                box.style.marginTop = (Math.cos(Date.now() / 500 + i) * 5) + 'px';
                box.style.width = (12 + Math.sin(Date.now() / 300 + i) * 4) + 'px';
                box.style.height = (12 + Math.cos(Date.now() / 300 + i) * 4) + 'px';
            });
            stressAnimId = requestAnimationFrame(stressLoop);
        }
        stressLoop();
        if (!fpsAnimId) measureFPS();
    }

    function stopStress() {
        if (stressAnimId) {
            cancelAnimationFrame(stressAnimId);
            stressAnimId = null;
        }
        gsap.killTweensOf(stressBoxes);
    }

    function stopAll() {
        stopStress();
        if (fpsAnimId) {
            cancelAnimationFrame(fpsAnimId);
            fpsAnimId = null;
        }
        boxesContainer.innerHTML = '';
        stressBoxes = [];
    }

    goodBtn.addEventListener('click', startGoodAnimation);
    badBtn.addEventListener('click', startBadAnimation);
    stopBtn.addEventListener('click', stopAll);
}
