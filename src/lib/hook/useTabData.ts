import { useCallback, useMemo, useState } from 'react';
import compareString from '../function/compareString';

export type PageControle = {
    currentPage: number;
    maxPage: number;
    controle: {
        next: () => void;
        prev: () => void;
        set: (page: number) => void;
    };
} | null;

interface arguments<D> {
    datas: D[];
    isSort?: boolean;
    isFilter?: boolean;
    maxRow?: number;
}

function useTabData<D extends Record<string, string>>({ datas, isSort, isFilter, maxRow }: arguments<D>) {
    if (maxRow && maxRow < 1) throw new Error('maxRow must be greater than 0');
    const [sortBy, setSortBy] = useState<null | keyof D>(null);
    const [filter, setFilter] = useState<Map<keyof D, Set<unknown>>>(new Map());
    const [page, setPage] = useState(0);

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
        const sortDataBy = (by: keyof D, datas: D[]) => {
            return [...datas].sort((a, b) => compareString('US', a[by as string], b[by as string]));
        };
        if (!sortBy || !isSort) return filtredDatas;
        return sortDataBy(sortBy, filtredDatas);
    }, [filtredDatas, sortBy, isSort]);

    const limitedDatas = useMemo(() => {
        if (!maxRow) return sortDatas;
        const start = page * maxRow;
        const end = start + maxRow;
        return sortDatas.slice(start, end);
    }, [sortDatas, page, maxRow]);

    const filterBy = useCallback(
        (filterKey: keyof D, filterValue: unknown) => {
            const filterOption = filter.get(filterKey);
            if (filterOption) {
                if (!filterOption.delete(filterValue)) {
                    filterOption.add(filterValue);
                } else {
                    if (filterOption.size === 0) filter.delete(filterKey);
                }
                setFilter(new Map(filter));
            } else {
                setFilter(new Map(filter.set(filterKey, new Set([filterValue]))));
            }
            setPage(0);
        },
        [filter],
    );

    const handelSort = useCallback((by: keyof D) => {
        setSortBy(by);
    }, []);
    const pages = useMemo(() => {
        if (maxRow === undefined) return null;
        return {
            currentPage: page,
            maxPage: Math.ceil(sortDatas.length / maxRow),
            controle: {
                next: () => setPage((prevPage) => (prevPage === Math.ceil(sortDatas.length / maxRow) - 1 ? prevPage : prevPage + 1)),
                prev: () => setPage((prevPage) => (prevPage === 0 ? 0 : prevPage - 1)),
                set: (page: number) => setPage(page),
            },
        };
    }, [sortDatas, maxRow, page]);
    return {
        filtedDatas: limitedDatas,
        sortBy: handelSort,
        sortByValue: sortBy,
        filterBy,
        filter,
        pages: pages,
    };
}

export default useTabData;
