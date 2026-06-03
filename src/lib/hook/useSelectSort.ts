import { useCallback, useState } from 'react';

export type SortBy<D extends Record<string, string>> = { key: keyof D; direction: 'asc' | 'desc' };

function useSelectSort<D extends Record<string, string>>() {
    const [sortByValue, setSortBy] = useState<SortBy<D> | null>(null);

    const sortBy = useCallback(
        (by: keyof D) => {
            const { key, direction } = sortByValue || {};
            if (key !== by || sortByValue === null) return setSortBy({ key: by, direction: 'asc' });
            if (direction === 'asc') return setSortBy({ key, direction: 'desc' });
            setSortBy(null);
        },
        [sortByValue, setSortBy],
    );

    return { sortByValue, sortBy };
}

export default useSelectSort;
