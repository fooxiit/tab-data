import { useState, useMemo } from 'react';

//Gère la pagination
function usePageSelector<D extends Record<string, string>>(data: D[], maxRow?: number, InitialPage?: number) {
    console.log(data.length > -1 ? InitialPage || 0 : 0);
    const [page, setPage] = useState(data.length > 0 ? InitialPage || 0 : -1);
    const maxPage = useMemo(() => Math.ceil(data.length / (maxRow || data.length)), [data.length, maxRow]);
    const limitedData = useMemo(() => {
        if (!maxRow || page === undefined) return data;
        const start = page * maxRow;
        const end = start + maxRow;
        return data.slice(start, end);
    }, [maxRow, page, data]);
    function next() {
        setPage((prevPage) => (prevPage === maxPage - 1 ? prevPage : prevPage + 1));
    }
    function prev() {
        setPage((prevPage) => (prevPage === 0 ? 0 : prevPage - 1));
    }
    function set(page: number) {
        if (page < 0 || page >= maxPage) return;
        setPage(page);
    }
    return { currentPage: page, maxPage, Control: { next, prev, set }, limitedData };
}

export default usePageSelector;
