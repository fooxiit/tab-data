import type { PropsWithChildren } from 'react';
import type { ArrayElement } from '../type/Utility ';
import useTabData from '../hook/useTabData';
import FilterSelector from './FilterSelector';

interface TabDataProps<D extends Record<string, string>[]> extends PropsWithChildren {
    datas: D;
    id: string;
    rowModel: {
        columns: { dataKey: keyof ArrayElement<D>; label: string }[];
        idKey: keyof ArrayElement<D>;
        sort?: boolean;
        filter?: boolean;
    };
}

export default function TabData<D extends Record<string, string>[]>({ datas, id, rowModel }: TabDataProps<D>) {
    const { datas: parsedData, sortBy, filterOptions, filterBy, filter } = useTabData({ datas: datas, isSort: rowModel.sort, isFilter: rowModel.filter });
    return (
        <table>
            <thead>
                <tr>
                    {rowModel.columns.map((column, index) => (
                        <th key={`${id}-label-${index}`}>
                            <div>
                                <span>{column.label}</span>
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
        </table>
    );
}
