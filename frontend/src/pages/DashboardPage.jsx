import { useState, useEffect, useRef } from "react";
import StatsTabs from "../components/StatsTabs";
import DailyCharts from "../components/DailyCharts";

export default function DashboardPage() {
    const currentDate = new Date();
    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth() + 1); // +1 parce que les mois sont indexés à partir de 0
    const [allTimeData, setAllTimeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const monthKey = `${year}-${String(month).padStart(2, '0')}-`;
    const monthData = allTimeData?.filter(day => day.date.startsWith(monthKey)) ?? null;
    const yearData = allTimeData?.filter(day => day.date.startsWith(`${year}-`)) ?? null;
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchAllTime();
        }
    }, []);

    // On récupère les infos des daily depuis le début
    async function fetchAllTime() {
        setLoading(true);
        try{
            const allDays =  [];

            for (let y = 2020; y <= currentDate.getFullYear(); y++) {
                const maxMonth = y === currentDate.getFullYear() ? currentDate.getMonth() + 1 : 12;
                for (let m = 1; m <= maxMonth; m++) {
                    const res = await fetch(`/api/daily/month?year=${y}&month=${m}`, {
                        credentials: 'include'
                    });
                    const json = await res.json();
                    if (Array.isArray(json)) allDays.push(...json); //on ajoute le resultat de chaque mois dans l'array globale si la réponse est une array
                    await new Promise(resolve => setTimeout(resolve, 150)); // On attend un petit temps avant le prochain fetch pour éviter le rate limiting de l'API
                }
            }
            setAllTimeData(allDays);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

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
                        {length: currentDate.getFullYear() - 2020 + 1},
                        (_, i) => 2020 + i
                    ).map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            {loading && <p>Chargement...</p>}
            {error && <p>{error}</p>}

            {monthData && monthData.length > 0 && (
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
                        {monthData.map((day) => (
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

            < StatsTabs  allTimeData={allTimeData} yearData={yearData} monthData={monthData}/>
            <DailyCharts data={monthData} />

        </div>
    );

}