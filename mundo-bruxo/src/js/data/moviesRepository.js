const MOVIES = [
    {
        id: 1,
        title: 'Harry Potter e a Pedra Filosofal',
        titleEn: "Harry Potter and the Philosopher's Stone",
        year: 2001, duration: '2h 32min', director: 'Chris Columbus',
        rating: '7.6', boxOffice: 'US$ 1.02 bilhão', emoji: '<i class="fa-regular fa-gem"></i>',
        gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
        poster: 'src/assets/images/posters/films/harry_potter_1.jpg',
        synopsis: 'Harry Potter descobre no seu décimo primeiro aniversário que é um bruxo. Ao ingressar em Hogwarts, ele faz amizades, descobre segredos sobre seus pais e enfrenta o retorno de Lord Voldemort.',
        cast: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson', 'Richard Harris', 'Alan Rickman']
    },
    {
        id: 2,
        title: 'Harry Potter e a Câmara Secreta',
        titleEn: 'Harry Potter and the Chamber of Secrets',
        year: 2002, duration: '2h 41min', director: 'Chris Columbus',
        rating: '7.4', boxOffice: 'US$ 882 milhões', emoji: '<i class="fa-solid fa-staff-snake"></i>',
        gradient: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
        poster: 'src/assets/images/posters/films/harry_potter_2.jpg',
        synopsis: 'Em seu segundo ano em Hogwarts, Harry enfrenta uma ameaça misteriosa: a Câmara Secreta foi aberta e alunos nascidos trouxas estão sendo petrificados.',
        cast: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson', 'Kenneth Branagh', 'Jason Isaacs']
    },
    {
        id: 3,
        title: 'Harry Potter e o Prisioneiro de Azkaban',
        titleEn: 'Harry Potter and the Prisoner of Azkaban',
        year: 2004, duration: '2h 22min', director: 'Alfonso Cuarón',
        rating: '7.9', boxOffice: 'US$ 807 milhões', emoji: '<i class="fa-solid fa-paw"></i>',
        gradient: 'linear-gradient(135deg, #2c3e50, #4ca1af)',
        poster: 'src/assets/images/posters/films/harry_potter_3.jpg',
        synopsis: 'Sirius Black escapa de Azkaban. Enquanto Dementadores cercam Hogwarts, Harry descobre verdades surpreendentes sobre sua família.',
        cast: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson', 'Gary Oldman', 'David Thewlis']
    },
    {
        id: 4,
        title: 'Harry Potter e o Cálice de Fogo',
        titleEn: 'Harry Potter and the Goblet of Fire',
        year: 2005, duration: '2h 37min', director: 'Mike Newell',
        rating: '7.7', boxOffice: 'US$ 897 milhões', emoji: '<i class="fa-solid fa-trophy"></i>',
        gradient: 'linear-gradient(135deg, #c0392b, #e74c3c)',
        poster: 'src/assets/images/posters/films/harry_potter_4.jpg',
        synopsis: 'Harry é selecionado como quarto competidor no Torneio Tribruxo, enfrentando tarefas mortais enquanto sinais sombrios indicam o retorno de Voldemort.',
        cast: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson', 'Ralph Fiennes', 'Robert Pattinson']
    },
    {
        id: 5,
        title: 'Harry Potter e a Ordem da Fênix',
        titleEn: 'Harry Potter and the Order of the Phoenix',
        year: 2007, duration: '2h 18min', director: 'David Yates',
        rating: '7.5', boxOffice: 'US$ 942 milhões', emoji: '<i class="fa-solid fa-feather"></i>',
        gradient: 'linear-gradient(135deg, #8e44ad, #3498db)',
        poster: 'src/assets/images/posters/films/harry_potter_5.jpg',
        synopsis: 'Com Voldemort de volta, o Ministério envia Dolores Umbridge para controlar Hogwarts. Harry forma a Armada de Dumbledore.',
        cast: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson', 'Imelda Staunton', 'Helena Bonham Carter']
    },
    {
        id: 6,
        title: 'Harry Potter e o Enigma do Príncipe',
        titleEn: 'Harry Potter and the Half-Blood Prince',
        year: 2009, duration: '2h 33min', director: 'David Yates',
        rating: '7.6', boxOffice: 'US$ 935 milhões', emoji: '<i class="fa-solid fa-book-journal-whills"></i>',
        gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        poster: 'src/assets/images/posters/films/harry_potter_6.jpg',
        synopsis: 'Dumbledore revela o passado sombrio de Voldemort através de memórias. Harry descobre o misterioso livro do "Príncipe Mestiço".',
        cast: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson', 'Jim Broadbent', 'Alan Rickman']
    },
    {
        id: 7,
        title: 'Harry Potter e as Relíquias da Morte — Parte 1',
        titleEn: 'Harry Potter and the Deathly Hallows – Part 1',
        year: 2010, duration: '2h 26min', director: 'David Yates',
        rating: '7.7', boxOffice: 'US$ 977 milhões', emoji: '<i class="fa-solid fa-triangle-exclamation"></i>',
        gradient: 'linear-gradient(135deg, #2c3e50, #34495e)',
        poster: 'src/assets/images/posters/films/harry_potter_7.jpg',
        synopsis: 'Harry, Ron e Hermione abandonam Hogwarts para caçar e destruir as Horcruxes de Voldemort, enfrentando perigos mortais.',
        cast: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson', 'Ralph Fiennes', 'Bill Nighy']
    },
    {
        id: 8,
        title: 'Harry Potter e as Relíquias da Morte — Parte 2',
        titleEn: 'Harry Potter and the Deathly Hallows – Part 2',
        year: 2011, duration: '2h 10min', director: 'David Yates',
        rating: '8.1', boxOffice: 'US$ 1.34 bilhão', emoji: '<i class="fa-solid fa-bolt"></i>',
        gradient: 'linear-gradient(135deg, #e74c3c, #c0392b, #2c3e50)',
        poster: 'src/assets/images/posters/films/harry_potter_8.jpg',
        synopsis: 'A batalha final por Hogwarts. Harry descobre a verdade sobre as Relíquias da Morte e enfrenta Voldemort no confronto decisivo.',
        cast: ['Daniel Radcliffe', 'Rupert Grint', 'Emma Watson', 'Ralph Fiennes', 'Alan Rickman']
    }
];
