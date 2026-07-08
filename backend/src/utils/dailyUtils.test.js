import { describe, it, expect } from 'vitest';
import { buildDateStr, calcPercent, findUserEntry } from './dailyUtils.js';

describe('buildDateStr', () => {
    it('ajoute un zéro devant le mois et le jour si besoin', () => {
        expect(buildDateStr(2026, 6, 5)).toBe('2026-06-05');
    });
    it('fonctionne avec mois et jours sur 2 chiffres', () => {
        expect(buildDateStr(2026,12,31)).toBe('2026-12-31');
    });
});

describe('calcPercent', () => {
    it('calcule le % arrondie à 1 décimale', () => {
        expect(calcPercent(13052,37395)).toBe('34.9');
    });
    it('retourne 1.0 pour le rang 1 sur 100', () => {
        expect(calcPercent(1,100)).toBe('1.0');
    });
});

describe('findUserEntry', () => {
    it("trouve l'entrée de l'utilisateur par userId", () => {
        const entries = [
            { userId: 'john', rank: 1},
            { userId: 'test007', rank: 13052}
        ]
        expect(findUserEntry(entries, "test007")).toEqual({ userId: 'test007', rank: 13052 });
    });
    it("retourne undefined si l'utilisateur n'est pas dans le tableau", () => {
        expect(findUserEntry([], "test007")).toBeUndefined();
    });
});