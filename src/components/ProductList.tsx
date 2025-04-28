import ProductCard from './ProductCard.tsx';
import '../style/ProductList.css';
import data from '../data/samsungApiResponse.json';
import {
    KeySummary,
    Model,
    MonthlyPriceInfo,
    Product,
} from '../models/Response.ts';

const ProductList = () => {
    const response = data.response;
    return (
        <>
            <div id={'product-list-container'}>
                <div>
                    <p>
                        Liczba wyników: {response.resultData.productList.length}
                    </p>
                    <div id={'product-list'}>
                        {response.resultData.productList.map((p) => {
                            const modelList: Model[] = p.modelList.map((m) => {
                                const monthlyPriceInfo: MonthlyPriceInfo = {
                                    leasingMonthly:
                                        m.monthlyPriceInfo?.leasingMonthly,
                                    leasingMonths:
                                        m.monthlyPriceInfo?.leasingMonths,
                                    leasingUpfront:
                                        m.monthlyPriceInfo?.leasingUpfront,
                                };

                                const keySummary: KeySummary[] =
                                    m.keySummary.map((k) => ({
                                        displayType: k.displayType,
                                        title: k.title,
                                        description: k.description,
                                        key: k.key,
                                        value: k.value,
                                    }));

                                return {
                                    modelCode: m.modelCode,
                                    modelName: m.modelName,
                                    displayName: m.displayName,
                                    thumbUrl: m.thumbUrl,
                                    thumbUrlAlt: m.thumbUrlAlt,
                                    galleryImage: m.galleryImage,
                                    galleryImageAlt: m.galleryImageAlt,
                                    energyLabelGrade: m.energyLabelGrade,
                                    price: m.price,
                                    priceDisplay: m.priceDisplay,
                                    usp: m.usp,
                                    monthlyPriceInfo: monthlyPriceInfo,
                                    keySummary: keySummary,
                                };
                            });

                            const product: Product = {
                                familyRecord: p.familyRecord,
                                familyId: p.familyId,
                                modelCount: p.modelCount,
                                fmyMarketingName: p.fmyMarketingName,
                                fmyEngName: p.fmyEngName,
                                categorySubTypeCode: p.categorySubTypeCode,
                                categorySubTypeEngName:
                                    p.categorySubTypeEngName,
                                categorySubTypeName: p.categorySubTypeName,
                                productGroupId: p.productGroupId,
                                modelList: modelList,
                                chipOptions: p.chipOptions,
                            };

                            return (
                                <ProductCard
                                    key={p.familyId}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;
