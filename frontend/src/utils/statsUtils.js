export function computeStats(days) {
    if (!days || days.length === 0) return null;

    //calcul de la moyenne
    const avg = (values) => values.reduce((sum, v) => sum + v, 0) / values.length;

    return {
        count: days.length,
        avgScore: Math.round(avg(days.map(d => d.score))),
        avgWorldRank: Math.round(avg(days.map(d => d.world.rank))),
        avgWorldPercent: avg(days.map(d => parseFloat(d.world.percent))).toFixed(1), //retourne une string
        avgCountryRank: Math.round(avg(days.map(d => d.country.rank))),
        avgCountryPercent: avg(days.map(d => parseFloat(d.country.percent))).toFixed(1),//retourne une string
    };
}