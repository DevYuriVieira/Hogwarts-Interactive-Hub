// ============================================
// SORTING CEREMONY — Full Interactive Experience
// ============================================

import { HOUSES, SORTING_QUESTIONS } from '../data/houses-data.js';
import { setHouse } from '../utils/storage.js';
import { $, wait, typewriter } from '../utils/dom.js';

// SVG crest outline paths for each house (simplified shield + symbol)
const CREST_PATHS = {
    gryffindor: 'M75,10 L75,10 C90,10 130,15 140,40 C150,65 145,90 130,110 C120,125 105,140 75,155 C45,140 30,125 20,110 C5,90 0,65 10,40 C20,15 60,10 75,10 Z M55,50 L60,40 L75,55 L90,40 L95,50 L80,65 L95,85 L85,95 L75,80 L65,95 L55,85 L70,65 Z',
    slytherin: 'M75,10 L75,10 C90,10 130,15 140,40 C150,65 145,90 130,110 C120,125 105,140 75,155 C45,140 30,125 20,110 C5,90 0,65 10,40 C20,15 60,10 75,10 Z M75,35 C65,35 45,50 45,70 C45,90 55,100 65,110 C70,115 73,120 75,130 C77,120 80,115 85,110 C95,100 105,90 105,70 C105,50 85,35 75,35 Z',
    ravenclaw: 'M75,10 L75,10 C90,10 130,15 140,40 C150,65 145,90 130,110 C120,125 105,140 75,155 C45,140 30,125 20,110 C5,90 0,65 10,40 C20,15 60,10 75,10 Z M75,35 L85,55 L110,58 L92,75 L97,100 L75,88 L53,100 L58,75 L40,58 L65,55 Z',
    hufflepuff: 'M75,10 L75,10 C90,10 130,15 140,40 C150,65 145,90 130,110 C120,125 105,140 75,155 C45,140 30,125 20,110 C5,90 0,65 10,40 C20,15 60,10 75,10 Z M50,55 C45,60 48,72 58,75 L58,88 C52,92 50,100 58,105 L75,110 L92,105 C100,100 98,92 92,88 L92,75 C102,72 105,60 100,55 C95,50 85,55 80,60 L75,62 L70,60 C65,55 55,50 50,55 Z'
};

const HAT_SPEECHES = [
    "Hmm... que temos aqui...",
    "Interessante... vejo muitas qualidades em você...",
    "Deixe-me olhar mais de perto..."
];

const HAT_DELIBERATION = [
    "Hmm... difícil, muito difícil...",
    "Vejo coragem... e também inteligência...",
    "Talento, sim... e uma sede de se provar...",
    "Então melhor ser..."
];

export class SortingCeremony {
    constructor(onComplete) {
        this.onComplete = onComplete;
        this.answers = [];
        this.currentQuestion = 0;
        this.overlay = $('#sorting-overlay');
        this.content = $('#sorting-content');
    }

    async start() {
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        await wait(500);
        await this.showHatIntro();
    }

    async showHatIntro() {
        this.content.innerHTML = `
            <div class="sorting-welcome">
                <img src="images/sorting-hat.png" alt="Chapéu Seletor" class="sorting-hat-img">
                <div class="sorting-hat-speech" id="hat-speech"></div>
            </div>
        `;

        const speechEl = $('#hat-speech');
        speechEl.style.cssText = 'font-family:var(--font-heading);font-size:var(--fs-xl);color:var(--text-gold);min-height:80px;max-width:500px;margin:0 auto;';

        for (const line of HAT_SPEECHES) {
            await wait(600);
            await typewriter(speechEl, line, 50);
            await wait(1000);
        }

        await wait(500);
        speechEl.style.transition = 'opacity 0.5s';
        speechEl.style.opacity = '0';
        await wait(600);

        // Show "begin" prompt
        speechEl.style.opacity = '1';
        speechEl.innerHTML = `
            <p style="color:var(--text-secondary);font-size:var(--fs-md);margin-bottom:var(--space-xl);">
                Responda-me três perguntas para revelar sua verdadeira casa.
            </p>
            <button class="btn btn-outline" id="start-quiz-btn" style="animation:fadeInUp 0.5s var(--ease-out) both;">
                ✨ Estou pronto
            </button>
        `;

        await new Promise(resolve => {
            $('#start-quiz-btn').addEventListener('click', resolve);
        });

        this.showQuestion(0);
    }

