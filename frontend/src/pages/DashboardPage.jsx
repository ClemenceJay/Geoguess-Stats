import { useState } from "react";
import { computeStats } from "../utils/statsUtils";

export default function DashboardPage() {
    const currentDate = new Date();
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth() + 1); // +1 parce que les mois sont indexés à partir de 0
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchMonth() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/daily/month?year=${year}&month=${month}`, {
                credentials: 'include', //pour que le cookie de session soit envoyé
            });
            if (!res.ok) throw new Error('Erreur lors du chargement');
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // On récupère les stats globales avec les datas récupérés pour le mois choisi
    const stats = computeStats(data);

    return (
        <div>
            <h1>Geoguess-Stat</h1>

            <div>
                <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                    {/* Génère les 12 mois */}
                    {Array.from(
                        { length: 12 },
                        (_, i) => i+1
                    ).map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
                <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                    {Array.from( 
                        {length: currentDate.getFullYear() - 2015 + 1},
                        (_, i) => 2015 + i
                    ).map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
                <button onClick={fetchMonth}>Charger</button>
            </div>

            {loading && <p>Chargement...</p>}
            {error && <p>{error}</p>}

            {data && (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Score</th>
                            <th>Rang Monde</th>
                            <th>Top % Monde</th>
                            <th>Rang Pays</th>
                            <th>Top % Pays</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((day) => (
                            <tr key={day.date}>
                                <td>{day.date}</td>
                                <td>{day.score}</td>
                                <td>{day.world.rank}</td>
                                <td>{day.world.percent} %</td>
                                <td>{day.country.rank}</td>
                                <td>{day.country.percent} %</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {stats && (
                <div>
                    <br />
                    <br />
                    <br />
                    <h2>Stats du mois ({stats.count} daily joués)</h2>
                    <ul>
                        <li>Score moyen : {stats.avgScore}</li>
                        <li>Rang monde moyen : {stats.avgWorldRank} (top {stats.avgWorldPercent}%)</li>
                        <li>Rang pays moyen : {stats.avgCountryRank} (top {stats.avgCountryPercent}%)</li>
                    </ul>
                </div>
            )}
        </div>
    );

}