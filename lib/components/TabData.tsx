import type { PropsWithChildren } from 'react';
import useTabData from '../hook/useTabData';
import TabDataContext from '../context/TabDataContext';
import type { RowModelType } from '../type/type';
import DataRow from './DataRow';
import RowLabel from './RowLabel';
import PageControl from './PageControl';
import '../style/data-table.css';
import '../style/index.css';
import useExtractFilterOption from '../hook/useExtractFilterOption';
import useFilter from '../hook/useFilter';
import useSelectSort, { type SortBy } from '../hook/useSelectSort';
import usePageSelector from '../hook/usePageSelector';
import useSearch from '../hook/useSearch';
import SearchBar from './SearchBar';

interface TabDataProps<D extends Record<string, string>> extends PropsWithChildren {
    datas: D[];
    id: string;
    maxRow?: number;
    rowModel: RowModelType<D>;
    className?: string;
    search?: { label: string };
}

//Composant principal qui orchestre le tableau complet

export default function TabData<D extends Record<string, string>>({ datas, id, maxRow, rowModel, className, search }: TabDataProps<D>) {
    const { filter, filterBy } = useFilter<D>();
    const { sortBy, sortByValue } = useSelectSort<D>();
    const { searchResult, onSearchChange, searchValue } = useSearch(datas, searchFunction);
    const { filteredDatas } = useTabData({ filter, datas: searchResult, isSort: rowModel.sort, isFilter: rowModel.filter, maxRow, sortByValue });
    const { currentPage, maxPage, Control, limitedData } = usePageSelector(filteredDatas, maxRow);
    const filterOptions = useExtractFilterOption(datas, rowModel.filter);
    return (
        <TabDataContext.Provider
            value={{
                pages: { currentPage, maxPage, Control },
                filterBy: (filterKey, filterValue) => {
                    Control.set(0);
                    filterBy(filterKey, filterValue);
                },
                filterOptions,
                filter,
                sortBy: (dataKey) => {
                    Control.set(0);
                    sortBy(dataKey);
                },
                sortByValue: sortByValue as SortBy<Record<string, string>> | null,
                id,
            }}
        >
            <div className="data-table__warper">
                {search && <SearchBar onChange={onSearchChange} value={searchValue} label={search.label} />}
                <table className={className ? className : 'data-table'}>
                    <thead className={className ? `${className}__thead` : 'data-table__thead'}>
                        <RowLabel rowModel={rowModel} className={className} />
                    </thead>
                    <tbody className={className ? `${className}__tbody` : 'data-table__tbody'}>
                        {limitedData.map((data) => (
                            <DataRow key={`${id}-row-${data[rowModel.idKey]}`} id={data[rowModel.idKey]} rowModel={{ ...rowModel, tabId: id }} className={className} data={data} />
                        ))}
                    </tbody>
                    <tfoot className={className ? `${className}__tfoot` : 'data-table__tfoot'}>
                        <PageControl colSpan={rowModel.columns.length} className={className} />
                    </tfoot>
                </table>
            </div>
        </TabDataContext.Provider>
    );
}

function searchFunction<I extends Record<string, string>>(item: I, searchValue: string) {
    let find = false;
    for (const property in item) {
        if (item[property].includes(searchValue)) {
            find = true;
            break;
        }
    }
    return find;
}
