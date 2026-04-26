const https = require('https');
const fs = require('fs');
const path = require('path');

const fetchUrl = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ data, url: res.url || url }));
        }).on('error', reject);
    });
};

const getWikiImage = async (pageTitle) => {
    try {
        const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&format=json&pithumbsize=1000`;
        const { data } = await fetchUrl(apiUrl);
        const json = JSON.parse(data);
        const pages = json.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pages[pageId].thumbnail) {
            return pages[pageId].thumbnail.source;
        }
        return null;
    } catch (e) {
        return null;
    }
};

const movies = [
    "Harry Potter and the Philosopher's Stone (film)",
    "Harry Potter and the Chamber of Secrets (film)",
    "Harry Potter and the Prisoner of Azkaban (film)",
    "Harry Potter and the Goblet of Fire (film)",
    "Harry Potter and the Order of the Phoenix (film)",
    "Harry Potter and the Half-Blood Prince (film)",
    "Harry Potter and the Deathly Hallows – Part 1",
    "Harry Potter and the Deathly Hallows – Part 2"
];

const games = [
    "Harry Potter and the Philosopher's Stone (video game)",
    "Harry Potter and the Chamber of Secrets (video game)",
    "Harry Potter: Quidditch World Cup",
    "Harry Potter and the Prisoner of Azkaban (video game)",
    "Harry Potter and the Goblet of Fire (video game)",
    "Harry Potter and the Order of the Phoenix (video game)",
    "Lego Harry Potter: Years 1–4",
    "Lego Harry Potter: Years 5–7",
    "Hogwarts Legacy",
    "Harry Potter: Quidditch Champions"
];

const downloadImage = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (res) => {
            res.pipe(file);
            file.on('finish', () => file.close(resolve));
        }).on('error', err => fs.unlink(dest, () => reject(err)));
    });
};

async function main() {
    const filmsDir = path.join(__dirname, 'mundo-bruxo', 'assets', 'images', 'posters', 'films');
    const gamesDir = path.join(__dirname, 'mundo-bruxo', 'assets', 'images', 'posters', 'games');
    
    fs.mkdirSync(filmsDir, { recursive: true });
    fs.mkdirSync(gamesDir, { recursive: true });

    for (let i = 0; i < movies.length; i++) {
        const imgUrl = await getWikiImage(movies[i]);
        if (imgUrl) {
            console.log(`Movie ${i+1}: Found ${imgUrl}`);
            await downloadImage(imgUrl, path.join(filmsDir, `${i + 1}.jpg`));
        } else {
            console.log(`Movie ${i+1}: NOT FOUND`);
        }
    }

    for (let i = 0; i < games.length; i++) {
        const imgUrl = await getWikiImage(games[i]);
        if (imgUrl) {
            console.log(`Game ${i+1}: Found ${imgUrl}`);
            await downloadImage(imgUrl, path.join(gamesDir, `${i + 1}.png`));
        } else {
            console.log(`Game ${i+1}: NOT FOUND`);
        }
    }
}

main();
