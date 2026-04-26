// src/js/ui/SortingAnimationUI.js
import { $ } from './DOMUtils.js';

export class SortingAnimationUI {
    static async playSortingAnimation() {
        const overlay = document.createElement('div');
        overlay.className = 'sorting-overlay';
        overlay.innerHTML = `
            <div class="sorting-stars"></div>
            <div class="sorting-wand-flash"></div>
        `;
        document.body.appendChild(overlay);

        // Flash and fade in
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });

        // Wait for the animation to feel "dramatic"
        return new Promise(resolve => {
            setTimeout(() => {
                overlay.classList.remove('active');
                setTimeout(() => {
                    overlay.remove();
                    resolve();
                }, 1000);
            }, 3000); // 3 seconds of suspense
        });
    }

    static showResultModal(houseName, houseData, onClose) {
        const modal = document.createElement('div');
        modal.className = 'sorting-result-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="house-crest">${houseData.emoji}</div>
                <h2>${houseName.toUpperCase()}!</h2>
                <p>${houseData.traits}</p>
                <button class="btn-primary" id="btn-finish-sorting">Começar Jornada</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Animate in
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });

        $('#btn-finish-sorting').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                onClose();
            }, 500);
        });
    }
}
