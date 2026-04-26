const QUESTIONS = [
    {
        id: 1,
        text: "O que você mais valoriza em si mesmo?",
        options: [
            { text: "Minha bravura e coragem.", house: "gryffindor" },
            { text: "Minha inteligência e criatividade.", house: "ravenclaw" },
            { text: "Minha ambição e determinação.", house: "slytherin" },
            { text: "Minha lealdade e bondade.", house: "hufflepuff" }
        ]
    },
    {
        id: 2,
        text: "Diante de um desafio perigoso, qual sua reação?",
        options: [
            { text: "Enfrento de frente, sem hesitar.", house: "gryffindor" },
            { text: "Analiso todas as possibilidades antes de agir.", house: "ravenclaw" },
            { text: "Encontro a maneira mais eficiente de vencer.", house: "slytherin" },
            { text: "Ajudo quem estiver ao meu redor primeiro.", house: "hufflepuff" }
        ]
    },
    {
        id: 3,
        text: "Qual destas poções você escolheria beber?",
        options: [
            { text: "Glória (dourada e brilhante)", house: "gryffindor" },
            { text: "Sabedoria (prateada e profunda)", house: "ravenclaw" },
            { text: "Poder (negra e densa)", house: "slytherin" },
            { text: "Amizade (rosa e perfumada)", house: "hufflepuff" }
        ]
    }
];

const HOUSES_DATA = {
    gryffindor: { name: 'Grifinória', emoji: '🦁', traits: 'Coragem, Ousadia, Bravura', color: '#c0392b' },
    slytherin:  { name: 'Sonserina',  emoji: '🐍', traits: 'Ambição, Astúcia, Determinação', color: '#27ae60' },
    ravenclaw:  { name: 'Corvinal',   emoji: '🦅', traits: 'Inteligência, Criatividade, Sabedoria', color: '#2980b9' },
    hufflepuff: { name: 'Lufa-Lufa',  emoji: '🦡', traits: 'Lealdade, Dedicação, Justiça', color: '#f39c12' }
};
