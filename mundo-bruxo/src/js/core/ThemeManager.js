// src/js/core/ThemeManager.js

export class ThemeManager {
    static getHouseFromStorage() {
        try {
            return JSON.parse(localStorage.getItem('mb_user_house'));
        } catch {
            return null;
        }
    }

    static saveHouseToStorage(houseData) {
        localStorage.setItem('mb_user_house', JSON.stringify(houseData));
    }

    static applyTheme(themeName) {
        // Remove existing themes
        document.body.classList.remove(
            'theme-gryffindor', 
            'theme-slytherin', 
            'theme-ravenclaw', 
            'theme-hufflepuff'
        );
        
        // Apply new theme
        if (themeName) {
            document.body.classList.add(`theme-${themeName}`);
        }
    }
}
