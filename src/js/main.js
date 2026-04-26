import { $, $$ } from './ui/DOMUtils.js';
import { ThemeManager } from './core/ThemeManager.js';
import { SortingHatUseCase } from './core/SortingHatUseCase.js';
import { SortingAnimationUI } from './ui/SortingAnimationUI.js';
import { CardCarouselUI } from './ui/CardCarouselUI.js';

import { MOVIES } from './data/moviesRepository.js';
import { FANTASTIC_BEASTS } from './data/fbRepository.js';
import { BOOKS } from './data/booksRepository.js';
import { GAMES } from './data/gamesRepository.js';
import { SPELLS } from './data/spellsRepository.js';
import { HOUSES, QUESTIONS } from './data/questionsMock.js';

class App {
    constructor() {
        this.userHouse = ThemeManager.getHouseFromStorage();
        this.init();
    }

    init() {
        // Theme init
        if (this.userHouse) {
            ThemeManager.applyTheme(this.userHouse.id);
            const badge = $('#navbar-house-badge');
            if (badge) {
                // Since we don't have badge SVGs yet, we can set the emoji or hide it.
                // Or if we had crest images: badge.src = `src/assets/images/crests/${this.userHouse.id}.png`;
                badge.style.display = 'none'; // hiding for now since it was empty
            }
        }

        // Routing
        const isSeriesPage = window.location.pathname.includes('series.html');
        if (isSeriesPage) {
            this.initSeriesPage();
        } else {
            this.initMainPage();
        }

        this.setupLumosNox();
    }

