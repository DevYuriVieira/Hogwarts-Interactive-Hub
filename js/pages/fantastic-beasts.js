// ============================================
// FANTASTIC BEASTS PAGE
// ============================================

import { FANTASTIC_BEASTS } from '../data/fantastic-beasts-data.js';
import { renderCardGrid } from '../components/card-grid.js';

export function renderFantasticBeasts(container) {
    container.innerHTML = `
        <div style="padding-top:100px">
            <section class="section">
                <div class="container">
                    <h2 class="section-title">🧳 Animais Fantásticos</h2>
                    <div class="divider"></div>
                    <p class="section-subtitle">A trilogia de filmes que expande o Mundo Bruxo para além de Hogwarts</p>
                    <div id="fb-grid"></div>
                </div>
            </section>
        </div>
    `;
    renderCardGrid(container.querySelector('#fb-grid'), FANTASTIC_BEASTS, 'fb');
}
