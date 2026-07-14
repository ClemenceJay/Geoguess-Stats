import { describe, it, expect } from 'vitest';
import { computeStats } from './statsUtils';

describe('computeStats', () => {
    it('retourne null si null en entrée', () => {
        expect(computeStats(null)).toBe(null);
    });
    it('retourne null si array vide en entrée', () => {
        expect(computeStats([])).toBe(null);
    });
    it('retourne des moyennes égales au valeurs du jour si un seul jour', () => {
        const oneDay = [
            {
                date: "2026-07-14",
                score: 4500,
                world: { rank: 120, percent: "5.5" },
                country: { rank: 10, percent: "2.3" }
            }
        ];
        expect(computeStats(oneDay)).toEqual({
            count: 1,
            avgScore: 4500,
            avgWorldRank: 120,
            avgWorldPercent: "5.5",
            avgCountryRank: 10,
            avgCountryPercent: "2.3"
        });
    });
    it('retourne les moyennes pour les différentes valeurs', () => {
    const multipleDays = [
        {
            date: "2026-07-12",
            score: 4000,
            world: { rank: 100, percent: "4.0" },
            country: { rank: 8, percent: "2.0" }
        },
        {
            date: "2026-07-13",
            score: 5000,
            world: { rank: 200, percent: "6.0" },
            country: { rank: 12, percent: "3.0" }
        }
    ];
        expect(computeStats(multipleDays)).toEqual({
            count: 2,
            avgScore: 4500,
            avgWorldRank: 150,
            avgWorldPercent: "5.0",
            avgCountryRank: 10,
            avgCountryPercent: "2.5"
        });
    });

})
