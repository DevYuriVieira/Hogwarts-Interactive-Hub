// ============================================
// PARTICLE SYSTEM (Canvas)
// ============================================

export class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.running = false;
        this.color = { r: 255, g: 215, b: 0 };
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setColor(hexOrRgb) {
        if (typeof hexOrRgb === 'string' && hexOrRgb.startsWith('#')) {
            const hex = hexOrRgb.replace('#', '');
            this.color = {
                r: parseInt(hex.substring(0, 2), 16),
                g: parseInt(hex.substring(2, 4), 16),
                b: parseInt(hex.substring(4, 6), 16)
            };
        }
    }

    start(count = 40) {
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle());
        }
        this.running = true;
        this.animate();
    }

    stop() {
        this.running = false;
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: -Math.random() * 0.5 - 0.2,
            opacity: Math.random() * 0.5 + 0.1,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.02 + 0.01
        };
    }

    animate() {
        if (!this.running) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += p.pulseSpeed;
            const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

            // Reset if out of bounds
            if (p.y < -10 || p.x < -10 || p.x > this.canvas.width + 10) {
                p.x = Math.random() * this.canvas.width;
                p.y = this.canvas.height + 10;
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${currentOpacity})`;
            this.ctx.fill();

            // Glow
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${currentOpacity * 0.15})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}
