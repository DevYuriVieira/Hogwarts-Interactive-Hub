// ============================================
// HOUSES DATA
// ============================================

export const HOUSES = {
    gryffindor: {
        id: 'gryffindor',
        name: 'Grifinória',
        nameEn: 'Gryffindor',
        emoji: '🦁',
        founder: 'Godric Gryffindor',
        animal: 'Leão',
        ghost: 'Nick Quase Sem Cabeça',
        commonRoom: 'Torre da Grifinória',
        element: 'Fogo',
        values: ['Coragem', 'Bravura', 'Determinação', 'Cavalheirismo'],
        description: 'A casa dos corajosos e ousados. Grifinória valoriza a bravura acima de tudo, atraindo aqueles que possuem nervos de aço e coragem inabalável.',
        welcomeMessage: 'Sua coragem brilha como fogo! O Chapéu Seletor reconheceu a bravura no seu coração.',
        colors: { primary: '#AE0001', secondary: '#EEBA30', neon: '#FF4444' },
        crestSVG: 'M150,30 C160,20 180,15 190,30 L200,60 C210,80 220,100 200,120 L180,140 C170,155 160,165 150,170 C140,165 130,155 120,140 L100,120 C80,100 90,80 100,60 L110,30 C120,15 140,20 150,30 Z M130,70 L140,55 L150,65 L160,55 L170,70 L160,85 L170,100 L150,110 L130,100 L140,85 Z'
    },
    slytherin: {
        id: 'slytherin',
        name: 'Sonserina',
        nameEn: 'Slytherin',
        emoji: '🐍',
        founder: 'Salazar Slytherin',
        animal: 'Serpente',
        ghost: 'Barão Sangrento',
        commonRoom: 'Masmorras do Lago',
        element: 'Água',
        values: ['Ambição', 'Astúcia', 'Liderança', 'Determinação'],
        description: 'A casa dos ambiciosos e astutos. Sonserina valoriza a ambição e a engenhosidade, formando grandes líderes e estrategistas.',
        welcomeMessage: 'Sua ambição é digna de Salazar! A Sonserina reconhece os verdadeiros líderes.',
        colors: { primary: '#1A472A', secondary: '#AAAAAA', neon: '#00FF88' },
        crestSVG: 'M150,20 C170,20 200,40 200,70 C200,100 180,120 170,135 C165,142 160,148 155,155 C152,160 150,165 150,170 C150,165 148,160 145,155 C140,148 135,142 130,135 C120,120 100,100 100,70 C100,40 130,20 150,20 Z M130,60 C125,70 130,85 140,90 C145,92 150,88 148,80 C146,72 140,60 135,55 C132,53 130,55 130,60 Z'
    },
    ravenclaw: {
        id: 'ravenclaw',
        name: 'Corvinal',
        nameEn: 'Ravenclaw',
        emoji: '🦅',
        founder: 'Rowena Ravenclaw',
        animal: 'Águia',
        ghost: 'Dama Cinzenta',
        commonRoom: 'Torre da Corvinal',
        element: 'Ar',
        values: ['Sabedoria', 'Inteligência', 'Criatividade', 'Originalidade'],
        description: 'A casa dos sábios e criativos. Corvinal valoriza o intelecto e a busca pelo conhecimento, acolhendo mentes brilhantes.',
        welcomeMessage: 'Sua mente é afiada como águia! A Corvinal acolhe os que buscam sabedoria.',
        colors: { primary: '#0E1A40', secondary: '#946B2D', neon: '#4488FF' },
        crestSVG: 'M150,25 L165,50 L195,55 L175,80 L180,110 L150,95 L120,110 L125,80 L105,55 L135,50 Z M135,60 L140,70 L130,75 L135,85 L150,78 L165,85 L170,75 L160,70 L165,60 L150,68 Z'
    },
    hufflepuff: {
        id: 'hufflepuff',
        name: 'Lufa-Lufa',
        nameEn: 'Hufflepuff',
        emoji: '🦡',
        founder: 'Helga Hufflepuff',
        animal: 'Texugo',
        ghost: 'Frei Gorducho',
        commonRoom: 'Porão próximo às cozinhas',
        element: 'Terra',
        values: ['Lealdade', 'Justiça', 'Paciência', 'Trabalho Duro'],
        description: 'A casa dos leais e justos. Lufa-Lufa valoriza o trabalho duro e a lealdade, abraçando todos com igualdade.',
        welcomeMessage: 'Seu coração leal é raro! A Lufa-Lufa valoriza os que são justos e verdadeiros.',
        colors: { primary: '#ECB939', secondary: '#372E29', neon: '#FFD700' },
        crestSVG: 'M150,30 C175,30 195,50 195,75 L195,110 C195,130 180,150 150,155 C120,150 105,130 105,110 L105,75 C105,50 125,30 150,30 Z M125,65 C120,70 125,80 135,85 L135,100 C130,105 130,115 140,118 L150,120 L160,118 C170,115 170,105 165,100 L165,85 C175,80 180,70 175,65 C170,60 160,65 155,70 L150,72 L145,70 C140,65 130,60 125,65 Z'
    }
};

export const HOUSE_IDS = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];

// Sorting quiz questions
export const SORTING_QUESTIONS = [
    {
        question: 'Qual qualidade você mais valoriza em si mesmo?',
        options: [
            { text: '🔥 Coragem — Enfrento qualquer desafio de frente', house: 'gryffindor' },
            { text: '🐍 Ambição — Sempre busco alcançar o topo', house: 'slytherin' },
            { text: '📚 Sabedoria — O conhecimento é meu maior poder', house: 'ravenclaw' },
            { text: '💛 Lealdade — Nunca abandono quem precisa de mim', house: 'hufflepuff' }
        ]
    },
    {
        question: 'Você entra num jardim encantado. O que investiga primeiro?',
        options: [
            { text: '⚔️ A estátua de um bruxo lendário empunhando uma espada', house: 'gryffindor' },
            { text: '🌿 O arbusto com frutos prateados que sussurram promessas', house: 'slytherin' },
            { text: '💧 A fonte mística que revela segredos antigos', house: 'ravenclaw' },
            { text: '🍄 Os cogumelos luminosos que acolhem criaturas mágicas', house: 'hufflepuff' }
        ]
    },
    {
        question: 'Como você gostaria de ser lembrado?',
        options: [
            { text: '⚡ Como alguém corajoso que enfrentou o impossível', house: 'gryffindor' },
            { text: '👑 Como alguém que conquistou grandes feitos', house: 'slytherin' },
            { text: '🌟 Como alguém sábio e admirado por suas ideias', house: 'ravenclaw' },
            { text: '🤝 Como alguém bom, justo e amado por todos', house: 'hufflepuff' }
        ]
    }
];
