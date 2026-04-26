// ============================================
// BOOKS PAGE
// ============================================

import { BOOKS } from '../data/books-data.js';
import { renderCardGrid } from '../components/card-grid.js';

export function renderBooks(container) {
    container.innerHTML = `
        <div style="padding-top:100px">
            <section class="section">
                <div class="container">
                    <h2 class="section-title">📚 Livros Harry Potter</h2>
                    <div class="divider"></div>
                    <p class="section-subtitle">Os 7 livros originais de J.K. Rowling + A Criança Amaldiçoada</p>
                    <div id="books-grid"></div>
                </div>
            </section>
        </div>
    `;
    renderCardGrid(container.querySelector('#books-grid'), BOOKS, 'book');
}
