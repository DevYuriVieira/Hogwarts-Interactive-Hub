// ============================================
// HASH ROUTER with Pensieve Transition
// ============================================

import { setActiveLink } from './components/navbar.js';
import { $ } from './utils/dom.js';

const routes = {};
let currentPage = null;

export function registerRoute(name, renderFn) {
    routes[name] = renderFn;
}

export function initRouter() {
    window.addEventListener('hashchange', () => handleRoute());
    handleRoute();
}

async function handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    if (hash === currentPage) return;

    const appContainer = $('#app-content');
    if (!appContainer) return;

    // Pensieve transition out
    if (currentPage) {
        appContainer.style.animation = 'pensieveIn 0.4s var(--ease-out) forwards';
        await new Promise(r => setTimeout(r, 400));
    }

    currentPage = hash;
    setActiveLink(hash);

    // Render new page
    if (routes[hash]) {
        routes[hash](appContainer);
    } else {
        appContainer.innerHTML = `<div style="padding:200px 20px;text-align:center">
            <h2 style="font-family:var(--font-display);color:var(--text-gold)">Página não encontrada</h2>
            <p style="color:var(--text-secondary);margin-top:16px">O Mapa do Maroto não reconhece este caminho.</p>
            <a href="#home" class="btn btn-outline" style="margin-top:24px">Voltar ao Início</a>
        </div>`;
    }

    // Pensieve transition in
    appContainer.style.animation = 'pensieveOut 0.5s var(--ease-out) forwards';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function navigateTo(page) {
    window.location.hash = page;
}
