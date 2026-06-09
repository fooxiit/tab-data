import type { PropsWithChildren } from 'react';
import useTabData from '../hook/useTabData';
import TabDataContext from '../context/TabDataContext';
import type { RowModelType } from '../type/type';
import DataRow from './DataRow';
import RowLabel from './RowLabel';
import PageControle from './PageControle';
import '../style/data-table.css';
import '../style/index.css';
import useExtractFilterOption from '../hook/useExtractFilterOption';
import useFilter from '../hook/useFilter';
import useSelectSort, { type SortBy } from '../hook/useSelectSort';
import usePageSelector from '../hook/usePageSelector';

interface TabDataProps<D extends Record<string, string>> extends PropsWithChildren {
    datas: D[];
    id: string;
    maxRow?: number;
    rowModel: RowModelType<D>;
    className?: string;
}

//Composant principal qui orchestre le tableau complet

export default function TabData<D extends Record<string, string>>({ datas, id, maxRow, rowModel, className }: TabDataProps<D>) {
    const { filter, filterBy } = useFilter<D>();
    const { sortBy, sortByValue } = useSelectSort<D>();
    const { currentPage, maxPage, controle } = usePageSelector(datas.length, maxRow);
    const { filtedDatas } = useTabData({ filter, datas: datas, isSort: rowModel.sort, isFilter: rowModel.filter, maxRow, sortByValue, page: currentPage });
    const filterOptions = useExtractFilterOption(datas, rowModel.filter);
    return (
        <TabDataContext.Provider
            value={{
                pages: { currentPage, maxPage, controle },
                filterBy: (filterKey, filterValue) => {
                    controle.set(0);
                    filterBy(filterKey, filterValue);
                },
                filterOptions,
                filter,
                sortBy: (dataKey) => {
                    controle.set(0);
                    sortBy(dataKey);
                },
                sortByValue: sortByValue as SortBy<Record<string, string>> | null,
                id,
            }}
        >
            <table className={className ? className : 'data-table'}>
                <thead className={className ? `${className}__thead` : 'data-table__thead'}>
                    <RowLabel rowModel={rowModel} className={className} />
                </thead>
                <tbody className={className ? `${className}__tbody` : 'data-table__tbody'}>
                    {filtedDatas.map((data) => (
                        <DataRow key={`${id}-row-${data[rowModel.idKey]}`} id={data[rowModel.idKey]} rowModel={{ ...rowModel, tabId: id }} className={className} data={data} />
                    ))}
                </tbody>
                <tfoot className={className ? `${className}__tfoot` : 'data-table__tfoot'}>
                    <PageControle colSpan={rowModel.columns.length} className={className} />
                </tfoot>
            </table>
        </TabDataContext.Provider>
    );
}
