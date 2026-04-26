

const App = {
    currentPage: null,
    userHouse: localStorage.getItem('userHouse') || null,
    answers: [],
    mapInterval: null,

    init() {
        if (this.userHouse) {
            document.body.className = 'theme-' + this.userHouse;
        }
        SoundEngine.init();
        this.navigate('home', true);
        this.startQuotesRotation();
        this.setupParticles();
        this.setupSpellInput();
        this.setupLazyAnimations();
        window.addEventListener('scroll', () => {}, { passive: true });
    },

    setupSpellInput() {
        const input = document.getElementById('spell-input');
        if (!input) return;

        input.addEventListener('input', (e) => {
            const spell = e.target.value.toLowerCase().trim();
            
            if (spell === 'lumos') {
                document.body.className = 'theme-lumos';
                input.value = '';
                input.blur();
            } else if (spell === 'nox') {
                document.body.className = this.userHouse ? 'theme-' + this.userHouse : '';
                input.value = '';
                input.blur();
            }
        });
    },

    navigate(pageId, immediate = false) {
        if (this.currentPage === pageId && !immediate) return;
        if (!immediate) SoundEngine.play('navigate');

        const main = document.querySelector('main');
        if (!immediate) main.classList.add('pensieve-blur');

        setTimeout(() => {
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.toggle('active', l.dataset.page === pageId);
            });

            document.querySelectorAll('.page').forEach(p => {
                p.classList.remove('active');
                p.style.display = 'none';
            });

            const target = document.getElementById('page-' + pageId);
            if (!target) return;


            switch(pageId) {
                case 'home':       target.innerHTML = this.renderHome(); break;
                case 'movies':     target.innerHTML = this.renderMovies(); break;
                case 'books':      target.innerHTML = this.renderBooks(); break;
                case 'series':     target.innerHTML = this.renderSeries(); break;
                case 'games':      target.innerHTML = this.renderGames(); break;
                case 'spells':     target.innerHTML = this.renderSpells(); break;
                case 'characters': target.innerHTML = this.renderCharacters(); break;
            }

            target.style.display = 'block';
            target.classList.add('active');


            if (['movies','books','games'].includes(pageId)) {
                target.querySelectorAll('.accordion-container').forEach(c => this.setupAccordion(c));
            }
            
            if (!immediate) main.classList.remove('pensieve-blur');
            this.currentPage = pageId;
            window.scrollTo(0, 0);
        }, immediate ? 0 : 400);
    },


    renderHome() {
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        let houseHtml = '';
        
        if (this.userHouse) {
            const details = HOUSE_DETAILS[this.userHouse.toLowerCase()];
            houseHtml = `
                <div class="house-showcase active" style="margin: 100px auto; max-width: 1100px; text-align:center; animation: fadeInUp 1s ease-out;">
                    <div style="display:flex; justify-content:center; margin-bottom: 40px;">
                        <div style="animation: levitate 4s ease-in-out infinite;">
                            <img src="src/assets/images/houses/${this.userHouse.toLowerCase()}.png" style="width:240px; filter: drop-shadow(0 0 50px var(--neon-color));">
                        </div>
                    </div>
                    <h2 style="color:var(--neon-color); font-size:5.5rem; font-family:var(--font-heading); letter-spacing:10px; text-shadow: var(--neon-glow-strong); margin-bottom: 40px; text-transform: uppercase;">${this.userHouse.toUpperCase()}</h2>
                    <div class="magic-border-card" style="margin: 40px auto; max-width: 900px;">
                        <div class="magic-border-inner house-details-grid" style="display:grid; grid-template-columns: repeat(2, 1fr); gap: 40px; text-align:left; padding: 60px; backdrop-filter: blur(20px);">
                            <div style="grid-column: span 2; font-style:italic; font-size:1.4rem; color:var(--text-primary); border-bottom: 2px solid var(--neon-color); box-shadow: 0 4px 10px -5px var(--neon-color); padding-bottom:25px; margin-bottom:25px; line-height: 1.6; text-align:center;">"${details.description}"</div>
                            <div style="font-size: 1.2rem;"><span style="color:var(--neon-color); font-weight:900; text-transform:uppercase; letter-spacing:2px; font-size:0.8rem; display:block; margin-bottom:5px;">Fundador</span> ${details.founder}</div>
                            <div style="font-size: 1.2rem;"><span style="color:var(--neon-color); font-weight:900; text-transform:uppercase; letter-spacing:2px; font-size:0.8rem; display:block; margin-bottom:5px;">Mascote</span> ${details.animal}</div>
                            <div style="font-size: 1.2rem;"><span style="color:var(--neon-color); font-weight:900; text-transform:uppercase; letter-spacing:2px; font-size:0.8rem; display:block; margin-bottom:5px;">Cores</span> ${details.colors}</div>
                            <div style="font-size: 1.2rem;"><span style="color:var(--neon-color); font-weight:900; text-transform:uppercase; letter-spacing:2px; font-size:0.8rem; display:block; margin-bottom:5px;">Relíquia</span> ${details.relic}</div>
                            <div style="font-size: 1.2rem;"><span style="color:var(--neon-color); font-weight:900; text-transform:uppercase; letter-spacing:2px; font-size:0.8rem; display:block; margin-bottom:5px;">Elemento</span> ${details.element}</div>
                            <div style="font-size: 1.2rem;"><span style="color:var(--neon-color); font-weight:900; text-transform:uppercase; letter-spacing:2px; font-size:0.8rem; display:block; margin-bottom:5px;">Fantasma</span> ${details.ghost}</div>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="hero-section" style="padding: 240px 20px; text-align:center; background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url('src/assets/images/hogwarts-hero.png'); background-size:cover; background-position: center; border-bottom: 3px solid var(--neon-color);">
                <div style="animation: fadeInUp 1s ease-out;">
                    <h1 style="font-size: clamp(3rem, 12vw, 8rem); color:var(--neon-color); text-shadow: var(--neon-glow-strong); font-family:var(--font-heading); line-height:0.85;">BEM-VINDO A<br>HOGWARTS</h1>
                    <p style="font-size: 1.6rem; margin-top:30px; opacity:0.8; font-family:var(--font-prophet);">O portal definitivo para o Universo Bruxo.</p>
                    <button class="btn btn-primary btn-lg" style="margin-top:60px; padding: 20px 50px; border-radius:50px; font-weight:bold; box-shadow: var(--neon-glow-strong);" onclick="App.startSorting()">
                        ${this.userHouse ? '🎩 REFAZER SELEÇÃO' : '🎩 CHAPÉU SELETOR'}
                    </button>
                </div>
            </div>
            ${houseHtml}
            <div class="magic-border-card" style="max-width:900px; margin: 120px auto;">
                <div class="magic-border-inner" style="text-align:center; padding: 80px 40px;">
                    <div id="rotating-quote" style="transition: opacity 0.8s;">
                        <p style="font-family:var(--font-prophet); font-size:2.2rem; font-style:italic; color:var(--text-secondary); line-height:1.4;">"${randomQuote.text}"</p>
                        <div style="margin-top:30px; font-family:var(--font-heading); color:var(--text-gold); letter-spacing:4px;">— ${randomQuote.author}</div>
                    </div>
                </div>
            </div>
            ${this.renderMarauderNav('home')}
        `;
    },

    renderMovies() {
        return `
            <div style="text-align:center; padding: 100px 0 40px 0;">
                <h2 style="font-family:var(--font-heading); font-size:4rem; color:var(--neon-color); text-shadow: var(--neon-glow);">A SAGA ORIGINAL</h2>
            </div>
            <section class="accordion-section">
                <div class="accordion-container">
                    ${MOVIES.map((m,i) => CardCarouselUI.renderAccordionCard(m,i,'movie')).join('')}
                </div>
            </section>
            <div style="text-align:center; padding: 100px 0 40px 0;">
                <h2 style="font-family:var(--font-heading); font-size:4rem; color:var(--neon-color); text-shadow: var(--neon-glow);">ANIMAIS FANTÁSTICOS</h2>
            </div>
            <section class="accordion-section">
                <div class="accordion-container">
                    ${FANTASTIC_BEASTS.map((m,i) => CardCarouselUI.renderAccordionCard(m,i,'movie')).join('')}
                </div>
            </section>
            ${this.renderMarauderNav('movies')}
        `;
    },

    renderBooks() {
        return `
            <div style="text-align:center; padding: 100px 0 40px 0;">
                <h2 style="font-family:var(--font-heading); font-size:4rem; color:var(--neon-color); text-shadow: var(--neon-glow);">BIBLIOTECA DE HOGWARTS</h2>
            </div>
            <section class="accordion-section">
                <div class="accordion-container">
                    ${BOOKS.map((b,i) => CardCarouselUI.renderAccordionCard(b,i,'book')).join('')}
                </div>
            </section>
            ${this.renderMarauderNav('books')}
        `;
    },

    renderSeries() {
        const premiere = new Date(SERIES.premiereDate);
        const diff = premiere - new Date();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const html = `
            <div class="daily-prophet-wrapper" style="padding: 100px 20px; background: #dcd0b9; min-height:100vh;">
                <div class="daily-prophet-container" style="max-width:1200px; margin:0 auto; background:#e9dcb5; padding:60px; border:2px solid #000; font-family:'Lora', serif; color:#000; box-shadow: 0 40px 100px rgba(0,0,0,0.4);">
                    <div style="text-align:center; border-bottom:10px double #000; padding-bottom:30px; margin-bottom:50px; color:#000;">
                        <h1 style="font-family:'Cinzel'; font-weight:900; font-size:6rem; margin:0; line-height:0.8; color:#000;">O PROFETA DIÁRIO</h1>
                        <div style="display:flex; justify-content:space-between; border-top:2px solid #000; padding:15px 0; margin-top:15px; font-weight:bold; text-transform:uppercase; font-size:1rem; letter-spacing:2px; color:#000;">
                            <span style="color:#000;">Edição Extraordinária</span>
                            <span>⭐️⭐️⭐️⭐️⭐️</span>
                            <span style="color:#000;">Londres, 2026 — 5 Nuques</span>
                        </div>
                    </div>
                    <div class="daily-prophet-content" style="display:grid; grid-template-columns: 2fr 1fr; gap:60px; color:#000;">
                        <div>
                            <div style="background:#000; padding:12px; margin-bottom:40px; transform: rotate(-1deg);">
                                <img src="src/assets/images/posters/series.png" class="magic-photo" style="width:100%; filter:grayscale(1) contrast(1.3);">
                            </div>
                            <h2 style="font-family:'Cinzel'; font-size:3.5rem; line-height:1; font-weight:900; margin-bottom:30px; text-transform:uppercase; color:#000;">A Magia do Reboot: HBO confirma série épica!</h2>
                            <div style="column-count:2; column-gap:40px; text-align:justify; font-size:1.15rem; line-height:1.6; color:#000;">
                                <p style="color:#000;"><span style="float:left; font-size:5rem; line-height:0.8; font-family:'Cinzel'; margin-right:15px; font-weight:900; color:#000;">N</span>os corredores do Ministério, o boato se tornou verdade. A Warner Bros. Discovery anunciou a maior produção da década.</p>
                                <p style="color:#000;">${SERIES.description}</p>
                            </div>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:40px;">
                            <div style="border:2px solid #000; padding:30px; background: rgba(0,0,0,0.03); color:#000;">
                                <h4 style="font-family:'Cinzel'; border-bottom:2px solid #000; padding-bottom:10px; margin-bottom:20px; font-weight:900; color:#000;">CURIOSIDADES BRUXAS</h4>
                                <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:15px; color:#000;">
                                    ${SERIES.highlights.map(h => `<li style="font-size:1rem; display:flex; gap:12px; color:#000;"><span style="color:#000;">⚡</span> ${h}</li>`).join('')}
                                </ul>
                            </div>
                            <div style="padding:30px; background:#fff; border:1px solid #000; box-shadow: 10px 10px 0 #000; color:#000;">
                                <h4 style="font-family:'Cinzel'; margin-bottom:15px; font-weight:900; color:#000;">ÚLTIMA HORA</h4>
                                <p style="font-size:0.95rem; font-style:italic; color:#000;">"Fontes anônimas indicam que os testes de elenco para o trio de ouro já começaram em Hogwarts."</p>
                            </div>
                        </div>
                    </div>

                    <div style="border:2px solid #000; padding:30px 40px; margin-top:60px; text-align:center; background:rgba(0,0,0,0.03);">
                        <h3 style="font-family:'Cinzel'; font-weight:900; font-size:1rem; letter-spacing:6px; color:#000; margin-bottom:20px;">⏳ CONTAGEM REGRESSIVA PARA A ESTREIA</h3>
                        <div id="prophet-countdown" style="display:flex; justify-content:center; gap:40px;">
                            <div><span class="countdown-num" id="cd-days" style="font-family:'Cinzel'; font-size:4.5rem; font-weight:900; color:#000; line-height:1;">${String(days).padStart(2,'0')}</span><div style="font-family:'Cinzel'; font-size:0.8rem; letter-spacing:4px; color:#000; margin-top:5px;">DIAS</div></div>
                            <div><span class="countdown-num" id="cd-hours" style="font-family:'Cinzel'; font-size:4.5rem; font-weight:900; color:#000; line-height:1;">${String(hours).padStart(2,'0')}</span><div style="font-family:'Cinzel'; font-size:0.8rem; letter-spacing:4px; color:#000; margin-top:5px;">HORAS</div></div>
                            <div><span class="countdown-num" id="cd-minutes" style="font-family:'Cinzel'; font-size:4.5rem; font-weight:900; color:#000; line-height:1;">${String(minutes).padStart(2,'0')}</span><div style="font-family:'Cinzel'; font-size:0.8rem; letter-spacing:4px; color:#000; margin-top:5px;">MINUTOS</div></div>
                            <div><span class="countdown-num" id="cd-seconds" style="font-family:'Cinzel'; font-size:4.5rem; font-weight:900; color:#000; line-height:1;">${String(seconds).padStart(2,'0')}</span><div style="font-family:'Cinzel'; font-size:0.8rem; letter-spacing:4px; color:#000; margin-top:5px;">SEGUNDOS</div></div>
                        </div>
                    </div>

                    <div class="prophet-columns" style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:0; margin-top:60px; border-top:3px solid #000; padding-top:30px;">
                        <div style="padding:0 25px 0 0; border-right:1px solid #000;">
                            <h4 style="font-family:'UnifrakturMaguntia'; font-size:1.8rem; color:#000; margin-bottom:15px;">A Produção</h4>
                            <p style="font-size:0.95rem; text-align:justify; line-height:1.7; color:#000;">A Warner Bros. Television anunciou oficialmente a produção da série em parceria com a plataforma MAX. Com J.K. Rowling como produtora executiva, cada temporada adapta fielmente um dos sete volumes da saga — algo que os filmes nunca puderam fazer.</p>
                        </div>
                        <div style="padding:0 25px; border-right:1px solid #000;">
                            <h4 style="font-family:'UnifrakturMaguntia'; font-size:1.8rem; color:#000; margin-bottom:15px;">O Elenco</h4>
                            <p style="font-size:0.95rem; text-align:justify; line-height:1.7; color:#000;">As audições para os papéis principais ainda estão em andamento. A produtora confirmou que busca rostos novos para Harry, Hermione e Ron, repetindo a fórmula bem-sucedida dos filmes de 2001. Nomes serão divulgados em breve.</p>
                        </div>
                        <div style="padding:0 0 0 25px;">
                            <h4 style="font-family:'UnifrakturMaguntia'; font-size:1.8rem; color:#000; margin-bottom:15px;">O Que Esperar</h4>
                            <p style="font-size:0.95rem; text-align:justify; line-height:1.7; color:#000;">Fãs podem esperar cenas e personagens jamais adaptados para as telas: subtramas removidas, arcos de personagens secundários desenvolvidos e toda a riqueza que apenas o formato televisivo pode oferecer ao universo de Rowling.</p>
                        </div>
                    </div>
                </div>
            </div>
            ${this.renderMarauderNav('series')}
        `;

        setTimeout(() => this.startCountdown(), 100);
        return html;
    },

    startCountdown() {
        if (this.countdownInterval) clearInterval(this.countdownInterval);
        this.countdownInterval = setInterval(() => {
            const premiere = new Date(SERIES.premiereDate);
            const diff = premiere - new Date();
            if (diff <= 0) { clearInterval(this.countdownInterval); return; }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            const dEl = document.getElementById('cd-days');
            const hEl = document.getElementById('cd-hours');
            const mEl = document.getElementById('cd-minutes');
            const sEl = document.getElementById('cd-seconds');
            if (dEl) dEl.textContent = String(d).padStart(2,'0');
            if (hEl) hEl.textContent = String(h).padStart(2,'0');
            if (mEl) mEl.textContent = String(m).padStart(2,'0');
            if (sEl) sEl.textContent = String(s).padStart(2,'0');
        }, 1000);
    },

    renderGames() {
        return `
            <div style="text-align:center; padding: 100px 0 40px 0;">
                <h2 style="font-family:var(--font-heading); font-size:4rem; color:var(--neon-color); text-shadow: var(--neon-glow);">LEGADO DOS GAMES</h2>
            </div>
            <section class="accordion-section">
                <div class="accordion-container">
                    ${GAMES.map((g,i) => CardCarouselUI.renderAccordionCard(g,i,'game')).join('')}
                </div>
            </section>
            ${this.renderMarauderNav('games')}
        `;
    },

    renderSpells() {
        return `
            <div style="text-align:center; padding: 100px 0 40px 0;">
                <h2 style="font-family:var(--font-heading); font-size:4rem; color:var(--neon-color); text-shadow: var(--neon-glow);">GRIMÓRIO DE FEITIÇOS</h2>
                <p style="color:var(--text-secondary); margin-top:10px; font-size:1.1rem;">Clique em um feitiço para lançá-lo</p>
            </div>
            <div class="spells-grid" style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:30px; padding:0 20px;">
                ${SPELLS.map((s, idx) => `
                    <div class="spell-card ${s.animation} lazy-anim" tabindex="0" role="button" aria-label="Lançar ${s.name}" style="--spell-color:${s.color}; border:1px solid rgba(255,255,255,0.1); padding:40px; border-radius:12px; background:var(--bg-card); transition:all 0.3s; cursor:pointer;" onclick="App.castSpell(${idx})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();App.castSpell(${idx})}">
                        <h3 style="font-size:1.8rem;">${s.icon} ${s.name}</h3>
                        <p style="margin-top:15px; font-size:1.1rem; opacity:0.8; line-height:1.5;">${s.effect}</p>
                        <div style="margin-top:20px; font-size:0.7rem; letter-spacing:2px; color:var(--text-muted); text-transform:uppercase;">Tipo: ${s.type}</div>
                    </div>
                `).join('')}
            </div>
            ${this.renderMarauderNav('spells')}
        `;
    },

    castSpell(idx) {
        const spell = SPELLS[idx];
        if (!spell) return;
        SoundEngine.play('spell-cast');

        const overlay = document.createElement('div');
        overlay.className = 'spell-cast-overlay';
        overlay.innerHTML = `
            <div class="spell-cast-emoji">${spell.icon}</div>
            <div class="spell-cast-ring" style="border-color:${spell.color};"></div>
            <div class="spell-cast-ring ring-2" style="border-color:${spell.color};"></div>
            <div class="spell-cast-ring ring-3" style="border-color:${spell.color};"></div>
            <div class="spell-cast-name" style="color:${spell.color}; text-shadow: 0 0 30px ${spell.color}, 0 0 60px ${spell.color};">${spell.name}</div>
        `;

        for (let i = 0; i < 16; i++) {
            const p = document.createElement('div');
            p.className = 'spell-particle';
            const angle = (360 / 16) * i;
            const dist = 150 + Math.random() * 200;
            p.style.cssText = `
                --angle: ${angle}deg;
                --dist: ${dist}px;
                background: ${spell.color};
                box-shadow: 0 0 10px ${spell.color};
            `;
            overlay.appendChild(p);
        }

        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('active'));

        setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 600);
        }, 2000);
    },

    renderCharacters() {
        return `
            <div style="text-align:center; padding: 100px 0 40px 0;">
                <h2 style="font-family:var(--font-heading); font-size:4rem; color:var(--neon-color); text-shadow: var(--neon-glow);">GALERIA DE BRUXOS</h2>
                <p style="color:var(--text-secondary); margin-top:10px; font-size:1.1rem;">Clique para ver a biografia completa</p>
            </div>
            <div class="characters-grid" style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:25px; padding:0 20px;">
                ${CHARACTERS.map((c, idx) => `
                    <div class="char-card lazy-anim" tabindex="0" role="button" aria-label="Ver perfil de ${c.name}" onclick="App.openCharModal(${idx})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();App.openCharModal(${idx})}" style="background:${c.gradient}; border-radius:16px; padding:30px; text-align:center; cursor:pointer; transition:all 0.3s; border:2px solid transparent; position:relative; overflow:hidden;">
                        <div style="font-size:4rem; margin-bottom:15px; filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));">${c.emoji}</div>
                        <h3 style="font-size:1.3rem; color:#fff; margin-bottom:8px;">${c.name}</h3>
                        <div style="font-size:0.8rem; color:rgba(255,255,255,0.7); text-transform:uppercase; letter-spacing:2px;">${c.role}</div>
                        <div style="margin-top:12px;"><span style="font-size:0.7rem; padding:3px 10px; border-radius:20px; background:rgba(0,0,0,0.3); color:rgba(255,255,255,0.8); text-transform:uppercase; letter-spacing:1px;">${c.house}</span></div>
                    </div>
                `).join('')}
            </div>
            ${this.renderMarauderNav('characters')}
        `;
    },

    openCharModal(idx) {
        const c = CHARACTERS[idx];
        if (!c) return;
        SoundEngine.play('modal-open');

        const modal = document.createElement('div');
        modal.className = 'char-modal-overlay';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Perfil de ' + c.name);
        modal.innerHTML = `
            <div class="char-modal-inner">
                <button class="char-modal-close" onclick="App.closeCharModal()" aria-label="Fechar modal">✕</button>
                <div style="display:flex; gap:30px; align-items:flex-start;">
                    <div style="min-width:120px; text-align:center;">
                        <div style="font-size:5rem; margin-bottom:10px;">${c.emoji}</div>
                        <span style="font-size:0.7rem; padding:4px 12px; border-radius:20px; background:${c.gradient}; color:#fff; text-transform:uppercase; letter-spacing:1px;">${c.house}</span>
                    </div>
                    <div style="flex:1;">
                        <h2 style="font-family:var(--font-heading); font-size:2.2rem; color:var(--neon-color); margin-bottom:5px;">${c.name}</h2>
                        <p style="color:var(--text-gold); font-style:italic; margin-bottom:20px; font-size:1.1rem;">${c.role}</p>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:25px;">
                            <div style="background:rgba(255,255,255,0.05); padding:12px; border-radius:8px;"><span style="color:var(--neon-color); font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:4px;">Varinha</span><span style="font-size:0.9rem;">${c.wand}</span></div>
                            <div style="background:rgba(255,255,255,0.05); padding:12px; border-radius:8px;"><span style="color:var(--neon-color); font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:4px;">Patrono</span><span style="font-size:0.9rem;">${c.patronus}</span></div>
                        </div>
                        <p style="line-height:1.8; color:var(--text-secondary); font-size:1rem;">${c.bio}</p>
                    </div>
                </div>
            </div>
        `;

        modal.addEventListener('click', (e) => { if (e.target === modal) this.closeCharModal(); });
        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('active'));

        this._charModalEsc = (e) => { if (e.key === 'Escape') this.closeCharModal(); };
        document.addEventListener('keydown', this._charModalEsc);
    },

    closeCharModal() {
        SoundEngine.play('modal-close');
        const m = document.querySelector('.char-modal-overlay');
        if (m) { m.classList.remove('active'); setTimeout(() => m.remove(), 400); }
        if (this._charModalEsc) document.removeEventListener('keydown', this._charModalEsc);
    },

    renderMarauderNav(activeTab) {
        const tabs = [
            { id:'movies', icon:'<i class="fa-solid fa-film"></i>', label:'FILMES' },
            { id:'books',  icon:'<i class="fa-solid fa-book"></i>', label:'LIVROS' },
            { id:'series', icon:'<i class="fa-solid fa-tv"></i>', label:'SÉRIE HBO' },
            { id:'games',  icon:'<i class="fa-solid fa-gamepad"></i>', label:'GAMES' },
            { id:'spells', icon:'<i class="fa-solid fa-wand-magic"></i>', label:'FEITIÇOS' },
            { id:'characters', icon:'<i class="fa-solid fa-users"></i>', label:'BRUXOS' }
        ];
        return `
            <div class="marauder-wrapper" style="margin-top:100px; padding-bottom: 100px;">
                <div class="marauder-map-closed" id="marauder-closed" onclick="App.openMap()">
                    <div class="map-fold-outer">
                        <div class="map-fold-label">
                            <span style="font-family:'UnifrakturMaguntia'; font-size:1.4rem; color:#3d2b1f;">O Mapa do Maroto</span>
                            <span style="font-family:'Lora',serif; font-size:0.7rem; color:#5a3e2b; font-style:italic; margin-top:4px;">Toque para revelar</span>
                        </div>
                    </div>
                </div>
                <div class="marauder-map-open" id="marauder-open" style="display:none;">
                    <div class="map-opening-msg" id="map-opening-msg">
                        <p class="map-msg-line1">Os Srs. Aluado, Rabicho, Almofadinhas e Pontas</p>
                        <p class="map-msg-line2">têm o orgulho de apresentar</p>
                        <h2 class="map-msg-title">O Mapa do Maroto</h2>
                        <p class="map-msg-oath">Juro solenemente não fazer nada de bom</p>
                    </div>
                    <div class="map-content" id="map-content" style="opacity:0;">
                        <div class="map-header">
                            <p style="font-family:'Lora', serif; font-style:italic; margin:0; font-size:1rem; letter-spacing:1px; color:#3d2b1f;">Os Srs. Aluado, Rabicho, Almofadinhas e Pontas apresentam</p>
                            <h2 style="font-family:'UnifrakturMaguntia'; font-size:5.5rem; line-height:1; margin:10px 0 0 0; color:#3d2b1f;">O Mapa do Maroto</h2>
                        </div>
                        <div class="marauder-nav-container" style="display:flex; justify-content:center; gap:15px; position:relative; z-index:50; flex-wrap:wrap;">
                            ${tabs.map(t => {
                                const isActive = activeTab === t.id;
                                return `
                                    <button class="marauder-card-btn" onclick="App.navigate('${t.id}')" style="
                                        width:115px; height:115px; border-radius:6px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; transition:all 0.3s; 
                                        border:1px solid rgba(90,62,43,0.15); 
                                        background: ${isActive ? '#3d2b1f' : 'rgba(255,255,255,0.3)'}; 
                                        color: ${isActive ? '#e9dcb5' : '#5a3e2b'};
                                        box-shadow: ${isActive ? '0 10px 20px rgba(0,0,0,0.2)' : 'none'};
                                    ">
                                        <span style="font-size:1.8rem; opacity: ${isActive ? '1' : '0.8'}">${t.icon}</span>
                                        <span style="font-size:0.7rem; font-weight:900; letter-spacing:1.5px; text-transform:uppercase;">${t.label}</span>
                                    </button>
                                `;
                            }).join('')}
                        </div>
                        <div id="map-characters-container" style="position:absolute; inset:0; pointer-events:none; overflow:hidden;"></div>
                        <div class="map-close-btn" onclick="App.closeMap()">
                            <span style="font-family:'UnifrakturMaguntia'; font-size:0.9rem; color:#3d2b1f;">Malfeito Feito</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    openMap() {
        const closed = document.getElementById('marauder-closed');
        const open = document.getElementById('marauder-open');
        if (!closed || !open) return;
        SoundEngine.play('modal-open');

        closed.classList.add('unfolding');
        setTimeout(() => {
            closed.style.display = 'none';
            open.style.display = 'block';
            open.classList.add('revealing');

            const msg = document.getElementById('map-opening-msg');
            const content = document.getElementById('map-content');

            setTimeout(() => {
                if (msg) {
                    msg.style.opacity = '0';
                    msg.style.transition = 'opacity 0.8s';
                }
                setTimeout(() => {
                    if (msg) msg.style.display = 'none';
                    if (content) {
                        content.style.opacity = '1';
                        content.style.transition = 'opacity 0.8s';
                    }
                    this.spawnMapCharacters();
                }, 800);
            }, 3200);
        }, 600);
    },

    closeMap() {
        const open = document.getElementById('marauder-open');
        const closed = document.getElementById('marauder-closed');
        if (!open || !closed) return;

        if (this.mapInterval) clearInterval(this.mapInterval);
        SoundEngine.play('modal-close');

        const content = document.getElementById('map-content');
        const msg = document.getElementById('map-opening-msg');

        if (content) content.style.opacity = '0';
        
        setTimeout(() => {
            if (msg) {
                msg.style.display = 'flex';
                msg.innerHTML = `<h2 class="map-msg-title" style="animation: mapMsgFade 1.5s ease-out forwards;">Malfeito Feito</h2>`;
                msg.style.opacity = '1';
            }
            setTimeout(() => {
                open.classList.remove('revealing');
                open.style.display = 'none';
                closed.style.display = 'block';
                closed.classList.remove('unfolding');
                if (content) content.style.opacity = '0';
                if (msg) {
                    msg.style.display = 'flex';
                    msg.style.opacity = '1';
                    msg.innerHTML = `
                        <p class="map-msg-line1">Os Srs. Aluado, Rabicho, Almofadinhas e Pontas</p>
                        <p class="map-msg-line2">têm o orgulho de apresentar</p>
                        <h2 class="map-msg-title">O Mapa do Maroto</h2>
                        <p class="map-msg-oath">Juro solenemente não fazer nada de bom</p>
                    `;
                }
            }, 2000);
        }, 500);
    },

    spawnMapCharacters() {
        const container = document.getElementById('map-characters-container');
        if (!container) return;
        if (this.mapInterval) clearInterval(this.mapInterval);

        const characters = ["Alvo Dumbledore", "Harry Potter", "Hermione Granger", "Severo Snape", "Sirius Black", "Rony Weasley", "Lord Voldemort"];
        
        const createBlip = () => {
            const activeScrolls = container.querySelectorAll('.map-scroll');
            if (activeScrolls.length >= 3) return;


            const activeNames = Array.from(activeScrolls).map(s => s.querySelector('span').innerText);
            const availableCharacters = characters.filter(c => !activeNames.includes(c));
            
            if (availableCharacters.length === 0) return;

            const char = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
            const blip = document.createElement('div');
            blip.className = 'map-char-blip';
            
            const startX = Math.random() * 70 + 10;
            const startY = Math.random() * 50 + 25;
            const endX = startX + (Math.random() * 30 - 15);
            const endY = startY + (Math.random() * 30 - 15);
            const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI) + 90;

            blip.style.cssText = `
                position: absolute;
                left: ${startX}%;
                top: ${startY}%;
                transition: all 12s linear;
                z-index: 20;
                opacity: 0;
            `;

            blip.innerHTML = `
                <div class="map-scroll" style="position:relative; display:flex; align-items:center; justify-content:center; padding: 6px 12px; min-width:65px;">
                    <svg style="position:absolute; inset:0; width:100%; height:100%; z-index:0; filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.1));" viewBox="0 0 120 40" preserveAspectRatio="none">
                        <path d="M5 2 Q 30 -2, 60 2 T 115 2 L 118 10 Q 120 20, 118 30 L 115 38 Q 90 42, 60 38 T 5 38 L 2 30 Q 0 20, 2 10 Z" fill="#dcd0b9" stroke="#3d2b1f" stroke-width="0.8"/>
                    </svg>
                    <span style="position:relative; z-index:1; font-family:'UnifrakturMaguntia'; font-size:0.85rem; white-space:nowrap; letter-spacing:-0.4px; color:#3d2b1f;">${char}</span>
                </div>
            `;

            container.appendChild(blip);
            

            let stepCount = 0;
            const dropStep = setInterval(() => {
                const rect = blip.getBoundingClientRect();
                const parentRect = container.getBoundingClientRect();
                if (rect.width === 0) return;

                const foot = document.createElement('div');
                foot.innerHTML = '👣';
                foot.style.cssText = `
                    position: absolute;
                    left: ${((rect.left + rect.width/2 - parentRect.left) / parentRect.width) * 100}%;
                    top: ${((rect.top + rect.height - parentRect.top) / parentRect.height) * 100}%;
                    transform: translate(-50%, -50%) rotate(${angle}deg) scaleX(${stepCount % 2 === 0 ? 1 : -1});
                    font-size: 0.8rem;
                    opacity: 0;
                    transition: opacity 1s;
                    color: #3d2b1f;
                    z-index: 5;
                `;
                container.appendChild(foot);
                
                setTimeout(() => foot.style.opacity = '0.6', 50);
                setTimeout(() => {
                    foot.style.opacity = '0';
                    setTimeout(() => foot.remove(), 1000);
                }, 4000);
                
                stepCount++;
            }, 1200);

            setTimeout(() => {
                blip.style.opacity = '1';
                blip.style.left = endX + '%';
                blip.style.top = endY + '%';
            }, 100);

            setTimeout(() => {
                clearInterval(dropStep);
                blip.style.opacity = '0';
                setTimeout(() => blip.remove(), 2500);
            }, 11000);
        };

        this.mapInterval = setInterval(createBlip, 7000);
    },

    setupSorting() {},

    startSorting() {
        SoundEngine.play('sorting-start');
        const modal = document.createElement('div');
        modal.id = 'sorting-quiz';
        modal.className = 'sorting-quiz-modal';
        modal.innerHTML = `
            <div class="sorting-quiz-inner">
                <div id="quiz-content">
                    <h2 style="font-family:var(--font-heading); font-size:3.5rem; margin-bottom:30px; color:var(--neon-color);">O CHAPÉU SELETOR</h2>
                    <p style="font-size:1.3rem; margin-bottom:50px; opacity:0.8;">"Não há nada escondido em sua cabeça que o Chapéu Seletor não possa ver..."</p>
                    <button class="btn btn-primary btn-lg" style="padding: 15px 50px; font-weight:bold;" onclick="App.renderSortingQuestion(0)">COMEÇAR SELEÇÃO</button>
                </div>
                <button class="close-btn" onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:#fff; font-size:2rem; cursor:pointer;">✕</button>
            </div>
        `;
        document.body.appendChild(modal);
    },

    renderSortingQuestion(index) {
        const q = QUESTIONS[index];
        if (!q) return;
        const container = document.getElementById('quiz-content');
        

        const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

        container.innerHTML = `
            <div class="question-step" style="animation: fadeInUp 0.5s;">
                <h3 style="font-size:2.2rem; margin-bottom:50px; font-family:var(--font-display);">${q.text}</h3>
                <div class="quiz-question-options" style="display:grid; grid-template-columns: 1fr 1fr; gap:25px;">
                    ${shuffledOptions.map((o, i) => `
                        <button class="btn btn-ghost" style="padding: 20px; font-size:1.1rem; border:1px solid rgba(255,255,255,0.1); border-radius:12px;" onclick="App.handleAnswer(${index}, '${o.house}')">${o.text}</button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    handleAnswer(index, house) {
        if (!this.answers) this.answers = [];
        this.answers.push(house);
        if (index < QUESTIONS.length - 1) {
            this.renderSortingQuestion(index + 1);
        } else {
            this.finishSorting();
        }
    },

    finishSorting() {
        const counts = {};
        this.answers.forEach(h => counts[h] = (counts[h] || 0) + 1);
        const result = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        
        const container = document.getElementById('quiz-content');
        

        container.innerHTML = `
            <div style="text-align:center; animation: fadeIn 0.5s;">
                <h2 style="font-family:var(--font-heading); font-size:4rem; color:var(--text-gold); letter-spacing:10px; animation: pulse 1.5s infinite;">DECIDINDO...</h2>
                <p style="font-size:1.4rem; opacity:0.6; margin-top:20px;">O Chapéu Seletor está lendo sua mente...</p>
            </div>
        `;


        setTimeout(() => {
            const overlay = document.createElement('div');
            overlay.className = 'wand-clash-overlay active';
            overlay.innerHTML = `
                <div class="clash-point">
                    <div class="clash-red"></div>
                    <div class="clash-green"></div>
                </div>
                <div class="shockwave-linear"></div>
            `;
            document.body.appendChild(overlay);
            SoundEngine.play('wand-clash');


            setTimeout(() => {
                this.userHouse = result;
                localStorage.setItem('userHouse', result);
                document.body.className = 'theme-' + result;
                this.answers = [];
                SoundEngine.play('house-reveal');

                overlay.innerHTML += '<div class="shockwave" style="animation-delay: 0.2s; border-color: var(--neon-color);"></div>';
                
                setTimeout(() => {
                    overlay.classList.remove('active');
                    setTimeout(() => overlay.remove(), 500);

                    container.innerHTML = `
                        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; animation: scaleIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                            <img src="src/assets/images/houses/${result}.png" style="width:280px; margin-bottom:30px; filter: drop-shadow(0 0 40px var(--neon-color));">
                            <h2 style="font-size:5.5rem; color:var(--neon-color); text-shadow: var(--neon-glow-strong); font-family:var(--font-heading); margin: 0;">${result.toUpperCase()}!</h2>
                            <p style="font-size:1.5rem; margin-top:20px; opacity:0.8; font-family:var(--font-prophet);">Você pertence à casa do(a) ${result === 'gryffindor' ? 'Coragem' : result === 'slytherin' ? 'Ambição' : result === 'ravenclaw' ? 'Sabedoria' : 'Lealdade'}!</p>
                            <button class="btn btn-primary btn-lg" style="margin-top:60px; padding: 20px 60px; font-weight:bold; border-radius:50px; box-shadow: var(--neon-glow);" onclick="location.reload()">ENTRAR NO SALÃO PRINCIPAL</button>
                        </div>
                    `;
                }, 800);
            }, 1500);
        }, 2000);
    },

    startQuotesRotation() {
        setInterval(() => {
            const el = document.getElementById('rotating-quote');
            if (!el) return;
            el.style.opacity = '0';
            setTimeout(() => {
                const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
                el.innerHTML = `
                    <p style="font-family:var(--font-prophet); font-size:2.2rem; font-style:italic; color:var(--text-secondary); line-height:1.4;">"${q.text}"</p>
                    <div style="margin-top:30px; font-family:var(--font-heading); color:var(--text-gold); letter-spacing:4px;">— ${q.author}</div>
                `;
                el.style.opacity = '1';
            }, 800);
        }, 12000);
    },

    setupParticles() {
        const container = document.querySelector('.particles-container');
        if (!container) return;
        for (let i = 0; i < 50; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.cssText = `
                --x: ${Math.random() * 100}%;
                --y: ${Math.random() * 100}%;
                --duration: ${8 + Math.random() * 12}s;
                --delay: ${Math.random() * 5}s;
            `;
            container.appendChild(p);
        }
    },

    setupAccordion(container) {
        if (!container) return;
        const cards = container.querySelectorAll('.accordion-card');
        if (cards.length === 0) return;
        

        cards.forEach(c => c.classList.remove('active'));
        cards[0].classList.add('active');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
    },

    setupLazyAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const observe = () => {
            document.querySelectorAll('.lazy-anim:not(.is-visible)').forEach(el => observer.observe(el));
        };
        observe();
        setInterval(observe, 2000);
    }
};

window.onload = () => App.init();
