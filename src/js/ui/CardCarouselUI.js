
class CardCarouselUI {
    static renderAccordionCard(item, index, type) {
        const posterSrc = item.poster || '';
        
        let metaHtml = '';
        if (type === 'movie') {
            metaHtml = `
                <div class="card-meta-line">
                    <span>📅 ${item.year}</span>
                    <span>⏱ ${item.duration}</span>
                    <span>⭐ ${item.rating}</span>
                </div>`;
        } else if (type === 'book') {
            metaHtml = `
                <div class="card-meta-line">
                    <span>📅 ${item.year}</span>
                    <span>📄 ${item.pages} páginas</span>
                </div>`;
        } else if (type === 'game') {
            metaHtml = `
                <div class="card-meta-line">
                    <span>📅 ${item.year}</span>
                    <span>🎯 ${item.genre}</span>
                </div>`;
        }

        const hasPoster = !!item.poster;

        return `
            <div class="accordion-card ${!hasPoster ? 'no-poster' : ''}" data-index="${index}">
                <div class="accordion-card-blur" style="background: ${hasPoster ? `url('${posterSrc}')` : item.gradient || 'var(--bg-card)'}; background-size: cover;"></div>
                
                ${hasPoster ? `
                    <img class="accordion-card-img" src="${posterSrc}" alt="${item.title}" loading="lazy" onerror="this.src='src/assets/images/sorting-hat.png'; this.style.objectFit='contain';">
                ` : `
                    <div class="accordion-card-placeholder" style="display:flex; align-items:center; justify-content:center; height:100%; font-size:8rem; color:rgba(255,255,255,0.2);">
                        ${item.emoji || '🪄'}
                    </div>
                `}
                
                <div class="accordion-card-gradient"></div>
                
                <div class="accordion-card-collapsed"></div>
                
                <div class="accordion-card-expanded">
                    <h3>${item.title}</h3>
                    ${metaHtml}
                    <p class="card-synopsis">${item.synopsis}</p>
                </div>
            </div>
        `;
    }

    static setupAccordion(containerSelector) {}
}
