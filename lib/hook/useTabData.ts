import { useMemo } from 'react';
import compareString from '../function/compareString';
import type { SortBy } from './useSelectSort';

export type PageControl = {
    currentPage: number;
    maxPage: number;
    Control: {
        next: () => void;
        prev: () => void;
        set: (page: number) => void;
    };
} | null;

interface props<D extends Record<string, string>> {
    datas: D[];
    isSort?: boolean;
    isFilter?: boolean;
    maxRow?: number;
    filter?: Map<keyof D, Set<unknown>>;
    sortByValue?: SortBy<D> | null;
}
//Hook principal qui applique le filtrage, le tri et la pagination sur un tableau de données.
function useTabData<D extends Record<string, string>>({ datas, isSort, isFilter, maxRow, filter = new Map(), sortByValue }: props<D>) {
    if (maxRow && maxRow < 1) throw new Error('maxRow must be greater than 0');

    const filteredDatas = useMemo(() => {
        if (filter.size === 0 || !isFilter) return datas;
        return datas.filter((data) => {
            let isValid = true;
            filter.forEach((filterValue, filterKey) => {
                if (!filterValue.has(data[filterKey as string])) {
                    isValid = false;
                    return;
                }
            });
            return isValid;
        });
    }, [datas, filter, isFilter]);
    const sortDatas = useMemo(() => {
        const sortDataBy = (sortBy: SortBy<D>, datas: D[]) => {
            if (sortBy.direction === 'asc') return [...datas].sort((a, b) => compareString('US', a[sortBy.key as string], b[sortBy.key as string]));
            return [...datas].sort((a, b) => compareString('US', b[sortBy.key as string], a[sortBy.key as string]));
        };
        if (!sortByValue || !isSort) return filteredDatas;
        return sortDataBy(sortByValue, filteredDatas);
    }, [filteredDatas, sortByValue, isSort]);

    return {
        filteredDatas: sortDatas,
    };
}

export default useTabData;
