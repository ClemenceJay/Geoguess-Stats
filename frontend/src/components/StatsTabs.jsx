import { computeStats } from "../utils/statsUtils";
import StatsDisplay from "./StatsDisplay";
import { useState } from "react";

export default function StatsTabs({allTimeData, yearData, monthData}) {
    const [activeTab, setActiveTab] = useState('month'); //on se met par défaut sur l'onglet mois

    console.log('mois');
    console.log(monthData);
    console.log('années');
    console.log(yearData);
    return (
        <div>
            <div>
                <button onClick={() => setActiveTab('month')}>Mois</button>
                <button onClick={() => setActiveTab('year')}>Année</button>
                <button onClick={() => setActiveTab('alltime')}>Depuis 2020</button>
            </div>

            {activeTab === 'month' && <StatsDisplay stats={computeStats(monthData)} title="mois chargé" />}
            {activeTab === 'year' && <StatsDisplay stats={computeStats(yearData)} title="Année sélectionnée" />}
            {activeTab === 'alltime' && <StatsDisplay stats={computeStats(allTimeData)} title="Depuis 2020" />}
        </div>
    );
}

