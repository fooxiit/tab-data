import useGetDataFromId from '../hook/useGetDataFromId';
import type { RowModelType } from '../type/type';
import '../style/data-row.css';

interface RowModelTypeExtend<D> extends RowModelType<D> {
    tabId: string;
}

interface DataRowProps<D> {
    id: unknown;
    rowModel: RowModelTypeExtend<D>;
    className?: string;
}

export default function DataRow<D>({ id, rowModel, className }: DataRowProps<D>) {
    const data = useGetDataFromId(id);
    return (
        <tr className={className ? `${className}__row` : 'data-table__row'}>
            {rowModel.columns.map((column, index) => (
                <td className={className ? `${className}__row__cell` : 'data-table__row__cell'} key={`${rowModel.tabId}-row-${id}-${index}`}>
                    {data[column.dataKey as string] as string}
                </td>
            ))}
        </tr>
    );
}
