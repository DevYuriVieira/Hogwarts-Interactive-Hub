// ============================================
// MOVIES PAGE
// ============================================

import { MOVIES } from '../data/movies-data.js';
import { renderCardGrid } from '../components/card-grid.js';

export function renderMovies(container) {
    container.innerHTML = `
        <div style="padding-top:100px">
            <section class="section">
                <div class="container">
                    <h2 class="section-title">⚡ Filmes Harry Potter</h2>
                    <div class="divider"></div>
                    <p class="section-subtitle">A saga completa em 8 filmes épicos que encantaram o mundo</p>
                    <div id="movies-grid"></div>
                </div>
            </section>
        </div>
    `;
    renderCardGrid(container.querySelector('#movies-grid'), MOVIES, 'movie');
}
