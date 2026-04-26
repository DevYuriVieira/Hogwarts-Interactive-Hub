// src/js/data/questionsMock.js

export const HOUSES = {
    gryffindor: { name: 'Grifinória', emoji: '🦁', color: '#AE0001', traits: 'Coragem, Ousadia, Bravura' },
    slytherin: { name: 'Sonserina', emoji: '🐍', color: '#1A472A', traits: 'Ambição, Astúcia, Determinação' },
    ravenclaw: { name: 'Corvinal', emoji: '🦅', color: '#0E1A40', traits: 'Inteligência, Criatividade, Sabedoria' },
    hufflepuff: { name: 'Lufa-Lufa', emoji: '🦡', color: '#ECB939', traits: 'Lealdade, Dedicação, Justiça' }
};

export const QUESTIONS = [
    {
        text: 'Você se depara com um caminho bifurcado. Qual você escolhe?',
        options: [
            { text: 'O caminho iluminado que vai para a floresta.', house: 'hufflepuff' },
            { text: 'O beco escuro que parece esconder segredos.', house: 'slytherin' },
            { text: 'A ponte antiga suspensa sobre o abismo.', house: 'gryffindor' },
            { text: 'A trilha de pedras com inscrições rúnicas.', house: 'ravenclaw' }
        ]
    },
    {
        text: 'Qual destas poções você inventaria se pudesse?',
        options: [
            { text: 'Glória e sucesso absolutos.', house: 'slytherin' },
            { text: 'Sabedoria infinita e memória perfeita.', house: 'ravenclaw' },
            { text: 'Uma poção que garante lealdade verdadeira.', house: 'hufflepuff' },
            { text: 'Força sobre-humana e coragem.', house: 'gryffindor' }
        ]
    },
    {
        text: 'O que você mais teme?',
        options: [
            { text: 'Ser ignorado ou esquecido.', house: 'slytherin' },
            { text: 'Deixar meus amigos na mão.', house: 'hufflepuff' },
            { text: 'A verdadeira escuridão e o desconhecido.', house: 'gryffindor' },
            { text: 'Estar completamente errado.', house: 'ravenclaw' }
        ]
    }
];
