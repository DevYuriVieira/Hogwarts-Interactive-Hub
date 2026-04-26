// src/js/core/SortingHatUseCase.js

export class SortingHatUseCase {
    constructor(questions) {
        this.questions = questions;
        this.scores = {
            gryffindor: 0,
            slytherin: 0,
            ravenclaw: 0,
            hufflepuff: 0
        };
        this.currentQuestionIndex = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    answerQuestion(house) {
        if (this.scores[house] !== undefined) {
            this.scores[house]++;
        }
        this.currentQuestionIndex++;
        return this.isComplete();
    }

    isComplete() {
        return this.currentQuestionIndex >= this.questions.length;
    }

    calculateHouse() {
        let maxScore = -1;
        let selectedHouse = 'gryffindor'; // default
        
        // Simple max finding, ties go to whichever is first
        for (const [house, score] of Object.entries(this.scores)) {
            if (score > maxScore) {
                maxScore = score;
                selectedHouse = house;
            }
        }
        
        return selectedHouse;
    }
}
