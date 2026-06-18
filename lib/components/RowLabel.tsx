import useTabDataContext from '../hook/useTabDataContext';
import type { RowModelType } from '../type/type';
import FilterSelector from './FilterSelector';
import '../style/row-label.css';

interface RowLabelProps<D> {
    rowModel: RowModelType<D>;
    className?: string;
}
//Rend la ligne d'en-têtes `<thead>` avec les libellés
export default function RowLabel<D>({ rowModel, className }: RowLabelProps<D>) {
    const { filterBy, sortBy, filterOptions, id, filter } = useTabDataContext();
    return (
        <tr className={className ? `${className}__label` : 'data-table__label'}>
            {rowModel.columns.map((column, index) => (
                <th key={`${id}-label-${index}`} className={className ? `${className}__label__cell` : 'data-table__label__cell'}>
                    <div className={className ? `${className}__label__cell-content` : 'data-table__label__cell-content'}>
                        <span>{column.label} </span>
                        <div className={className ? `${className}__label__cell-icons` : 'data-table__label__cell-icons'}>
                            {rowModel.sort && (
                                <div
                                    onClick={() => {
                                        sortBy(column.dataKey as string);
                                    }}
                                    className={className ? `${className}__label__sort-icon` : 'btn data-table__label__sort-icon'}
                                >
                                    <SortIcon dataKey={column.dataKey} />
                                </div>
                            )}
                            {filterOptions && (
                                <FilterSelector
                                    onFilterSelect={(value) => filterBy(column.dataKey as string, value)}
                                    option={Array.from(filterOptions?.get(column.dataKey as string) || [], (option) => [option, filter.get(column.dataKey as string)?.has(option) || false])}
                                />
                            )}
                        </div>
                    </div>
                </th>
            ))}
        </tr>
    );
}
type SortByIcon<D> = {
    dataKey: keyof D;
};
function SortIcon<D>({ dataKey }: SortByIcon<D>) {
    const { sortByValue } = useTabDataContext();
    if (sortByValue?.key === dataKey) {
        switch (sortByValue.direction) {
            case 'asc':
                return (
                    <div className="sort-icon__warper sort-icon__warper--asc">
                        <i className="sort-icon--asc"></i>
                    </div>
                );
            case 'desc':
                return (
                    <div className="sort-icon__warper sort-icon__warper--desc">
                        <i className="sort-icon--desc"></i>
                    </div>
                );

            default:
                sortByValue.direction satisfies never;
        }
    }
    return (
        <div className="sort-icon__warper sort-icon__warper--none">
            <i className="sort-icon--none"></i>
        </div>
    );
}
