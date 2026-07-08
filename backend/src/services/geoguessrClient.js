import axios from 'axios';

const BASE_URL = 'https://www.geoguessr.com';

// Chaque requete aura la base url et le cookie dans le Header - fonction non exportée
function createClient(ncfa) {
    return axios.create({
        baseURL: BASE_URL,
        headers: { Cookie: `_ncfa=${ncfa}`}
    });
}


// Fonctions d'obtention des infos: appel du endpoint de geoguessr et renvoie des infos utiles

export async function getUserInfo(ncfa) {
    const client = createClient(ncfa);
    const res = await client.get('/api/v4/feed/private?count=1');
    const user = res.data.entries[0].user;
    return {
        id: user.id,
        nick: user.nick
    };
}

export async function getMonthHistory(ncfa, year, month) {
    const client = createClient(ncfa);
    const res = await client.get(`/api/v3/challenges/daily-challenges/me/month?year=${year}&month=${month}`);
    return res.data;
}


export async function getWorldLeaderboard(ncfa, dateStr) { // dateStr au format "YYYY-MM-DD"
    const client = createClient(ncfa);
    const res = await client.get(`/api/v3/challenges/daily-challenges/leaderboard/all?dateStr=${dateStr}`);
    return res.data;
}

export async function getCountryLeaderboard(ncfa, dateStr) {
    const client = createClient(ncfa);
    const res = await client.get(`/api/v3/challenges/daily-challenges/leaderboard/country?dateStr=${dateStr}`);
    return res.data;
}




