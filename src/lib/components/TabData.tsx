import type { PropsWithChildren } from 'react';
import useTabData from '../hook/useTabData';
import FilterSelector from './FilterSelector';
import TabDataContext from '../context/TabDataContext';
import type { RowModelType } from '../type/type';
import DataRow from './DataRow';

interface TabDataProps<D extends Record<string, string>> extends PropsWithChildren {
    datas: D[];
    id: string;
    maxRow?: number;
    rowModel: RowModelType<D>;
}

export default function TabData<D extends Record<string, string>>({ datas, id, maxRow, rowModel }: TabDataProps<D>) {
    const { datas: dataSet, sortBy, filterOptions, filterBy, filter, pages, dataIds } = useTabData({ datas: datas, isSort: rowModel.sort, isFilter: rowModel.filter, maxRow, keyId: rowModel.idKey });
    console.log('render TabData');
    return (
        <TabDataContext.Provider value={{ datas: dataSet }}>
            <table>
                <thead>
                    <tr>
                        {rowModel.columns.map((column, index) => (
                            <th key={`${id}-label-${index}`}>
                                <div>
                                    <span>{column.label} </span>
                                    {rowModel.sort && (
                                        <i
                                            onClick={() => {
                                                sortBy(column.dataKey as string);
                                            }}
                                        >
                                            sort by
                                        </i>
                                    )}
                                    {filterOptions && (
                                        <FilterSelector
                                            onFilterSelect={(value) => filterBy(column.dataKey as string, value)}
                                            option={Array.from(filterOptions?.get(column.dataKey as string) || [], (option) => [option, filter.get(column.dataKey as string)?.has(option) || false])}
                                        />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataIds.map((dataId) => (
                        <DataRow key={`${id}-row-${dataId}`} id={dataId} rowModel={{ ...rowModel, tabId: id }} />
                    ))}
                </tbody>
                <tfoot>
                    {pages && (
                        <tr>
                            <td colSpan={rowModel.columns.length}>
                                <button onClick={pages.controle.prev} disabled={pages.currentPage === 0}>
                                    Previous
                                </button>
                                <span>
                                    {pages.currentPage + 1} / {pages.maxPage}
                                </span>
                                <button onClick={pages.controle.next} disabled={pages.currentPage === pages.maxPage - 1}>
                                    Next
                                </button>
                            </td>
                        </tr>
                    )}
                </tfoot>
            </table>
        </TabDataContext.Provider>
    );
}
