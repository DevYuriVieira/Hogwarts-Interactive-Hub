// ============================================
// SERIES PAGE — Daily Prophet Style
// ============================================

import { SERIES } from '../data/series-data.js';

export function renderSeries(container) {
    const premiere = new Date(SERIES.premiereDate);

    container.innerHTML = `
        <div style="padding-top:100px">
            <section class="section">
                <div class="container" style="max-width:900px">
                    <div class="daily-prophet">
                        <div class="prophet-header">
                            <div class="prophet-masthead">O Profeta Diário</div>
                            <div class="prophet-date">Edição Especial • Abril de 2026</div>
                            <div class="prophet-motto">"Trazendo as notícias do Mundo Bruxo desde 1743"</div>
                        </div>

                        <div class="prophet-body">
                            <h2 class="prophet-headline">
                                CONFIRMADO: NOVA SÉRIE DE HARRY POTTER ESTREIA NO NATAL DE 2026
                            </h2>
                            <p class="prophet-subheadline">
                                Adaptação fiel dos livros promete ser a mais ambiciosa produção da HBO
                            </p>

                            <div class="prophet-photo">
                                <div class="prophet-photo-inner">⚡🏰✨</div>
                                <div class="prophet-photo-caption">
                                    Estúdios de Leavesden, onde a magia ganha vida novamente
                                </div>
                            </div>

                            <div class="prophet-countdown">
                                <div class="prophet-countdown-label">Contagem Regressiva para a Estreia</div>
                                <div class="prophet-countdown-timer" id="series-countdown"></div>
                            </div>

                            <div class="prophet-columns">
                                ${SERIES.articleText.map(p => `<p>${p}</p>`).join('')}
                            </div>

                            <h3 style="font-family:var(--font-heading);font-size:var(--fs-xl);color:#2a1a0a;text-align:center;margin:var(--space-2xl) 0 var(--space-lg);border-top:1px solid rgba(42,26,10,0.2);padding-top:var(--space-xl);">
                                Elenco Confirmado
                            </h3>

                            <div class="prophet-cast">
                                ${SERIES.cast.map(c => `
                                    <div class="prophet-cast-member">
                                        <div class="prophet-cast-avatar">${c.emoji}</div>
                                        <div class="prophet-cast-name">${c.actor}</div>
                                        <div class="prophet-cast-role">${c.character}</div>
                                    </div>
                                `).join('')}
                            </div>

                            <div style="text-align:center;margin-top:var(--space-2xl);padding-top:var(--space-lg);border-top:1px solid rgba(42,26,10,0.2);">
                                <p style="font-family:var(--font-heading);font-size:var(--fs-sm);color:#5a4a2a;">
                                    ${SERIES.platform} • Showrunner: ${SERIES.showrunner} • Diretor: ${SERIES.director}
                                </p>
                                <p style="font-family:var(--font-heading);font-size:var(--fs-sm);color:#7a6a4a;margin-top:var(--space-xs);">
                                    ${SERIES.totalSeasons} temporadas planejadas — Uma por livro
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;

    startCountdown(premiere);
}

function startCountdown(date) {
    function update() {
        const now = new Date();
        const diff = date - now;
        if (diff <= 0) {
            const el = document.getElementById('series-countdown');
            if (el) el.innerHTML = '<div style="font-family:var(--font-display);font-size:var(--fs-2xl);color:#2a1a0a;">JÁ DISPONÍVEL!</div>';
            return;
        }
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);

        const el = document.getElementById('series-countdown');
        if (el) {
            el.innerHTML = [
                { val: days, label: 'Dias' },
                { val: hours, label: 'Horas' },
                { val: mins, label: 'Min' },
                { val: secs, label: 'Seg' }
            ].map(u => `
                <div class="countdown-unit">
                    <div class="countdown-value">${String(u.val).padStart(2, '0')}</div>
                    <div class="countdown-label">${u.label}</div>
                </div>
            `).join('');
        }
    }
    update();
    setInterval(update, 1000);
}
