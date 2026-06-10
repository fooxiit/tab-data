import { useCallback } from 'react';
import useExpend from '../hook/useExpend';
import useSearch from '../hook/useSearch';
import checkIcon from '../assets/check_small.svg';
import fillterIcon from '../assets/filter_list.svg';

interface FilterSelectorProps {
    option?: [unknown, boolean][];
    onFilterSelect: (filterValue: unknown) => void;
    className?: string;
}
//Menu déroulant de filtrage avec barre de recherche interne.
export default function FilterSelector({ option, onFilterSelect, className }: FilterSelectorProps) {
    const filterFuction = useCallback((item: [unknown, boolean], searchValue: string) => (item[0] as string).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()), []);
    const [filterIsOpen, controleFilter] = useExpend(false);
    const { searchResult, searchValue, onSearchChange } = useSearch(option ? option : [], filterFuction);
    function handleSelect(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        onFilterSelect(e.currentTarget.dataset.value);
    }
    if (option)
        return (
            <div className={className ? `${className}__label__filter` : 'data-table__label__filter'} onClick={() => controleFilter.toggle()}>
                <i className={className ? `${className}__label__filter__icon` : 'data-table__label__filter__icon btn'}>
                    <img src={fillterIcon} alt="Filter" />
                </i>
                {filterIsOpen && (
                    <div className={className ? `${className}__label__filter__dropdown` : 'data-table__label__filter__dropdown'} onClick={(e) => e.stopPropagation()}>
                        <div className={className ? `${className}__label__filter__search` : 'data-table__label__filter__search'}>
                            <input type="text" placeholder="Search..." value={searchValue} onChange={onSearchChange} />
                        </div>
                        <div>
                            {searchResult.map((option) => (
                                <div
                                    className={className ? `${className}__label__filter__option` : 'data-table__label__filter__option btn'}
                                    key={`filter-option-${option[0]}`}
                                    data-value={option[0]}
                                    onClick={handleSelect}
                                >
                                    <span>{option[0] as string} </span>
                                    {option[1] && (
                                        <i>
                                            <img src={checkIcon} />{' '}
                                        </i>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
}
