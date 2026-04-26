const SPELLS = [
    {
        id: 1,
        name: "Expecto Patronum",
        type: "Encantamento",
        effect: "Conjura uma manifestação mágica de energia positiva, o Patrono, para defesa contra Dementadores e Mortalhas-vivas.",
        color: "#4488ff",
        icon: "✨",
        animation: "patronus-glow"
    },
    {
        id: 2,
        name: "Expelliarmus",
        type: "Feitiço de Desarmamento",
        effect: "Faz com que o oponente solte o que estiver segurando (geralmente a varinha).",
        color: "#ff3333",
        icon: "🪄",
        animation: "expelliarmus-flash"
    },
    {
        id: 3,
        name: "Lumos",
        type: "Feitiço de Iluminação",
        effect: "Cria um feixe de luz na ponta da varinha do conjurador.",
        color: "#ffffcc",
        icon: "💡",
        animation: "lumos-glow"
    },
    {
        id: 4,
        name: "Avada Kedavra",
        type: "Maldição Imperdoável",
        effect: "Causa morte instantânea e indolor. Não possui contra-feitiço.",
        color: "#00ff66",
        icon: "💀",
        animation: "avada-flash"
    },
    {
        id: 5,
        name: "Wingardium Leviosa",
        type: "Feitiço de Levitação",
        effect: "Faz objetos levitarem e voarem com o movimento da varinha.",
        color: "#d4a843",
        icon: "🪶",
        animation: "leviosa-float"
    },
    {
        id: 6,
        name: "Crucio",
        type: "Maldição Imperdoável",
        effect: "Causa dor excruciante em quem é atingido. Conhecida como Maldição Cruciatus.",
        color: "#8a0303",
        icon: "🩸",
        animation: "crucio-shake"
    },
    {
        id: 7,
        name: "Accio",
        type: "Feitiço Convocatório",
        effect: "Traz objetos a longa distância até o conjurador.",
        color: "#cc99ff",
        icon: "🧲",
        animation: "accio-pull"
    },
    {
        id: 8,
        name: "Protego",
        type: "Feitiço Escudo",
        effect: "Cria um escudo mágico que deflete feitiços e ataques físicos.",
        color: "#aaeebb",
        icon: "🛡️",
        animation: "protego-shield"
    },
    {
        id: 9,
        name: "Nox",
        type: "Contra-feitiço",
        effect: "Apaga a luz criada pelo feitiço Lumos, devolvendo a varinha ao estado normal.",
        color: "#555555",
        icon: "🌑",
        animation: "nox-fade"
    },
    {
        id: 10,
        name: "Alohomora",
        type: "Encantamento",
        effect: "Destranca portas, baús e janelas que não estejam protegidos por magia complexa.",
        color: "#a8d8ea",
        icon: "🗝️",
        animation: "alohomora-unlock"
    },
    {
        id: 11,
        name: "Estupefaça",
        type: "Feitiço Estuporante",
        effect: "Deixa a vítima inconsciente, arremessando-a para trás.",
        color: "#ff4444",
        icon: "💥",
        animation: "stupefy-flash"
    },
    {
        id: 12,
        name: "Riddikulus",
        type: "Encantamento",
        effect: "Força um Bicho-Papão a assumir uma forma cômica, tirando seu poder de assustar.",
        color: "#ffaa00",
        icon: "🎭",
        animation: "riddikulus-bounce"
    },
    {
        id: 13,
        name: "Obliviate",
        type: "Feitiço da Memória",
        effect: "Apaga memórias específicas ou recentes da mente de uma pessoa.",
        color: "#9966ff",
        icon: "🧠",
        animation: "obliviate-blur"
    },
    {
        id: 14,
        name: "Sectumsempra",
        type: "Maldição",
        effect: "Causa cortes profundos no alvo, como se fossem feitos por espadas invisíveis.",
        color: "#8b0000",
        icon: "🗡️",
        animation: "sectumsempra-slash"
    },
    {
        id: 15,
        name: "Petrificus Totalus",
        type: "Feitiço do Corpo Preso",
        effect: "Paralisa completamente o corpo da vítima, deixando-a rígida como uma tábua.",
        color: "#cccccc",
        icon: "🗿",
        animation: "petrificus-freeze"
    },
    {
        id: 16,
        name: "Aguamenti",
        type: "Encantamento",
        effect: "Produz um jato contínuo de água limpa da ponta da varinha.",
        color: "#00aaff",
        icon: "💧",
        animation: "aguamenti-water"
    },
    {
        id: 17,
        name: "Incendio",
        type: "Feitiço de Fogo",
        effect: "Conjura chamas instantâneas, usado para acender fogueiras ou atacar plantas perigosas.",
        color: "#ff6600",
        icon: "🔥",
        animation: "incendio-fire"
    },
    {
        id: 18,
        name: "Imperio",
        type: "Maldição Imperdoável",
        effect: "Coloca a vítima sob o controle total do conjurador.",
        color: "#00ffcc",
        icon: "👁️",
        animation: "imperio-hypnosis"
    },
    {
        id: 19,
        name: "Bombarda",
        type: "Feitiço Explosivo",
        effect: "Causa uma explosão localizada, ideal para destruir pequenos obstáculos ou fechar caminhos.",
        color: "#ffaa33",
        icon: "💣",
        animation: "bombarda-explode"
    },
    {
        id: 20,
        name: "Reparo",
        type: "Feitiço de Conserto",
        effect: "Repara objetos inanimados quebrados, desde óculos até cerâmicas e pontes.",
        color: "#ffffff",
        icon: "🔨",
        animation: "reparo-fix"
    },
    {
        id: 21,
        name: "Diffindo",
        type: "Feitiço de Corte",
        effect: "Corta ou rasga objetos de maneira precisa.",
        color: "#ff00ff",
        icon: "✂️",
        animation: "diffindo-cut"
    },
    {
        id: 22,
        name: "Reducto",
        type: "Feitiço Redutor",
        effect: "Desintegra ou reduz a pedaços objetos sólidos e obstáculos.",
        color: "#6666ff",
        icon: "🌪️",
        animation: "reducto-shatter"
    },
    {
        id: 23,
        name: "Impedimenta",
        type: "Feitiço de Impedimento",
        effect: "Atrasa, conjela temporariamente ou empurra para trás um alvo que está se aproximando.",
        color: "#aa88ff",
        icon: "🛑",
        animation: "impedimenta-stop"
    }
];
