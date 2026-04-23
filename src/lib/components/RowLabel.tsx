import useTabDataContext from '../hook/useTabDataContext';
import type { RowModelType } from '../type/type';
import FilterSelector from './FilterSelector';

interface RowLabelProps<D> {
    rowModel: RowModelType<D>;
}

export default function RowLabel<D>({ rowModel }: RowLabelProps<D>) {
    const { filterBy, sortBy, filterOptions, id, filter } = useTabDataContext();
    return (
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
    );
}
