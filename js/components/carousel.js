// ============================================
// QUOTE CAROUSEL
// ============================================

import { QUOTES } from '../data/quotes-data.js';

export class QuoteCarousel {
    constructor(container) {
        this.container = container;
        this.current = 0;
        this.interval = null;
    }

    render() {
        this.container.innerHTML = `
            <div class="carousel">
                <div style="font-size:2rem;margin-bottom:var(--space-md);opacity:0.3;">❝</div>
                <p class="carousel-quote visible" id="carousel-quote">${QUOTES[0].text}</p>
                <p class="carousel-author visible" id="carousel-author">— ${QUOTES[0].author}, ${QUOTES[0].source}</p>
                <div class="carousel-dots" id="carousel-dots">
                    ${QUOTES.slice(0, 8).map((_, i) =>
                        `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Citação ${i + 1}"></button>`
                    ).join('')}
                </div>
            </div>
        `;

        // Dot click
        this.container.querySelectorAll('.carousel-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                this.goTo(parseInt(dot.dataset.index));
            });
        });

        this.startAutoplay();
    }

    goTo(index) {
        this.current = index;
        const quoteEl = this.container.querySelector('#carousel-quote');
        const authorEl = this.container.querySelector('#carousel-author');

        quoteEl.classList.remove('visible');
        authorEl.classList.remove('visible');

        setTimeout(() => {
            const q = QUOTES[index % QUOTES.length];
            quoteEl.textContent = q.text;
            authorEl.textContent = `— ${q.author}, ${q.source}`;
            quoteEl.classList.add('visible');
            authorEl.classList.add('visible');

            this.container.querySelectorAll('.carousel-dot').forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
        }, 400);
    }

    startAutoplay() {
        this.interval = setInterval(() => {
            this.goTo((this.current + 1) % Math.min(QUOTES.length, 8));
        }, 6000);
    }

    destroy() {
        clearInterval(this.interval);
    }
}
