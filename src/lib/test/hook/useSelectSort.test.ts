import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import useSelectSort from '../../hook/useSelectSort';
import { act } from 'react';
describe('test useSelectSort hook', () => {
    test('should return initial sortBy value', () => {
        const initialSortByValue = { key: 'name', direction: 'asc' } as const;
        const { result } = renderHook(() => useSelectSort(initialSortByValue));
        expect(result.current.sortByValue).toEqual(initialSortByValue);
    });
    test('should set sortBy value to asc when sortByValue is null', () => {
        const { result } = renderHook(() => useSelectSort(null));

        act(() => {
            result.current.sortBy('name');
        });
        expect(result.current.sortByValue).toEqual({ key: 'name', direction: 'asc' });
    });
    test('should set sortBy value to asc when sortBy is called with different key', () => {
        const initialSortByValue = { key: 'name', direction: 'asc' } as const;
        const { result } = renderHook(() => useSelectSort(initialSortByValue));
        act(() => {
            result.current.sortBy('age');
        });
        expect(result.current.sortByValue).toEqual({ key: 'age', direction: 'asc' });
    });

    test('should set sortBy value to null when sortBy is called with same key and direction is desc', () => {
        const initialSortByValue = { key: 'name', direction: 'desc' } as const;
        const { result } = renderHook(() => useSelectSort(initialSortByValue));
        act(() => {
            result.current.sortBy('name');
        });
        expect(result.current.sortByValue).toBeNull();
    });
    test('should set sortBy value to desc when sortBy is called with same key and direction is asc', () => {
        const initialSortByValue = { key: 'name', direction: 'asc' } as const;
        const { result } = renderHook(() => useSelectSort(initialSortByValue));
        act(() => {
            result.current.sortBy('name');
        });
        expect(result.current.sortByValue).toEqual({ key: 'name', direction: 'desc' });
    });
});
