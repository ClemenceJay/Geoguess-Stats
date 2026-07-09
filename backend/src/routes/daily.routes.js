import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { getMonthHistory, getWorldLeaderboard, getCountryLeaderboard } from '../services/geoguessrClient.js';
import { buildDateStr, calcPercent, findUserEntry } from '../utils/dailyUtils.js';

const router = express.Router();

// On ajoute le middleware entre le chemin et le handler final. Si requireAuth appelle next (= user connecté) alors la suite s'execute.
router.get('/month', requireAuth, async (req, res) => {
    try {

        //Recupère les infos
        const { ncfa } = req.session;
        const { year, month } = req.query; 
        // Recupère les daily joués dans le mois
        const rawdata = await getMonthHistory(ncfa, year, month);
        // On gère si ça ne renvoie rien car pas d'info on renvoie un tableau vide
        const daysPlayed = Array.isArray(rawdata) ? rawdata : [];
        // On supprime les jours sans score (envoyés par geoguessr pour la prtection de la streak)
        const reallyDaysPlayed = daysPlayed.filter(day => day.totalScore !== null);

        const userId = req.session.user.id;

        const results = await Promise.all(
            reallyDaysPlayed.map(async (day) => {
                // Pour chaque jour on met la date au bon format
                const dateStr = buildDateStr(year, month, day.day);
                // On récupère les résultat world et pays en parallèle
                const [worldLB, countryLB] = await Promise.all([
                    getWorldLeaderboard(ncfa, dateStr),
                    getCountryLeaderboard(ncfa, dateStr)
                ]);

                //On recherche notre classement
                const worldEntry = findUserEntry(worldLB.entries, userId);
                const countryEntry = findUserEntry(countryLB.entries, userId);

                return {
                    date: dateStr,
                    score: day.totalScore,
                    world: {
                        rank: worldEntry?.rank,
                        total: worldLB.totalEntries,
                        percent: calcPercent(worldEntry?.rank, worldLB.totalEntries)
                    },
                    country: {
                        rank: countryEntry?.rank,
                        total: countryLB.totalEntries,
                        percent: calcPercent(countryEntry?.rank, countryLB.totalEntries)
                    }
                };
            })
        );

        res.json(results);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router;