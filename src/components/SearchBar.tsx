import '../style/SearchBar.css';
import { useStore } from '../store/main.store.ts';

const SearchBar = () => {
    const { searchInput, setSearchInput } = useStore();

    return (
        <div className={'center-container search-container'}>
            <input
                id={'search-input'}
                placeholder={'Search...'}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
