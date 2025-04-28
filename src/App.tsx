import SearchBar from './components/SearchBar.tsx';
import ProductList from './components/ProductList.tsx';

function App() {
    return (
        <>
            <h1 id={'title'}>Wybierz urządzenie</h1>
            <div id={'main'}>
                <SearchBar />
                <ProductList />
            </div>
        </>
    );
}

export default App;
