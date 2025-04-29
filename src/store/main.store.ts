import { create } from 'zustand';
import {
    KeySummary,
    Model,
    MonthlyPriceInfo,
    NavGroup,
    Product,
} from '../models/Response.model.ts';
import data from '../data/samsungApiResponse.json';

export type QueryState = {
    start: number;
    sort: string;
    filter: string[];
};

export type ProductState = {
    query: QueryState;
    products: Product[];
    nav: NavGroup[];
    currentNavPicks: string[];
    fetchData: (newQueryState: QueryState) => void;
    setCurrentNavPicks: (newNavPicks: string[]) => void;
    testFetch: (navPicks: string[]) => void;
    setQuery: (newQueryState: QueryState) => void;
};

export const useStore = create<ProductState>((set) => ({
    query: { start: 1, sort: 'onlineavailability', filter: [] },
    products: [],
    nav: [],
    currentNavPicks: [],
    fetchData: (newQueryState: QueryState) => {
        const url =
            'https://searchapi.samsung.com/v6/front/b2c/product/finder/newhybris?type=08010000&siteCode=pl&onlyFilterInfoYN=N&keySummaryYN=Y&specHighlightYN=Y&num=10';

        console.log(`${url}&start=${newQueryState.start}}&sort=`);

        const response = data.response;

        const navGroups: NavGroup[] = response.resultData.navGroups;

        const productList: Product[] = response.resultData.productList.map(
            (p) => {
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
            }
        );

        // state
        set(() => {
            // if (
            //     JSON.stringify(state.query.filter) ===
            //     JSON.stringify(state.currentNavPicks)
            // )
            //     return {
            //         products: [...state.products, ...productList],
            //         nav: navGroups,
            //     };

            return {
                products: productList,
                nav: navGroups,
            };
        });
    },
    setCurrentNavPicks: (newNavPicks) => {
        set({ currentNavPicks: newNavPicks });
    },
    testFetch: (navPicks: string[]) => {
        console.log(navPicks);
    },
    setQuery: (newQueryState: QueryState) => {
        set({ query: newQueryState });
    },
}));
