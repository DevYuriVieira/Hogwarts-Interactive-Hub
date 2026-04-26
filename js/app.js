// ============================================
// APP — Entry Point
// ============================================

import { getHouse, clearHouse } from './utils/storage.js';
import { $ } from './utils/dom.js';
import { HOUSES } from './data/houses-data.js';
import { SortingCeremony } from './components/sorting-ceremony.js';
import { renderNavbar } from './components/navbar.js';
import { ParticleSystem } from './components/particles.js';
import { registerRoute, initRouter } from './router.js';
import { renderHome } from './pages/home.js';
import { renderMovies } from './pages/movies.js';
import { renderBooks } from './pages/books.js';
import { renderSeries } from './pages/series.js';
import { renderFantasticBeasts } from './pages/fantastic-beasts.js';

let particles = null;

function applyTheme(houseId) {
    // Remove old themes
    document.body.classList.remove('theme-gryffindor', 'theme-slytherin', 'theme-ravenclaw', 'theme-hufflepuff');
    if (houseId) {
        document.body.classList.add(`theme-${houseId}`);
    }
}

function initSite(houseId) {
    applyTheme(houseId);
    document.body.classList.add('wand-cursor');

    // Render navbar
    renderNavbar($('#navbar-container'), houseId);

    // Register routes
    registerRoute('home', (c) => renderHome(c, houseId));
    registerRoute('movies', renderMovies);
    registerRoute('books', renderBooks);
    registerRoute('series', renderSeries);
    registerRoute('fantastic-beasts', renderFantasticBeasts);
    registerRoute('sorting', () => {
        const ceremony = new SortingCeremony((id) => {
            initSite(id);
            window.location.hash = 'home';
        });
        ceremony.start();
    });

    // Show main site
    $('#main-site').style.display = 'block';
    $('#main-site').style.animation = 'fadeIn 0.8s var(--ease-out)';

    // Init router
    if (!window.location.hash) window.location.hash = '#home';
    initRouter();

    // Init particles
    const canvas = $('#particles-canvas');
    if (canvas) {
        particles = new ParticleSystem(canvas);
        const house = HOUSES[houseId];
        if (house) particles.setColor(house.colors.neon);
        particles.start(35);
    }

    // Lumos/Nox easter egg
    initLumosNox();

    // Re-sort button
    $('#resort-btn')?.addEventListener('click', () => {
        clearHouse();
        location.reload();
    });
}

function initLumosNox() {
    let buffer = '';
    document.addEventListener('keydown', (e) => {
        buffer += e.key.toLowerCase();
        if (buffer.length > 10) buffer = buffer.slice(-10);

        if (buffer.endsWith('lumos')) {
            document.body.style.filter = 'brightness(1.3) contrast(0.95)';
            document.body.style.transition = 'filter 1s';
            buffer = '';
        } else if (buffer.endsWith('nox')) {
            document.body.style.filter = '';
            buffer = '';
        }
    });
}

// ---- BOOT ----
document.addEventListener('DOMContentLoaded', () => {
    const savedHouse = getHouse();
    const isSorting = window.location.hash === '#sorting';

    const runCeremony = () => {
        const ceremony = new SortingCeremony((houseId) => {
            initSite(houseId);
            if (window.location.hash === '#sorting' || !window.location.hash) {
                window.location.hash = 'home';
            }
        });
        ceremony.start();
    };

    if (isSorting || !savedHouse) {
        runCeremony();
    } else {
        initSite(savedHouse);
    }
});
