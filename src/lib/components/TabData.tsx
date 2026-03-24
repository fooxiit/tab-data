import type { PropsWithChildren } from 'react';
import type { ArrayElement } from '../type/Utility ';
import useTabData from '../hook/useTabData';
import FilterSelector from './FilterSelector';

interface TabDataProps<D extends Record<string, string>[]> extends PropsWithChildren {
    datas: D;
    id: string;
    maxRow?: number;
    rowModel: {
        columns: { dataKey: keyof ArrayElement<D>; label: string }[];
        idKey: keyof ArrayElement<D>;
        sort?: boolean;
        filter?: boolean;
    };
}

export default function TabData<D extends Record<string, string>[]>({ datas, id, maxRow, rowModel }: TabDataProps<D>) {
    const { datas: parsedData, sortBy, filterOptions, filterBy, filter, pages } = useTabData({ datas: datas, isSort: rowModel.sort, isFilter: rowModel.filter, maxRow });
    return (
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
                {parsedData.map((data) => (
                    <tr key={`${id}-row-${data[rowModel.idKey as string]}`}>
                        {rowModel.columns.map((column, index) => (
                            <td key={`${id}-row-${data[rowModel.idKey as string]}-${index}`}>{data[column.dataKey as string]}</td>
                        ))}
                    </tr>
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
    );
}
