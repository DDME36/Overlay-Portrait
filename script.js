// ========== PARTICLE SYSTEM ==========
class ParticleSystem {
    constructor(container, count = 40) {
        this.container = container;
        this.count = count;
        this.init();
    }

    init() {
        for (let i = 0; i < this.count; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
        particle.style.animationDelay = (Math.random() * 8) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        this.container.appendChild(particle);
    }
}

// ========== SAND REVEAL EFFECT ==========
class SandRevealEffect {
    constructor(imageElement, particleContainer) {
        this.image = imageElement;
        this.container = particleContainer;
        this.particleCount = 25;
        this.loopDuration = 10000;  // 10 วินาที sync กับ CSS
        this.init();
    }

    init() {
        this.createParticles();
        setInterval(() => this.createParticles(), this.loopDuration);
    }

    createParticles() {
        this.container.innerHTML = '';
        for (let i = 0; i < this.particleCount; i++) {
            this.createSandParticle(i);
        }
    }

    createSandParticle(index) {
        const particle = document.createElement('div');
        particle.className = 'sand-particle';
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 100;
        const startX = Math.cos(angle) * distance;
        const startY = Math.sin(angle) * distance;
        
        // ใช้ขนาดของ container จริง
        const containerWidth = this.container.offsetWidth || 250;
        const containerHeight = this.container.offsetHeight || 300;
        const targetX = Math.random() * containerWidth;
        const targetY = Math.random() * containerHeight;
        
        particle.style.left = targetX + 'px';
        particle.style.top = targetY + 'px';
        particle.style.setProperty('--start-x', startX + 'px');
        particle.style.setProperty('--start-y', startY + 'px');
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        const delay = (index / this.particleCount) * 1.2;
        particle.style.animation = `sand-fly-in 10s ease-in-out ${delay}s infinite`;  // 10 วินาที
        const colors = ['#f0d78c', '#c9a227', '#ffd700', '#e6c35c'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        this.container.appendChild(particle);
    }
}

// ========== STARS SYSTEM ==========
class StarsSystem {
    constructor(container, count = 30) {
        this.container = container;
        this.count = count;
        this.init();
    }

    init() {
        for (let i = 0; i < this.count; i++) {
            this.createStar();
        }
    }

    createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 2 + 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        star.style.animationDelay = (Math.random() * 3) + 's';
        this.container.appendChild(star);
    }
}

// ========== SPARKLE SYSTEM ==========
class SparkleSystem {
    constructor(container) {
        this.container = container;
        this.maxSparkles = 15;
        this.sparkles = [];
        this.start();
    }

    start() {
        setInterval(() => this.createSparkle(), 600);
    }

    createSparkle() {
        if (this.sparkles.length >= this.maxSparkles) {
            const old = this.sparkles.shift();
            if (old && old.parentNode) old.remove();
        }

        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 6 + 4;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        const colors = ['#ffffff', '#ffd700', '#87ceeb'];
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        this.container.appendChild(sparkle);
        this.sparkles.push(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) sparkle.remove();
            const idx = this.sparkles.indexOf(sparkle);
            if (idx > -1) this.sparkles.splice(idx, 1);
        }, 3000);
    }
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        new ParticleSystem(particleContainer, 40);
    }

    const mightybitLogo = document.querySelector('.mightybit-logo');
    const sandParticles = document.getElementById('sand-particles');
    if (mightybitLogo && sandParticles) {
        new SandRevealEffect(mightybitLogo, sandParticles);
    }

    const sparkleContainer = document.getElementById('sparkles');
    if (sparkleContainer) {
        new SparkleSystem(sparkleContainer);
    }

    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        new StarsSystem(starsContainer, 30);
    }

    console.log('✨ Portrait Stream Overlay initialized!');
});
