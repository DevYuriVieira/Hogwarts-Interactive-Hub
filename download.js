const fs = require('fs');
const https = require('https');
const path = require('path');

const movies = [
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/uLOmOF5IzWqawQMkaGGOIqBoXv2.jpg",
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/811j0EqZFIbgFR4zZofZ95RkXPA.jpg",
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/1ikjXhQweL3bJgM7k0B62N1S0O5.jpg",
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/3bM0Yn6oG41wU9eQ7w8qGg4tYfS.jpg",
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/n5ZlS0tLhSjVzI7tF82sT9g8Q2N.jpg",
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qA1tPEQn3Kz6A0N1E1T0oOQ8YgS.jpg",
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fT1S0A14g6W4t3Z0m2Y0q6Y7KqM.jpg"
];

const games = [
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7e.png",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7f.png",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co2k77.png",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7g.png",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7h.png",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7i.png",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7m.png",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7n.png",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vbg.png",
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co87t6.png"
];

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
};

async function run() {
    const filmsDir = path.join(__dirname, 'mundo-bruxo', 'assets', 'images', 'posters', 'films');
    const gamesDir = path.join(__dirname, 'mundo-bruxo', 'assets', 'images', 'posters', 'games');
    
    fs.mkdirSync(filmsDir, { recursive: true });
    fs.mkdirSync(gamesDir, { recursive: true });

    console.log('Downloading movies...');
    for (let i = 0; i < movies.length; i++) {
        await download(movies[i], path.join(filmsDir, `${i + 1}.jpg`));
        console.log(`Movie ${i + 1} downloaded.`);
    }

    console.log('Downloading games...');
    for (let i = 0; i < games.length; i++) {
        await download(games[i], path.join(gamesDir, `${i + 1}.png`));
        console.log(`Game ${i + 1} downloaded.`);
    }
}

run();