    initMainPage() {
        // Listen to navigate events from Marauder's Map
        window.addEventListener('navigate', (e) => this.renderPage(e.detail.page));
        
        // Listen to navbar clicks
        const navLinks = $$('.nav-link[data-page]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                this.renderPage(link.dataset.page);
            });
        });

        // Initial render
        this.renderPage('home'); // Default to home
    }

    initSeriesPage() {
        // Just a simple script for the series page
        const container = $('#series-content');
        if (container) {
            container.innerHTML = `
                <div class="header-content" style="text-align: center; padding: var(--space-4xl) 0;">
                    <h1 class="text-display">HARRY POTTER (HBO)</h1>
                    <p class="text-lead" style="color: var(--primary-color)">A próxima década de magia.</p>
                    <p style="max-width: 600px; margin: var(--space-lg) auto;">
                        A nova adaptação televisiva trará os sete livros de forma fiel ao longo de 10 anos.
                        Aguarde por novas atualizações.
                    </p>
                    <a href="index.html" class="btn-primary" style="margin-top: var(--space-xl); display: inline-block;">Voltar para o Mundo Bruxo</a>
                </div>
            `;
        }
    }

    // Router
    renderPage(pageId) {
        const content = $('#main-content');
        if (!content) return;

        content.innerHTML = ''; // clear

        switch(pageId) {
            case 'home':
                content.innerHTML = this.renderHome();
                this.setupSortingHat();
                break;
            case 'movies':
                content.innerHTML = this.renderMovies();
                CardCarouselUI.setupAccordion('#movies-accordion');
                CardCarouselUI.setupAccordion('#fb-accordion');
                break;
            case 'books':
                content.innerHTML = this.renderBooks();
                CardCarouselUI.setupAccordion('#books-accordion');
                break;
            case 'games':
                content.innerHTML = this.renderGames();
                CardCarouselUI.setupAccordion('#games-accordion');
                break;
            case 'spells':
                content.innerHTML = this.renderSpells();
                break;
            case 'series':
                window.location.href = 'series.html';
                break;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderHome() {
        return `
            <div class="header-content text-center" style="padding: var(--space-4xl) 0;">
                <h1 class="text-display neon-text" style="font-size: var(--fs-4xl);">BEM-VINDO A HOGWARTS</h1>
                <p class="text-lead">Descubra sua casa e explore o mundo mágico.</p>
                <button id="start-sorting-btn" class="btn-primary" style="margin-top: var(--space-xl); font-size: var(--fs-lg); padding: var(--space-md) var(--space-2xl);">
                    ${this.userHouse ? 'Refazer Seleção' : 'Colocar o Chapéu Seletor'}
                </button>
            </div>
            
            ${this.userHouse ? `
            <div class="house-showcase text-center" style="padding: var(--space-2xl); background: var(--bg-card); border-radius: var(--radius-lg); margin: var(--space-2xl) auto; max-width: 600px; border: 1px solid var(--primary-color);">
                <div style="font-size: 5rem; margin-bottom: var(--space-md);">${this.userHouse.emoji}</div>
                <h2 style="font-family: var(--font-heading); color: var(--primary-color);">Sua Casa: ${this.userHouse.name}</h2>
                <p style="color: var(--text-secondary); margin-top: var(--space-sm);">${this.userHouse.traits}</p>
            </div>` : ''}

            ${this.renderMarauderNav('home')}
        `;
    }

    setupSortingHat() {
        const btn = $('#start-sorting-btn');
        if (!btn) return;
        
        btn.addEventListener('click', async () => {
            const useCase = new SortingHatUseCase(QUESTIONS);
            // We simulate a fast random selection for now since we removed the multi-step UI logic
            // In a full implementation we'd render the questions.
            const houses = Object.keys(HOUSES);
            const randomHouseKey = houses[Math.floor(Math.random() * houses.length)];
            const houseData = HOUSES[randomHouseKey];
            
            await SortingAnimationUI.playSortingAnimation();
            ThemeManager.saveHouseToStorage({ id: randomHouseKey, ...houseData });
            ThemeManager.applyTheme(randomHouseKey);
            this.userHouse = ThemeManager.getHouseFromStorage();
            
            SortingAnimationUI.showResultModal(houseData.name, houseData, () => {
                this.renderPage('home');
            });
        });
    }

    renderMovies() {
        return `
            <div class="header-content text-center" style="padding: var(--space-4xl) 0;">
                <h2 class="text-display neon-text">A SAGA ORIGINAL</h2>
                <p class="text-lead">8 Filmes. Uma história que mudou uma geração.</p>
            </div>
            <section class="accordion-section">
                <div class="accordion-container" id="movies-accordion">
                    ${MOVIES.map((m, i) => CardCarouselUI.renderAccordionCard(m, i, 'movie')).join('')}
                </div>
            </section>

            <div class="header-content text-center" style="padding: var(--space-3xl) 0 var(--space-md) 0;">
                <h2 class="text-display neon-text">ANIMAIS FANTÁSTICOS</h2>
                <p class="text-lead">O Mundo Mágico antes de Harry Potter.</p>
            </div>
            <section class="accordion-section">
                <div class="accordion-container" id="fb-accordion">
                    ${FANTASTIC_BEASTS.map((m, i) => CardCarouselUI.renderAccordionCard(m, i, 'movie')).join('')}
                </div>
            </section>
            
            ${this.renderMarauderNav('movies')}
        `;
    }

    renderBooks() {
        return `
            <div class="header-content text-center" style="padding: var(--space-4xl) 0;">
                <h2 class="text-display neon-text">OS LIVROS</h2>
                <p class="text-lead">Onde a magia começou.</p>
            </div>
            <section class="accordion-section">
                <div class="accordion-container" id="books-accordion">
                    ${BOOKS.map((b, i) => CardCarouselUI.renderAccordionCard(b, i, 'book')).join('')}
                </div>
            </section>
            ${this.renderMarauderNav('books')}
        `;
    }

    renderGames() {
        return `
            <div class="header-content text-center" style="padding: var(--space-4xl) 0;">
                <h2 class="text-display neon-text">OS GAMES</h2>
                <p class="text-lead">A interatividade mágica.</p>
            </div>
            <section class="accordion-section">
                <div class="accordion-container" id="games-accordion">
                    ${GAMES.map((g, i) => CardCarouselUI.renderAccordionCard(g, i, 'game')).join('')}
                </div>
            </section>
            ${this.renderMarauderNav('games')}
        `;
    }

    renderSpells() {
        return `
            <div class="header-content text-center" style="padding: var(--space-4xl) 0;">
                <h2 class="text-display neon-text">GRIMÓRIO DE FEITIÇOS</h2>
                <p class="text-lead">Os encantos mais poderosos.</p>
            </div>
            <div class="spells-grid" style="max-width: 1200px; margin: 0 auto; display: grid; gap: var(--space-lg); grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); padding: 0 var(--space-xl);">
                ${SPELLS.map(s => `
                    <div class="spell-card" style="background: var(--bg-card); padding: var(--space-lg); border-radius: var(--radius-lg); border-left: 4px solid var(--primary-color);">
                        <div class="spell-incantation" style="font-family: var(--font-heading); font-size: var(--fs-xl); color: var(--neon-color); margin-bottom: var(--space-xs);">${s.incantation}</div>
                        <div class="spell-type" style="font-size: var(--fs-xs); text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.5); margin-bottom: var(--space-md);">${s.type}</div>
                        <div class="spell-effect" style="color: var(--text-primary); line-height: 1.5; margin-bottom: var(--space-md);">${s.effect}</div>
                        <div class="spell-desc" style="font-size: var(--fs-sm); color: var(--text-secondary);">${s.description}</div>
                    </div>
                `).join('')}
            </div>
            ${this.renderMarauderNav('spells')}
        `;
    }

    renderMarauderNav(activeTab) {
        const tabs = [
            { id: 'movies', icon: '<i class="fa-solid fa-film"></i>', label: 'Filmes' },
            { id: 'books', icon: '<i class="fa-solid fa-book"></i>', label: 'Livros' },
            { id: 'series', icon: '<i class="fa-solid fa-tv"></i>', label: 'Série HBO' },
            { id: 'games', icon: '<i class="fa-solid fa-gamepad"></i>', label: 'Games' },
            { id: 'spells', icon: '<i class="fa-solid fa-wand-magic-sparkles"></i>', label: 'Feitiços' }
        ];

        const mapState = window.marauderMapOpen ? 'is-open' : '';

        return `
            <div class="marauder-wrapper">
                <div class="marauder-map ${mapState}" id="marauder-map" onclick="this.classList.add('is-open'); window.marauderMapOpen = true;">
                    
                    <div class="map-cover">
                        <div class="map-cover-title">O MAPA<br>DO MAROTO</div>
                        <div class="map-cover-subtitle">Os Srs. Aluado, Rabicho, Almofadinhas e Pontas têm o orgulho de apresentar</div>
                        <div class="marauder-footprints" style="top: 20px; left: 20px; opacity: 0.3;">
                            <div class="footprint f1"></div><div class="footprint f2"></div><div class="footprint f3"></div>
                        </div>
                        <div class="map-cover-hint">👉 Clique para abrir 👈</div>
                    </div>

                    <div class="map-content">
                        <div class="map-header">
                            <div class="map-title">HOGWARTS E ARREDORES</div>
                            <div style="font-family: var(--font-heading); color: #5a3e2b; margin-top: 10px;">Juro Solenemente Não Fazer Nada de Bom</div>
                        </div>

                        <div class="map-layout">
                            <div class="map-region" style="grid-column: 1;">
                                <div class="map-region-title">Jardins</div>
                                <div class="house-room">Cabana de Hagrid</div>
                                <div class="house-room" style="margin-top: 10px;">Floresta Proibida</div>
                            </div>
                            <div class="map-region map-hogwarts">
                                <div class="map-region-title" style="font-size: var(--fs-xl);">Castelo de Hogwarts</div>
                                <div class="map-houses">
                                    <div class="house-room" style="border-left: 4px solid #c0392b;">Salão Comunal Grifinória</div>
                                    <div class="house-room" style="border-left: 4px solid #27ae60;">Salão Comunal Sonserina</div>
                                    <div class="house-room" style="border-left: 4px solid #2980b9;">Salão Comunal Corvinal</div>
                                    <div class="house-room" style="border-left: 4px solid #f39c12;">Salão Comunal Lufa-Lufa</div>
                                </div>
                                <div class="house-room" style="margin-top: 10px; border: 1px dashed rgba(90, 62, 43, 0.5);">Grande Salão</div>
                            </div>
                            <div class="map-region" style="grid-column: 3;">
                                <div class="map-region-title">Hogsmeade</div>
                                <div class="house-room">Três Vassouras</div>
                                <div class="house-room" style="margin-top: 10px;">Dedos de Mel</div>
                            </div>
                        </div>

                        <div class="marauder-tabs">
                            ${tabs.map(t => `
                                <button class="marauder-tab ${t.id === activeTab ? 'active' : ''}" 
                                        data-page="${t.id}"
                                        onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('navigate',{detail:{page:'${t.id}'}}))">
                                    ${t.icon} ${t.label}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupLumosNox() {
        const input = $('#spell-input');
        const applySpell = (spell) => {
            if (spell === 'lumos' || spell === 'lumus') {
                document.body.classList.add('lumos-active');
                if (input) input.value = '';
            } else if (spell === 'nox') {
                document.body.classList.remove('lumos-active');
                if (input) input.value = '';
            }
        };

        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') applySpell(input.value.trim().toLowerCase());
            });
        }

        // Easter egg
        let keys = '';
        window.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            keys += e.key.toLowerCase();
            if (keys.endsWith('lumos') || keys.endsWith('lumus')) applySpell('lumos');
            if (keys.endsWith('nox')) applySpell('nox');
            if (keys.length > 20) keys = keys.slice(-10);
        });
    }
}

// Global Init
document.addEventListener('DOMContentLoaded', () => {
    window.mundoBruxoApp = new App();
});
