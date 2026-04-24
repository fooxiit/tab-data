import useTabDataContext from '../hook/useTabDataContext';
import type { RowModelType } from '../type/type';
import FilterSelector from './FilterSelector';
import '../style/row-label.css';
import sortIconActive from '../assets/sort_active.svg';
import sortIconUnactive from '../assets/sort_unactive.svg';

interface RowLabelProps<D> {
    rowModel: RowModelType<D>;
}

export default function RowLabel<D>({ rowModel }: RowLabelProps<D>) {
    const { filterBy, sortBy, filterOptions, id, filter, sortByValue } = useTabDataContext();
    return (
        <tr className="data-table__label">
            {rowModel.columns.map((column, index) => (
                <th key={`${id}-label-${index}`} className="data-table__label__cell">
                    <div className="data-table__label__cell-content">
                        <span>{column.label} </span>
                        <div className="data-table__label__cell-icons">
                            {rowModel.sort && (
                                <i
                                    onClick={() => {
                                        sortBy(column.dataKey as string);
                                    }}
                                    className="btn data-table__label__sort-icon"
                                >
                                    {sortByValue === column.dataKey ? <img src={sortIconActive} alt="Sorted" /> : <img src={sortIconUnactive} alt="Sort" />}
                                </i>
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
