import type { PropsWithChildren } from 'react';
import type { ArrayElement } from '../type/Utility ';
import useTabData from '../hook/useTabData';

interface TabDataProps<D extends Record<string, string>[]> extends PropsWithChildren {
    datas: D;
    rowModel: {
        columns: { dataKey: keyof ArrayElement<D>; label: string }[];
        sort?: boolean;
    };
}

export default function TabData<D extends Record<string, string>[]>({ datas, rowModel }: TabDataProps<D>) {
    const { datas: parsedData, filterBy } = useTabData(datas);
    return (
        <table>
            <thead>
                <tr>
                    {rowModel.columns.map((column) => (
                        <th>
                            <div>
                                <span>{column.label}</span>
                                {rowModel.sort && (
                                    <i
                                        onClick={() => {
                                            filterBy(column.dataKey as string);
                                        }}
                                    >
                                        sort by
                                    </i>
                                )}
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {parsedData.map((data) => (
                    <tr>
                        {rowModel.columns.map((column) => (
                            <td>{data[column.dataKey as string]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
