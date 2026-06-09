import { useEffect, useState } from 'react';
//Filtre une liste de données selon une valeur de recherche saisie, avec un debounce de 250 ms.
function useSearch<D>(data: D[], filter: (item: D, searchValue: string) => boolean) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<D[]>(data);
    useEffect(() => {
        const debouncedTimer = setTimeout(() => {
            if (searchValue.length > 0) {
                setSearchResult([...data].filter((item) => filter(item, searchValue)));
            } else {
                setSearchResult(data);
            }
        }, 250);
        return () => {
            clearTimeout(debouncedTimer);
        };
    }, [searchValue, data, filter]);
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    return { searchValue, searchResult, onSearchChange };
}

export default useSearch;
