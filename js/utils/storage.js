// ============================================
// STORAGE UTILITY
// ============================================

const STORAGE_KEYS = {
    HOUSE: 'mundo_bruxo_house',
    THEME: 'mundo_bruxo_theme',
    VISIT_COUNT: 'mundo_bruxo_visits'
};

export function getHouse() {
    return localStorage.getItem(STORAGE_KEYS.HOUSE);
}

export function setHouse(houseId) {
    localStorage.setItem(STORAGE_KEYS.HOUSE, houseId);
    localStorage.setItem(STORAGE_KEYS.THEME, `theme-${houseId}`);
    incrementVisitCount(houseId);
}

export function clearHouse() {
    localStorage.removeItem(STORAGE_KEYS.HOUSE);
    localStorage.removeItem(STORAGE_KEYS.THEME);
}

export function getThemeClass() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || '';
}

function incrementVisitCount(houseId) {
    const counts = getHouseCounts();
    counts[houseId] = (counts[houseId] || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.VISIT_COUNT, JSON.stringify(counts));
}

export function getHouseCounts() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.VISIT_COUNT)) || {};
    } catch {
        return {};
    }
}
