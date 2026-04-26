// ============================================
// DOM HELPERS
// ============================================

export function $(selector, parent = document) {
    return parent.querySelector(selector);
}

export function $$(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

export function createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const [key, val] of Object.entries(attrs)) {
        if (key === 'className') el.className = val;
        else if (key === 'innerHTML') el.innerHTML = val;
        else if (key === 'textContent') el.textContent = val;
        else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), val);
        else el.setAttribute(key, val);
    }
    children.forEach(child => {
        if (typeof child === 'string') el.appendChild(document.createTextNode(child));
        else if (child) el.appendChild(child);
    });
    return el;
}

export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function typewriter(element, text, speed = 40) {
    element.textContent = '';
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await wait(speed);
    }
}
