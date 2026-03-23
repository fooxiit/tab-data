import { useMemo, useState } from 'react';
import compareString from '../function/compareString';

function useTabData<D extends Record<string, string>>(datas: D[]) {
    const [sortBy, setSortBy] = useState<null | keyof D>(null);

    const filtredDatas = useMemo(() => datas, [datas]);
    const sortDatas = useMemo(() => {
        const sortDataBy = (by: keyof D, datas: D[]) => {
            return [...datas].sort((a, b) => compareString('US', a[by], b[by]));
        };
        if (!sortBy) return filtredDatas;
        return sortDataBy(sortBy, filtredDatas);
    }, [filtredDatas, sortBy]);

    return {
        datas: sortDatas,
        filterBy: (by: keyof D) => {
            setSortBy(by);
        },
    };
}

export default useTabData;
