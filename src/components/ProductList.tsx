import '../style/ProductList.css';
// import data from '../data/samsungApiResponse.json';
import { Product } from '../models/Response.model.ts';
import ProductCard from './ProductCard.tsx';

const ProductList = ({ productList }: { productList: Product[] }) => {
    // const response = data.response;
    return (
        <>
            <div id={'product-list-container'}>
                <div>
                    <p>Liczba wyników: {productList.length}</p>
                    <div id={'product-list'}>
                        {productList.map((product) => (
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