    showQuestion(index) {
        this.currentQuestion = index;
        const q = SORTING_QUESTIONS[index];

        this.content.innerHTML = `
            <div class="sorting-question" style="animation:fadeInScale 0.5s var(--ease-out)">
                <div class="sorting-progress">
                    ${SORTING_QUESTIONS.map((_, i) => `
                        <div class="sorting-progress-dot ${i < index ? 'filled' : ''} ${i === index ? 'current' : ''}"></div>
                    `).join('')}
                </div>
                <h3>${q.question}</h3>
                <div class="sorting-options">
                    ${q.options.map((opt, i) => `
                        <button class="sorting-option" data-house="${opt.house}" style="animation:fadeInUp 0.4s var(--ease-out) ${0.1 + i * 0.1}s both">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        this.content.querySelectorAll('.sorting-option').forEach(btn => {
            btn.addEventListener('click', () => this.handleAnswer(btn.dataset.house));
        });
    }

    async handleAnswer(house) {
        this.answers.push(house);

        // Fade out current question
        const questionEl = this.content.querySelector('.sorting-question');
        questionEl.style.transition = 'opacity 0.3s, transform 0.3s';
        questionEl.style.opacity = '0';
        questionEl.style.transform = 'translateY(-10px)';
        await wait(400);

        if (this.currentQuestion < SORTING_QUESTIONS.length - 1) {
            this.showQuestion(this.currentQuestion + 1);
        } else {
            await this.showDeliberation();
        }
    }

    calculateHouse() {
        const counts = {};
        this.answers.forEach(h => counts[h] = (counts[h] || 0) + 1);
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        // If tie, pick first one encountered
        return sorted[0][0];
    }

    async showDeliberation() {
        const houseId = this.calculateHouse();
        const house = HOUSES[houseId];

        this.content.innerHTML = `
            <div class="sorting-welcome" style="animation:fadeIn 0.5s">
                <img src="images/sorting-hat.png" alt="Chapéu Seletor" class="sorting-hat-img">
                <div class="sorting-hat-speech" id="hat-deliberation" style="font-family:var(--font-heading);font-size:var(--fs-xl);color:var(--text-gold);min-height:60px;max-width:500px;margin:0 auto;"></div>
            </div>
        `;

        const speechEl = $('#hat-deliberation');
        for (const line of HAT_DELIBERATION) {
            await typewriter(speechEl, line, 45);
            await wait(800);
        }

        await wait(300);
        await this.showWandCeremony(houseId);
    }

    async showWandCeremony(houseId) {
        const house = HOUSES[houseId];

        // Apply house theme immediately for neon color
        document.body.className = `theme-${houseId}`;

        this.content.innerHTML = `
            <div class="wand-ceremony active">
                <div class="wand-svg-container">
                    <svg viewBox="0 0 150 170" xmlns="http://www.w3.org/2000/svg">
                        <path class="crest-stroke" d="${CREST_PATHS[houseId]}"
                              stroke-dasharray="1000" stroke-dashoffset="1000"
                              style="animation: drawStroke 3s ease forwards 0.5s;" />
                    </svg>
                </div>
                <div class="wand-element visible">
                    <div class="wand-tip-glow"></div>
                </div>
                ${this.createParticles(20)}
            </div>
        `;

        // Wait for stroke drawing
        await wait(3800);

        // Flash and reveal
        await this.showHouseReveal(houseId);
    }

    async showHouseReveal(houseId) {
        const house = HOUSES[houseId];

        this.content.innerHTML = `
            <div class="house-reveal active">
                <div class="house-reveal-flash"></div>
                <img src="house/${houseId}.png" alt="${house.name}" class="house-reveal-crest-img">
                <div class="house-reveal-name">${house.name}!</div>
                <div class="house-reveal-message">${house.welcomeMessage}</div>
                <button class="btn btn-outline house-reveal-enter" id="enter-site-btn">
                    ⚡ Entrar no Mundo Bruxo
                </button>
            </div>
            ${this.createParticles(30)}
        `;

        setHouse(houseId);

        await new Promise(resolve => {
            $('#enter-site-btn').addEventListener('click', resolve);
        });

        // Fade out overlay
        this.overlay.style.transition = 'opacity 0.8s';
        this.overlay.style.opacity = '0';
        await wait(900);
        this.overlay.classList.remove('active');
        this.overlay.style.opacity = '';
        document.body.style.overflow = '';

        this.onComplete(houseId);
    }

    createParticles(count) {
        let html = '<div class="ceremony-particles">';
        for (let i = 0; i < count; i++) {
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = 3 + Math.random() * 4;
            const size = 2 + Math.random() * 4;
            html += `<div class="ceremony-particle" style="
                left:${left}%;
                width:${size}px;height:${size}px;
                animation-delay:${delay}s;
                animation-duration:${duration}s;
            "></div>`;
        }
        html += '</div>';
        return html;
    }
}
