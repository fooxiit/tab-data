import searchIcon from '../assets/search.svg';
import '../style/search-bar.css';
type SearchBarProps = {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
};

export default function SearchBar({ label, onChange, value }: SearchBarProps) {
    return (
        <div className="search-bar">
            <label htmlFor="search-bar">{label}</label>
            <input value={value} onChange={onChange} type="text" id="search-bar" />
            <img src={searchIcon} alt="search icon" />
        </div>
    );
}
