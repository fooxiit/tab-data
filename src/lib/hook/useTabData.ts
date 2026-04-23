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
    keyId: keyof D;
}

function useTabData<D extends Record<string, string>>({ datas, isSort, isFilter, maxRow, keyId }: arguments<D>) {
    if (maxRow && maxRow < 1) throw new Error('maxRow must be greater than 0');
    const [sortBy, setSortBy] = useState<null | keyof D>(null);
    const [filter, setFilter] = useState<Map<keyof D, Set<unknown>>>(new Map());
    const [page, setPage] = useState(0);
    const dataSet = useMemo(() => datas.reduce((map, data) => map.set(data[keyId], data), new Map()), [datas, keyId]);

    const filtredDatas = useMemo(() => {
        if (filter.size === 0 || !isFilter) return datas.map((data) => data[keyId]);
        return filterDatas(datas, filter, keyId);
    }, [datas, filter, isFilter, keyId]);
    const sortDatas = useMemo(() => {
        const sortDataBy = (by: keyof D, datas: unknown[]) => {
            return [...datas].sort((a, b) => compareString('US', dataSet.get(a)[by], dataSet.get(b)[by]));
        };
        if (!sortBy || !isSort) return filtredDatas;
        return sortDataBy(sortBy, filtredDatas);
    }, [filtredDatas, sortBy, isSort, dataSet]);

    const filterOptions = useMemo(() => {
        if (!isFilter) return null;
        return getFilter(datas);
    }, [datas, isFilter]);
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
        datas: dataSet,
        dataIds: limitedDatas,
        sortBy: handelSort,
        filterBy,
        filter,
        filterOptions,
        pages: pages,
    };
}

export default useTabData;

function getFilter<D extends Record<string, string>>(datas: D[]) {
    return datas.reduce((options, data) => {
        for (const key in data) {
            if (options.has(key)) {
                options.get(key)?.add(data[key]);
            } else {
                options.set(key, new Set([data[key]]));
            }
        }
        return options;
    }, new Map<keyof D, Set<unknown>>());
}

function filterDatas<D extends Record<string, unknown>>(datas: D[], filter: Map<keyof D, Set<unknown>>, keyId: keyof D) {
    return datas.reduce<unknown[]>((dataIds, data) => {
        let isValid = true;
        filter.forEach((filterValue, filterKey) => {
            if (!filterValue.has(data[filterKey as string])) {
                isValid = false;
                return;
            }
        });
        if (isValid) dataIds.push(data[keyId]);

        return dataIds;
    }, []);
}
