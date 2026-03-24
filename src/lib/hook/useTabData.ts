import { useMemo, useState } from 'react';
import compareString from '../function/compareString';

interface arguments<D> {
    datas: D[];
    isSort?: boolean;
    isFilter?: boolean;
}

function useTabData<D extends Record<string, string>>({ datas, isSort, isFilter }: arguments<D>) {
    const [sortBy, setSortBy] = useState<null | keyof D>(null);
    const [filter, setFilter] = useState<Map<keyof D, Set<unknown>>>(new Map());

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
    }, [datas, isFilter]);
    return {
        datas: sortDatas,
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
        },
        filter,
        filterOptions,
    };
}

export default useTabData;
