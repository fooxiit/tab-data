import type { PropsWithChildren } from 'react';
import type { ArrayElement } from '../type/Utility ';

interface TabDataProps<D extends Record<string, string>[]> extends PropsWithChildren {
    datas: D;
    rowModel: {
        columns: { dataKey: keyof ArrayElement<D>; label: string }[];
    };
}

export default function TabData<D extends []>({ datas, rowModel }: TabDataProps<D>) {
    return (
        <table>
            <thead>
                <tr>
                    {rowModel.columns.map((column) => (
                        <th>{column.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {datas.map((data) => (
                    <tr>
                        {rowModel.columns.map((column) => (
                            <td>{data[column.dataKey]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
