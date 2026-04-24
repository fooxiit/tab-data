import useGetDataFromId from '../hook/useGetDataFromId';
import type { RowModelType } from '../type/type';
import '../style/data-row.css';

interface RowModelTypeExtend<D> extends RowModelType<D> {
    tabId: string;
}

interface DataRowProps<D> {
    id: unknown;
    rowModel: RowModelTypeExtend<D>;
}

export default function DataRow<D>({ id, rowModel }: DataRowProps<D>) {
    const data = useGetDataFromId(id);
    return (
        <tr className="data-table__row">
            {rowModel.columns.map((column, index) => (
                <td className="data-table__row__cell" key={`${rowModel.tabId}-row-${id}-${index}`}>
                    {data[column.dataKey as string] as string}
                </td>
            ))}
        </tr>
    );
}
