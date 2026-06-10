import { useMemo } from 'react';

//xtrait les valeurs uniques de chaque colonne pour alimenter les menus de filtres.
function useExtractFilterOption<D extends Record<string, string>>(datas: D[], isFilter: boolean | undefined) {
    const filterOptions = useMemo(() => {
        if (!isFilter) return null;
        return getFilter(datas);
    }, [datas, isFilter]);
    return filterOptions;
}

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

export default useExtractFilterOption;
