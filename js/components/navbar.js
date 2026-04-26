// ============================================
// NAVBAR COMPONENT
// ============================================

import { HOUSES } from '../data/houses-data.js';
import { $ } from '../utils/dom.js';

export function renderNavbar(container, houseId) {
    const house = houseId ? HOUSES[houseId] : null;

    container.innerHTML = `
        <nav class="navbar" id="main-navbar">
            <div class="navbar-inner">
                <a href="#home" class="navbar-brand">
                    <span>⚡</span>
                    <span>Mundo Bruxo</span>
                </a>
                <div class="navbar-links" id="nav-links">
                    <a href="#home" class="nav-link active" data-page="home">Início</a>
                    <a href="#movies" class="nav-link" data-page="movies">Filmes</a>
                    <a href="#books" class="nav-link" data-page="books">Livros</a>
                    <a href="#series" class="nav-link" data-page="series">Profeta Diário</a>
                    <a href="#fantastic-beasts" class="nav-link" data-page="fantastic-beasts">Animais Fantásticos</a>
                    ${house ? `<div class="nav-house-badge" title="${house.name}"><img src="house/${houseId}.png" alt="${house.name}" style="width:100%;height:100%;object-fit:contain;"></div>` : ''}
                </div>
                <button class="navbar-mobile-toggle" id="mobile-toggle" aria-label="Menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </nav>
    `;

    // Mobile toggle
    $('#mobile-toggle').addEventListener('click', () => {
        $('#nav-links').classList.toggle('open');
    });

    // Scroll effect
    window.addEventListener('scroll', () => {
        const nav = $('#main-navbar');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Close mobile on link click
    container.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            $('#nav-links').classList.remove('open');
        });
    });
}

export function setActiveLink(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
}
