import { describe, expect, test } from 'vitest';
import compareString from '../../function/compareString';

describe('compareString function test', () => {
    test('should compare two strings correctly', () => {
        const result1 = compareString('en-US', 'apple', 'banana');
        const result2 = compareString('en-US', 'Grape', 'grape');
        const result3 = compareString('en-US', 'orange', 'apple');
        const result4 = compareString('fr-FR', 'éclair', 'eclair');
        const result5 = compareString('fr-FR', 'chocolat', 'lait');
        expect(result1).toBeLessThan(0);
        expect(result2).toBeGreaterThan(0);
        expect(result3).toBeGreaterThan(0);
        expect(result4).toBeGreaterThan(0);
        expect(result5).toBeLessThan(0);
    });
});
