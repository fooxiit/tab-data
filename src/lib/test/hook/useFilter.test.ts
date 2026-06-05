import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import useFilter from '../../hook/useFilter';
import { act } from 'react';

describe('test useFilter hook', () => {
    test('should return initial filter value', () => {
        const initialFilter = new Map([['age', new Set(['30'])]]);
        const { result } = renderHook(() => useFilter(initialFilter));
        expect(result.current.filter).toEqual(initialFilter);
    });

    test('should add filter value to filter map when map is empty', () => {
        const { result } = renderHook(() => useFilter());
        act(() => {
            result.current.filterBy('age', '30');
        });
        expect(result.current.filter).toEqual(new Map([['age', new Set(['30'])]]));
    });
    test('should add filter value to existing filter key', () => {
        const { result } = renderHook(() => useFilter(new Map([['age', new Set(['25'])]])));
        act(() => {
            result.current.filterBy('age', '30');
        });
        expect(result.current.filter).toEqual(new Map([['age', new Set(['25', '30'])]]));
    });
    test('should remove filter value from filter key', () => {
        const { result } = renderHook(() => useFilter(new Map([['age', new Set(['25', '30'])]])));
        act(() => {
            result.current.filterBy('age', '30');
        });
        expect(result.current.filter).toEqual(new Map([['age', new Set(['25'])]]));
    });
    test('should remove filter key from filter map when filter value is empty', () => {
        const { result } = renderHook(() => useFilter(new Map([['age', new Set(['30'])]])));
        act(() => {
            result.current.filterBy('age', '30');
        });
        expect(result.current.filter).toEqual(new Map());
    });
    test('should add filter when map is not empty', () => {
        const { result } = renderHook(() => useFilter(new Map([['age', new Set(['30'])]])));
        act(() => {
            result.current.filterBy('city', 'Paris');
        });
        expect(result.current.filter).toEqual(
            new Map([
                ['age', new Set(['30'])],
                ['city', new Set(['Paris'])],
            ]),
        );
    });
    test('should remove filter value and key when map has multiple filter value', () => {
        const { result } = renderHook(() =>
            useFilter(
                new Map([
                    ['age', new Set(['25', '30'])],
                    ['city', new Set(['Paris'])],
                ]),
            ),
        );
        act(() => {
            result.current.filterBy('city', 'Paris');
        });
        expect(result.current.filter).toEqual(new Map([['age', new Set(['25', '30'])]]));
    });
});
