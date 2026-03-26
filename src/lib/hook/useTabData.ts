import { useMemo, useState } from 'react';
import compareString from '../function/compareString';

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
            try {
                filter.forEach((filterValue, filterKey) => {
                    if (!filterValue.has(data[filterKey])) throw new Error('Row does not match filter criteria');
                });
                return true;
            } catch (err) {
                if (err) return false;
            }
        });
    }, [datas, filter, isFilter]);
    const sortDatas = useMemo(() => {
        const sortDataBy = (by: keyof D, datas: D[]) => {
            return [...datas].sort((a, b) => compareString('US', a[by], b[by]));
        };
        if (!sortBy || !isSort) return filtredDatas;
        return sortDataBy(sortBy, filtredDatas);
    }, [filtredDatas, sortBy, isSort]);

    const filterOptions = useMemo(() => {
        console.log('set option');
        if (!isFilter) return null;
        if (!filtredDatas) return getFilter(datas);
        return getFilter(filtredDatas);
    }, [datas, isFilter, filtredDatas]);
    const limitedDatas = useMemo(() => {
        if (!maxRow) return sortDatas;
        const start = page * maxRow;
        const end = start + maxRow;
        return sortDatas.slice(start, end);
    }, [sortDatas, page, maxRow]);
    return {
        datas: limitedDatas,
        sortBy: (by: keyof D) => {
            setSortBy(by);
        },
        filterBy: (filterKey: keyof D, filterValue: unknown) => {
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
        filter,
        filterOptions,
        pages:
            maxRow !== undefined
                ? {
                      currentPage: page,
                      maxPage: Math.ceil(sortDatas.length / maxRow),
                      controle: {
                          next: () => setPage((prevPage) => (prevPage === Math.ceil(sortDatas.length / maxRow) - 1 ? prevPage : prevPage + 1)),
                          prev: () => setPage((prevPage) => (prevPage === 0 ? 0 : prevPage - 1)),
                          set: (page: number) => setPage(page),
                      },
                  }
                : null,
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
