import { describe, expect, test } from 'vitest';
import useTabData from '../../hook/useTabData';
import { renderHook } from '@testing-library/react';

describe('test useTabData hook', () => {
    const data = [
        { id: '1', name: 'John', age: '30', city: 'New York' },
        { id: '2', name: 'Jane', age: '25', city: 'Paris' },
        { id: '3', name: 'Doe', age: '35', city: 'Paris' },
    ];
    test('should return raw data when no sort and filter', () => {
        const { filtedDatas } = renderHook(() => useTabData({ datas: data, isSort: false, isFilter: false })).result.current;
        expect(filtedDatas).toEqual(data);
    });

    describe('test filter', () => {
        test('should return all data when filter is empty', () => {
            const { result } = renderHook(() => useTabData({ datas: data, isSort: false, isFilter: true, filter: new Map() }));
            expect(result.current.filtedDatas).toEqual(data);
        });
        test('should filter by one criteria', () => {
            const { result: useDataResult } = renderHook(() => useTabData({ datas: data, isSort: false, isFilter: true, filter: new Map([['age' as keyof (typeof data)[0], new Set(['30'])]]) }));
            expect(useDataResult.current.filtedDatas).toEqual([{ id: '1', name: 'John', age: '30', city: 'New York' }]);
        });
        test('should filter by multiple criteria', () => {
            const { result: useDataResult } = renderHook(() =>
                useTabData({
                    datas: data,
                    isSort: false,
                    isFilter: true,
                    filter: new Map([
                        ['age' as keyof (typeof data)[0], new Set(['30'])],
                        ['city' as keyof (typeof data)[0], new Set(['Paris'])],
                    ]),
                }),
            );

            expect(useDataResult.current.filtedDatas).toEqual([]);
        });
    });
    describe('test sorting', () => {
        test('should sort data by name ascending', () => {
            const sortBy = { key: 'name' as keyof (typeof data)[0], direction: 'asc' } as const;
            const { result } = renderHook(() => useTabData({ datas: data, isSort: true, isFilter: false, sortByValue: sortBy }));
            expect(result.current.filtedDatas).toEqual([
                { id: '3', name: 'Doe', age: '35', city: 'Paris' },
                { id: '2', name: 'Jane', age: '25', city: 'Paris' },
                { id: '1', name: 'John', age: '30', city: 'New York' },
            ]);
        });
        test('should sort data by age descending', () => {
            const sortBy = { key: 'age' as keyof (typeof data)[0], direction: 'desc' } as const;
            const { result } = renderHook(() => useTabData({ datas: data, isSort: true, isFilter: false, sortByValue: sortBy }));
            expect(result.current.filtedDatas).toEqual([
                { id: '3', name: 'Doe', age: '35', city: 'Paris' },
                { id: '1', name: 'John', age: '30', city: 'New York' },
                { id: '2', name: 'Jane', age: '25', city: 'Paris' },
            ]);
        });
        test('should return sorted and filtered data', () => {
            const sortBy = { key: 'age' as keyof (typeof data)[0], direction: 'asc' } as const;
            const { result } = renderHook(() =>
                useTabData({ datas: data, isSort: true, isFilter: true, filter: new Map([['city' as keyof (typeof data)[0], new Set(['Paris'])]]), sortByValue: sortBy }),
            );
            expect(result.current.filtedDatas).toEqual([
                { id: '2', name: 'Jane', age: '25', city: 'Paris' },
                { id: '3', name: 'Doe', age: '35', city: 'Paris' },
            ]);
        });
    });
    describe('test page splitting', () => {
        test('should return all data when pageSize is larger than data length', () => {
            const { result } = renderHook(() => useTabData({ datas: data, isSort: false, isFilter: false, maxRow: 10, page: 0 }));
            expect(result.current.filtedDatas).toEqual(data);
        });
        test('should return paginated data', () => {
            const { result } = renderHook(() => useTabData({ datas: data, isSort: false, isFilter: false, maxRow: 2, page: 0 }));
            expect(result.current.filtedDatas).toEqual([
                { id: '1', name: 'John', age: '30', city: 'New York' },
                { id: '2', name: 'Jane', age: '25', city: 'Paris' },
            ]);
        });
    });
});
