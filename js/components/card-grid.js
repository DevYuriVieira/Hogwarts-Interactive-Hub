// ============================================
// EXPANDABLE CARD GRID
// ============================================

export function renderCardGrid(container, items, type = 'movie') {
    const isBook = type === 'book';

    container.innerHTML = `
        <div class="card-grid" id="card-grid-${type}">
            ${items.map((item, index) => `
                <div class="card ${isBook ? 'book-card' : ''}" data-id="${item.id}" style="animation:fadeInUp 0.5s var(--ease-out) ${index * 0.08}s both">
                    <button class="card-close-btn" aria-label="Fechar">✕</button>
                    <div class="card-inner">
                        <div class="card-visual" style="background:${item.gradient}">
                            <span class="card-visual-number">${item.id}</span>
                            <span class="card-visual-icon">${item.emoji}</span>
                        </div>
                        <div class="card-body">
                            <div class="card-meta">
                                <span>📅 ${item.year}</span>
                                ${item.duration ? `<span>⏱️ ${item.duration}</span>` : ''}
                                ${item.pages ? `<span>📄 ${item.pages} páginas</span>` : ''}
                                ${item.director ? `<span>🎬 ${item.director}</span>` : ''}
                                ${item.rating ? `<span>⭐ ${item.rating}</span>` : ''}
                                ${item.isPlay ? '<span class="badge badge-neon">Peça Teatral</span>' : ''}
                            </div>
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-description">${item.synopsis}</p>
                            <div class="card-details">
                                ${item.boxOffice ? `<p style="margin-bottom:var(--space-sm)"><strong style="color:var(--text-gold)">Bilheteria:</strong> ${item.boxOffice}</p>` : ''}
                                ${item.cast ? `
                                    <p style="margin-bottom:var(--space-xs)"><strong style="color:var(--text-gold)">Elenco:</strong></p>
                                    <p style="font-size:var(--fs-sm);color:var(--text-secondary)">${item.cast.join(', ')}</p>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Expand/collapse logic
    const grid = container.querySelector('.card-grid');
    const cards = container.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.card-close-btn')) {
                e.stopPropagation();
                collapseAll(grid, cards);
                return;
            }
            if (card.classList.contains('active')) return;

            collapseAll(grid, cards);
            card.classList.add('active');
            grid.classList.add('has-active');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        card.querySelector('.card-close-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            collapseAll(grid, cards);
        });
    });
}

function collapseAll(grid, cards) {
    cards.forEach(c => c.classList.remove('active'));
    grid.classList.remove('has-active');
}
