import { describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import useExtractFilterOption from '../../hook/useExtractFilterOption';

describe('test useExtractFilterOption hook', () => {
    test('should extract filter options correctly', () => {
        const datas = [
            { name: 'Alice', age: '30' },
            { name: 'Bob', age: '25' },
            { name: 'Charlie', age: '30' },
        ];
        const isFilter = true;
        const filterOptions = renderHook(() => useExtractFilterOption(datas, isFilter));
        expect(filterOptions.result.current).toEqual(
            new Map([
                ['name', new Set(['Alice', 'Bob', 'Charlie'])],
                ['age', new Set(['30', '25'])],
            ]),
        );
    });
    test('should return null when isFilter is false', () => {
        const datas = [
            { name: 'Alice', age: '30' },
            { name: 'Bob', age: '25' },
        ];
        const isFilter = false;
        const filterOptions = renderHook(() => useExtractFilterOption(datas, isFilter));
        expect(filterOptions.result.current).toBeNull();
    });
});
