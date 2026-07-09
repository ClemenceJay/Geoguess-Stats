import { computeStats } from "../utils/statsUtils";
import StatsDisplay from "./StatsDisplay";
import { useState, useEffect } from "react";

export default function StatsTabs({data, year}) {

    const currentDate = new Date();
    const [activeTab, setActiveTab] = useState('month'); //on se met par défaut sur l'onglet mois
    const [yearData, setYearData] = useState(null);
    const [yearLoading, setYearLoading] = useState(false);
    const [allTimeData, setAllTimeData] = useState(null);
    const [allTimeLoading, setAllTimeLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setYearData(null);
    }, [year]);

    
    // On récupère les infos de l'année
    async function fetchYearStats() {
        setYearLoading(true);
        //Si les données depuis le début ont déjà précédemment été récupérées on les utilise
        if (allTimeData) {
            const filtered = allTimeData.filter(day => day.date.startsWith(`${year}-`));
            setYearData(filtered);
            return;
        }
        try{
            // On récupère le nombre de mois de l'année ( 12 ou jusqu'au mois actuelle si année en cours)
            const maxMonth = year === currentDate.getFullYear() ? currentDate.getMonth() + 1 : 12;
            const allDays =  [];

            for (let m = 1; m <= maxMonth; m++) {
                const res = await fetch(`/api/daily/month?year=${year}&month=${m}`, {
                    credentials: 'include'
                });
                const json = await res.json();
                if (Array.isArray(json)) allDays.push(...json); //on ajoute le resultat de chaque mois dans l'array globale si la réponse est une array
            }

            setYearData(allDays);
        } catch (err) {
            setError(err.message);
        } finally {
            setYearLoading(false);
        }
    }

    // On récupère les infos depuis le début
    async function fetchAllTimeStats() {
        setAllTimeLoading(true);
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
                }
            }

            setAllTimeData(allDays);
        } catch (err) {
            setError(err.message);
        } finally {
            setAllTimeLoading(false);
        }
    }

    return (
        <div>
            <div>
                <button onClick={() => setActiveTab('month')}>Mois chargé</button>
                <button onClick={() => {setActiveTab('year'); if (!yearData) fetchYearStats(); }}>{year}</button>
                <button onClick={() => { setActiveTab('alltime'); if (!allTimeData) fetchAllTimeStats(); }}>Depuis 2020</button>
            </div>

            {activeTab === 'month' && <StatsDisplay stats={computeStats(data)} title={"mois chargé"} erreur={error}/>}
            {activeTab === 'year' && (yearLoading ? <p>Chargement...</p> : <StatsDisplay stats={computeStats(yearData)} title={year} erreur={error} />)}
            {activeTab === 'alltime' && (allTimeLoading ? <p>Chargement...</p>: <StatsDisplay stats={computeStats(allTimeData)} title={"Depuis 2020"} erreur={error} />)}
        </div>
    );
}

