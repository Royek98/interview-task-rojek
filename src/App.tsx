import SearchBar from './components/SearchBar.tsx';
import ProductList from './components/ProductList.tsx';
import FilterContainer from './components/FilterContainer.tsx';
import Arrow from './assets/icons/Arrow.tsx';

function App() {
    return (
        <>
            <h1 id={'title'}>Wybierz urządzenie</h1>
            <div id={'main'}>
                <SearchBar />
                <FilterContainer />
                <ProductList />
                <Arrow width={'18px'} height={'18px'} color={'#007AFF'} />
            </div>
        </>
    );
}

export default App;
