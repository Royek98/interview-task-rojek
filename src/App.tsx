import SearchBar from './components/SearchBar.tsx';
import ProductList from './components/ProductList.tsx';
import FilterContainer from './components/FilterContainer.tsx';
import Arrow from './assets/icons/Arrow.tsx';
import data from './data/samsungApiResponse.json';
import {
    KeySummary,
    Model,
    MonthlyPriceInfo,
    NavGroup,
    Product,
} from './models/Response.model.ts';

function App() {
    const response = data.response;

    const navGroups: NavGroup[] = response.resultData.navGroups;

    const productList: Product[] = response.resultData.productList.map((p) => {
        const modelList: Model[] = p.modelList.map((m) => {
            const monthlyPriceInfo: MonthlyPriceInfo = {
                leasingMonthly: m.monthlyPriceInfo?.leasingMonthly,
                leasingMonths: m.monthlyPriceInfo?.leasingMonths,
                leasingUpfront: m.monthlyPriceInfo?.leasingUpfront,
            };

            const keySummary: KeySummary[] = m.keySummary.map((k) => ({
                displayType: k.displayType,
                title: k.title,
                description: k.description,
                key: k.key,
                value: k.value,
            }));

            const model: Model = {
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

            return model;
        });

        const product: Product = {
            familyRecord: p.familyRecord,
            familyId: p.familyId,
            modelCount: p.modelCount,
            fmyMarketingName: p.fmyMarketingName,
            fmyEngName: p.fmyEngName,
            categorySubTypeCode: p.categorySubTypeCode,
            categorySubTypeEngName: p.categorySubTypeEngName,
            categorySubTypeName: p.categorySubTypeName,
            productGroupId: p.productGroupId,
            modelList: modelList,
            chipOptions: p.chipOptions,
        };

        return product;
    });

    return (
        <>
            <h1 id={'title'}>Wybierz urządzenie</h1>
            <div id={'main'}>
                <SearchBar />
                <FilterContainer navGroups={navGroups} />
                <ProductList productList={productList} />
                <Arrow width={'18px'} height={'18px'} color={'#007AFF'} />
            </div>
        </>
    );
}

export default App;
