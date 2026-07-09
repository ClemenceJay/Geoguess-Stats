export default function StatsDisplay({ stats, title, erreur }) {
    if (!stats) return null;

    return(
        <div>
            <h2>{title} ({ stats.count} daily joués)</h2>

            {erreur && <p>{erreur}</p>}
            {!erreur &&
                <ul>
                    <li>Score moyen : {stats.avgScore}</li>
                    <li>Rang monde moyen : {stats.avgWorldRank} (top {stats.avgWorldPercent}%)</li>
                    <li>Rang pays moyen : {stats.avgCountryRank} (top {stats.avgCountryPercent}%)</li>
                </ul>
            }
        </div>
    );
}