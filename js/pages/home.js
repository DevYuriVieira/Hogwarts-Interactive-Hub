// ============================================
// HOME PAGE
// ============================================

import { HOUSES } from '../data/houses-data.js';
import { QuoteCarousel } from '../components/carousel.js';

let carousel = null;

export function renderHome(container, houseId) {
    const house = HOUSES[houseId] || HOUSES.gryffindor;

    container.innerHTML = `
        <section class="hero" id="hero">
            <div class="hero-content">
                <img src="house/${houseId}.png" alt="${house.name}" class="hero-house-crest-img">
                <p class="hero-welcome">Bem-vindo à ${house.name}</p>
                <h1 class="hero-title">Mundo Bruxo</h1>
                <p class="hero-subtitle">Explore o universo mágico de Harry Potter. Filmes, livros, a nova série e muito mais.</p>
                <div class="hero-actions">
                    <a href="#movies" class="btn btn-primary">🎬 Filmes</a>
                    <a href="#books" class="btn btn-outline">📚 Livros</a>
                    <a href="#series" class="btn btn-ghost">📰 Profeta Diário</a>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <h2 class="section-title">Sua Casa</h2>
                <div class="divider"></div>
                <div class="house-info">
                    <img src="house/${houseId}.png" alt="${house.name}" class="house-info-crest-img">
                    <div class="house-info-details">
                        <h3>${house.name}</h3>
                        <p style="color:var(--text-secondary)">${house.description}</p>
                        <div style="margin-top:var(--space-md);display:grid;grid-template-columns:1fr 1fr;gap:var(--space-sm);font-size:var(--fs-sm);">
                            <span style="color:var(--text-muted)">🏛️ Fundador: <strong style="color:var(--text-primary)">${house.founder}</strong></span>
                            <span style="color:var(--text-muted)">🐾 Animal: <strong style="color:var(--text-primary)">${house.animal}</strong></span>
                            <span style="color:var(--text-muted)">👻 Fantasma: <strong style="color:var(--text-primary)">${house.ghost}</strong></span>
                            <span style="color:var(--text-muted)">🌍 Elemento: <strong style="color:var(--text-primary)">${house.element}</strong></span>
                        </div>
                        <div class="house-info-values">
                            ${house.values.map(v => `<span class="house-info-value">${v}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" style="background:var(--bg-secondary)">
            <div class="container">
                <h2 class="section-title">Explorar</h2>
                <div class="divider"></div>
                <p class="section-subtitle">Mergulhe no universo mágico</p>
                <div class="nav-cards">
                    <a href="#movies" class="nav-card" style="animation:fadeInUp 0.5s var(--ease-out) 0.1s both">
                        <div class="nav-card-icon">🎬</div>
                        <h3 class="nav-card-title">Filmes</h3>
                        <p class="nav-card-count">8 filmes • 2001–2011</p>
                    </a>
                    <a href="#books" class="nav-card" style="animation:fadeInUp 0.5s var(--ease-out) 0.2s both">
                        <div class="nav-card-icon">📚</div>
                        <h3 class="nav-card-title">Livros</h3>
                        <p class="nav-card-count">7 livros + Cursed Child</p>
                    </a>
                    <a href="#series" class="nav-card" style="animation:fadeInUp 0.5s var(--ease-out) 0.3s both">
                        <div class="nav-card-icon">📺</div>
                        <h3 class="nav-card-title">Série HBO</h3>
                        <p class="nav-card-count badge-neon" style="display:inline-flex;padding:2px 8px;border-radius:20px;background:rgba(var(--neon-color-rgb),0.15);border:1px solid rgba(var(--neon-color-rgb),0.3)">EM BREVE • 2026</p>
                    </a>
                    <a href="#fantastic-beasts" class="nav-card" style="animation:fadeInUp 0.5s var(--ease-out) 0.4s both">
                        <div class="nav-card-icon">🧳</div>
                        <h3 class="nav-card-title">Animais Fantásticos</h3>
                        <p class="nav-card-count">3 filmes • 2016–2022</p>
                    </a>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <h2 class="section-title">Citações</h2>
                <div class="divider"></div>
                <div id="quote-carousel-container"></div>
            </div>
        </section>
    `;

    // Init carousel
    if (carousel) carousel.destroy();
    carousel = new QuoteCarousel(container.querySelector('#quote-carousel-container'));
    carousel.render();
}
