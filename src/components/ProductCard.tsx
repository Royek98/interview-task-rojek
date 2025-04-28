import '../style/ProductCard.css';
import { Product } from '../models/Response.ts';
import washer from '../assets/imgs/washer.png';
import GetMonthlyPriceInfo from './utils/Product/GetMonthlyPriceInfo.tsx';
import GetDrumCapacity from './utils/Product/GetDrumCapacity.tsx';
import GetEnergyLabel from './utils/Product/GetEnergyLabel.tsx';
import GetDimensions from './utils/Product/GetDimensions.tsx';
import GetFeature from './utils/Product/GetFeature.tsx';
import GetPrice from './utils/Product/GetPrice.tsx';

type Props = {
    product: Product;
};

const ProductCard = ({ product }: Props) => {
    return (
        <div className={'product-card'}>
            <div className={'product-card-top'}>
                {/*<img*/}
                {/*    src={product.modelList[0].thumbUrl}*/}
                {/*    alt={product.modelList[0].thumbUrlAlt}*/}
                {/*/>*/}
                <img src={washer} alt={'washer'} />
                <div className={'product-name text-bold'}>
                    {product.fmyMarketingName}
                </div>
            </div>
            <div className={'product-card-bottom'}>
                <div className={'product-details'}>
                    <GetDrumCapacity product={product} />
                    <br />
                    <span className={'text-light'}>
                        Wymiary (GxSxW):{' '}
                        <GetDimensions
                            keySummary={product.modelList[0].keySummary}
                        />
                    </span>
                    <br />
                    <span className={'text-light'}>
                        Funkcje:{' '}
                        <span className={'text-bold'}>
                            <GetFeature usp={product.modelList[0].usp} />
                        </span>
                    </span>
                </div>
                <div className={'energy-label'}>
                    <span className={'product-details'}>
                        Klasa energetyczna
                    </span>
                    <GetEnergyLabel
                        energyGrade={product.modelList[0].energyLabelGrade}
                    />
                </div>

                <div className={'price-container'}>
                    <span className={'product-details text-light'}>
                        Cena obowiązuje: 15.09.2022 - 21.09.2022
                    </span>

                    <div className={'price text-bold'}>
                        <GetPrice
                            priceDisplay={product.modelList[0].priceDisplay}
                        />
                    </div>
                </div>
                <span className={'text-bold monthly-fee'}>
                    <GetMonthlyPriceInfo
                        monthlyPriceInfo={product.modelList[0].monthlyPriceInfo}
                        price={product.modelList[0].price}
                    />
                </span>
                <button className={'text-bold'}>WYBIERZ</button>
            </div>
        </div>
    );
};

export default ProductCard;
