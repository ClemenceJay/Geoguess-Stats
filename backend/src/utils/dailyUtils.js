// Conversion de la date au format "YYYY-MM-DD"
export function buildDateStr(year, month, day) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2,'0')}`;
}

//Calcul le rang en % (arrondi à 1 décimale)
export function calcPercent(rank, total) {
    return ((rank/total) * 100).toFixed(1);
}

// Cherche les données de l'user dans le leadeerboard
export function findUserEntry(entries, userId) {
    return entries.find(e => e.userId === userId);
}