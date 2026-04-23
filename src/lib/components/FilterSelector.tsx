import useExpend from '../hook/useExpend';
import useSearch from '../hook/useSearch';

interface FilterSelectorProps {
    option?: [unknown, boolean][];
    onFilterSelect: (filterValue: unknown) => void;
}

export default function FilterSelector({ option, onFilterSelect }: FilterSelectorProps) {
    const [filterIsOpen, controleFilter] = useExpend(false);
    const { searchResult, searchValue, onSearchChange } = useSearch(option ? option : [], (item, searchValue) => (item[0] as string).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    function handleSelect(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        onFilterSelect(e.currentTarget.dataset.value);
    }
    if (option)
        return (
            <div onClick={() => controleFilter.toggle()}>
                <span>FilterSelector</span>
                {filterIsOpen && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <div>
                            <input type="text" placeholder="Search..." value={searchValue} onChange={onSearchChange} />
                        </div>
                        <div>
                            {searchResult.map((option) => (
                                <div key={`filter-option-${option[0]}`} data-value={option[0]} onClick={handleSelect}>
                                    <span>{option[0] as string} </span>
                                    <i>{option[1] ? 'select' : 'unSelect'}</i>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
}
