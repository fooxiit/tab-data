import { useMemo } from 'react';
import compareString from '../function/compareString';
import type { SortBy } from './useSelectSort';

export type PageControle = {
    currentPage: number;
    maxPage: number;
    controle: {
        next: () => void;
        prev: () => void;
        set: (page: number) => void;
    };
} | null;

interface arguments<D extends Record<string, string>> {
    datas: D[];
    isSort?: boolean;
    isFilter?: boolean;
    maxRow?: number;
    filter?: Map<keyof D, Set<unknown>>;
    sortByValue?: SortBy<D> | null;
    page?: number;
}
//Hook principal qui applique le filtrage, le tri et la pagination sur un tableau de données.
function useTabData<D extends Record<string, string>>({ datas, isSort, isFilter, maxRow, filter = new Map(), sortByValue, page }: arguments<D>) {
    if (maxRow && maxRow < 1) throw new Error('maxRow must be greater than 0');

    const filtredDatas = useMemo(() => {
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
        if (!sortByValue || !isSort) return filtredDatas;
        return sortDataBy(sortByValue, filtredDatas);
    }, [filtredDatas, sortByValue, isSort]);

    const limitedDatas = useMemo(() => {
        if (!maxRow || page === undefined) return sortDatas;
        const start = page * maxRow;
        const end = start + maxRow;
        return sortDatas.slice(start, end);
    }, [sortDatas, page, maxRow]);

    return {
        filtedDatas: limitedDatas,
    };
}

export default useTabData;
