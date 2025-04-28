import '../style/SearchBar.css';

const SearchBar = () => {
    return (
        <div className={'center-container search-container'}>
            <input id={'search-input'} placeholder={'Search...'} />
        </div>
    );
};

export default SearchBar;
