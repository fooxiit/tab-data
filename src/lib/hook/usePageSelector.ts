import { useState, useMemo } from 'react';
//Gère la pagination
function usePageSelector(dataLength: number, maxRow?: number, InitialPage?: number) {
    const [page, setPage] = useState(InitialPage || 0);
    const maxPage = useMemo(() => Math.ceil(dataLength / (maxRow || dataLength)), [dataLength, maxRow]);
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
    return { currentPage: page, maxPage, controle: { next, prev, set } };
}

export default usePageSelector;
