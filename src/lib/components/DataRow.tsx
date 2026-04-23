import useGetDataFromId from '../hook/useGetDataFromId';
import type { RowModelType } from '../type/type';

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
        <tr>
            {rowModel.columns.map((column, index) => (
                <td key={`${rowModel.tabId}-row-${id}-${index}`}>{data[column.dataKey as string] as string}</td>
            ))}
        </tr>
    );
}
