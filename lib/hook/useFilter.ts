import { useCallback, useState } from 'react';
//Gère l'état des filtres. Chaque appel à `filterBy` active ou désactive un filtre.
function useFilter<D extends Record<string, string>>(initialFilter?: Map<keyof D, Set<unknown>>) {
    const [filter, setFilter] = useState<Map<keyof D, Set<unknown>>>(initialFilter || new Map());
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
        },
        [filter],
    );
    return { filter, filterBy };
}
export default useFilter;
