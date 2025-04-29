import SearchBar from './components/SearchBar.tsx';
import ProductList from './components/ProductList.tsx';
import FilterContainer from './components/FilterContainer.tsx';
import { useStore } from './store/main.store.ts';
import { useEffect } from 'react';
import ShowMore from './components/ShowMore.tsx';

function App() {
    const { fetchData, nav, query } = useStore();

    useEffect(() => {
        fetchData(query);
    }, [fetchData, query]);

    return (
        <>
            <h1 id={'title'}>Wybierz urządzenie</h1>
            <div id={'main'}>
                <SearchBar />
                <FilterContainer navGroups={nav} />
                <ProductList />
                <ShowMore />
            </div>
        </>
    );
}

export default App;
