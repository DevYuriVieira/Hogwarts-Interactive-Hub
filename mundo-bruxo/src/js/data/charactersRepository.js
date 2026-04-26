const CHARACTERS = [
    {
        name: "Harry Potter",
        emoji: "⚡",
        house: "gryffindor",
        gradient: "linear-gradient(135deg, #740001, #ae0001)",
        role: "O Escolhido",
        wand: "Azevinho, 28cm, pena de fênix",
        patronus: "Cervo",
        born: "31 de Julho de 1980",
        bio: "Harry James Potter é um bruxo mestiço, o único filho de James e Lily Potter. Ele foi o único a sobreviver à Maldição da Morte de Lord Voldemort, o que lhe rendeu a cicatriz em forma de raio e o título de 'O Menino Que Sobreviveu'. Harry foi fundamental na Segunda Guerra Bruxa e se tornou o mais jovem Auror já registrado."
    },
    {
        name: "Hermione Granger",
        emoji: "📚",
        house: "gryffindor",
        gradient: "linear-gradient(135deg, #740001, #d3a625)",
        role: "A Mais Brilhante de Sua Geração",
        wand: "Videira, 27cm, corda de coração de dragão",
        patronus: "Lontra",
        born: "19 de Setembro de 1979",
        bio: "Hermione Jean Granger é uma bruxa nascida trouxa que se tornou a aluna mais brilhante de sua geração em Hogwarts. Cofundadora da Armada de Dumbledore, ela foi essencial na destruição das Horcruxes. Após a guerra, tornou-se Ministra da Magia, lutando pelos direitos dos elfos domésticos."
    },
    {
        name: "Rony Weasley",
        emoji: "♟️",
        house: "gryffindor",
        gradient: "linear-gradient(135deg, #ae0001, #d3a625)",
        role: "O Estrategista Leal",
        wand: "Salgueiro, 35cm, pelo de unicórnio",
        patronus: "Jack Russell Terrier",
        born: "1 de Março de 1980",
        bio: "Ronald Bilius Weasley é o sexto filho da família Weasley e melhor amigo de Harry Potter. Embora muitas vezes vivendo à sombra de seus irmãos e amigos, Ron demonstrou coragem extraordinária nos momentos decisivos. Seu sacrifício no xadrez gigante e sua lealdade inabalável o tornaram essencial na derrota de Voldemort."
    },
    {
        name: "Alvo Dumbledore",
        emoji: "🧙",
        house: "gryffindor",
        gradient: "linear-gradient(135deg, #4a235a, #7d3c98)",
        role: "Diretor de Hogwarts",
        wand: "Sabugueiro, 38cm, pelo de Trestálio (Varinha das Varinhas)",
        patronus: "Fênix",
        born: "Verão de 1881",
        bio: "Alvo Percival Wulfric Brian Dumbledore é considerado o maior bruxo de todos os tempos. Diretor de Hogwarts por décadas, foi o único bruxo que Voldemort temeu. Derrotou Grindelwald em 1945 e orquestrou a estratégia que levou à queda definitiva de Voldemort, mesmo após sua própria morte."
    },
    {
        name: "Severo Snape",
        emoji: "🧪",
        house: "slytherin",
        gradient: "linear-gradient(135deg, #1a472a, #2d6a4f)",
        role: "O Príncipe Mestiço",
        wand: "Desconhecida",
        patronus: "Corça",
        born: "9 de Janeiro de 1960",
        bio: "Severo Snape é talvez o personagem mais complexo da saga. Professor de Poções e depois de Defesa Contra as Artes das Trevas, Snape viveu uma vida dupla como espião de Dumbledore entre os Comensais da Morte. Seu amor eterno por Lily Potter motivou todos os seus atos de bravura silenciosa. 'Sempre.'"
    },
    {
        name: "Draco Malfoy",
        emoji: "🐍",
        house: "slytherin",
        gradient: "linear-gradient(135deg, #1a472a, #aaaaaa)",
        role: "O Rival",
        wand: "Espinheiro, 25cm, pelo de unicórnio",
        patronus: "Nenhum (não conseguia conjurar)",
        born: "5 de Junho de 1980",
        bio: "Draco Lucius Malfoy cresceu como herdeiro de uma das famílias de sangue-puro mais ricas do mundo bruxo. Rival de Harry em Hogwarts, Draco foi pressionado a se tornar Comensal da Morte, mas no fundo não possuía a crueldade necessária. Sua incapacidade de matar Dumbledore mostrou que havia bondade nele."
    },
    {
        name: "Luna Lovegood",
        emoji: "🌙",
        house: "ravenclaw",
        gradient: "linear-gradient(135deg, #0e1a40, #3498db)",
        role: "A Sonhadora",
        wand: "Desconhecida",
        patronus: "Lebre",
        born: "13 de Fevereiro de 1981",
        bio: "Luna Lovegood é uma bruxa excêntrica e genuinamente bondosa, conhecida por acreditar em criaturas que ninguém mais vê. Filha do editor d'O Pasquim, ela se tornou membro leal da Armada de Dumbledore e lutou na Batalha de Hogwarts. Sua honestidade desarmante e sabedoria inesperada a tornaram uma das personagens mais queridas."
    },
    {
        name: "Sirius Black",
        emoji: "🐕",
        house: "gryffindor",
        gradient: "linear-gradient(135deg, #2c3e50, #4ca1af)",
        role: "O Padrinho",
        wand: "Desconhecida",
        patronus: "Desconhecido (forma animaga: cão grande)",
        born: "3 de Novembro de 1959",
        bio: "Sirius Black III foi o padrinho de Harry e membro da Ordem da Fênix. Preso injustamente em Azkaban por 12 anos, acusado de trair os Potter, Sirius era na verdade inocente. Após fugir, dedicou-se a proteger Harry. Sua morte no Departamento de Mistérios é um dos momentos mais trágicos da saga."
    },
    {
        name: "Neville Longbottom",
        emoji: "🌿",
        house: "gryffindor",
        gradient: "linear-gradient(135deg, #1e8449, #27ae60)",
        role: "O Verdadeiro Grifinório",
        wand: "Cerejeira, 33cm, pelo de unicórnio",
        patronus: "Desconhecido",
        born: "30 de Julho de 1980",
        bio: "Neville Longbottom começou tímido e desajeitado, mas se tornou um dos heróis mais corajosos da saga. Quase escolhido pela profecia no lugar de Harry, Neville destruiu a última Horcrux — Nagini — com a Espada de Grifinória durante a Batalha de Hogwarts, selando a derrota de Voldemort."
    },
    {
        name: "Bellatrix Lestrange",
        emoji: "💀",
        house: "slytherin",
        gradient: "linear-gradient(135deg, #1a1a2e, #4a0000)",
        role: "A Comensal Mais Leal",
        wand: "Nogueira, 32cm, corda de coração de dragão",
        patronus: "Nenhum",
        born: "1951",
        bio: "Bellatrix Lestrange, nascida Black, é a mais feroz e fanática seguidora de Lord Voldemort. Responsável pela tortura dos pais de Neville Longbottom e pela morte de Sirius Black, ela encarna a crueldade pura. Foi derrotada por Molly Weasley durante a Batalha de Hogwarts."
    },
    {
        name: "Hagrid",
        emoji: "🗝️",
        house: "gryffindor",
        gradient: "linear-gradient(135deg, #6e4b1e, #a0522d)",
        role: "Guardião das Chaves",
        wand: "Carvalho, 40cm (quebrada, escondida no guarda-chuva)",
        patronus: "Não consegue (magia incompleta)",
        born: "6 de Dezembro de 1928",
        bio: "Rubeus Hagrid, meio-gigante, é o Guardião das Chaves e Terrenos de Hogwarts. Expulso injustamente no terceiro ano por Tom Riddle, Hagrid nunca perdeu sua bondade. Foi ele quem trouxe Harry ao mundo bruxo. Sua paixão por criaturas perigosas é lendária, e sua lealdade a Dumbledore é inabalável."
    },
    {
        name: "Lord Voldemort",
        emoji: "🐍",
        house: "slytherin",
        gradient: "linear-gradient(135deg, #0a0a0a, #1a472a)",
        role: "O Lorde das Trevas",
        wand: "Teixo, 34cm, pena de fênix",
        patronus: "Nenhum (incapaz de amor)",
        born: "31 de Dezembro de 1926",
        bio: "Tom Marvolo Riddle, autoproclamado Lord Voldemort, é o bruxo das trevas mais poderoso de todos os tempos. Obcecado com a imortalidade, dividiu sua alma em 7 Horcruxes. Responsável por duas guerras bruxas, ele só temia Dumbledore e foi finalmente derrotado por Harry Potter na Batalha de Hogwarts."
    }
];
