import '../style/ProductList.css';
// import data from '../data/samsungApiResponse.json';
import ProductCard from './ProductCard.tsx';
import { useStore } from '../store/main.store.ts';

const ProductList = () => {
    // countProducts
    const { searchInput, products } = useStore();

    const filteredList = products.filter((product) =>
        product.fmyMarketingName
            .toLowerCase()
            .includes(searchInput.toLowerCase())
    );

    return (
        <>
            <div id={'product-list-container'}>
                <div>
                    <p>Liczba wyników: {filteredList.length}</p>
                    <div id={'product-list'}>
                        {filteredList.map((product) => (
                            <ProductCard
                                key={product.familyId}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;
