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
    filters: string[];
};

export type ProductState = {
    query: QueryState;
    products: Product[];
    nav: NavGroup[];
    fetchData: (newQuery: QueryState) => void;
    testFetch: (navPicks: QueryState) => void;
    setQuery: (newQueryState: QueryState) => void;
};

export const useStore = create<ProductState>((set) => ({
    query: { start: 1, sort: 'onlineavailability', filters: [] },
    products: [],
    nav: [],
    fetchData: (newQuery: QueryState) => {
        console.log(newQuery);
        // const url =
        //     'https://searchapi.samsung.com/v6/front/b2c/product/finder/newhybris?type=08010000&siteCode=pl&onlyFilterInfoYN=N&keySummaryYN=Y&specHighlightYN=Y&num=10';

        const response = data.response;

        const navGroups: NavGroup[] = response.resultData.navGroups;

        // I had errors in parsing, so I had to do it manually
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

        set((state) => {
            // if something in filters will change a new product list will replace current one
            if (newQuery.start === 1) {
                return {
                    products: productList,
                    nav: navGroups,
                };
            }

            return {
                products: [...state.products, ...productList],
                nav: navGroups,
            };
        });
    },
    testFetch: (query: QueryState) => {
        let url =
            'https://searchapi.samsung.com/v6/front/b2c/product/finder/newhybris?type=08010000&siteCode=pl&onlyFilterInfoYN=N&keySummaryYN=Y&specHighlightYN=Y&num=10';

        url = `${url}&sort=${query.sort}&start=${query.start}`;

        for (let i = 0; i < query.filters.length; i++) {
            url += `&filter${i + 1}=${query.filters[i]}`;
        }

        console.log(url);
    },
    setQuery: (newQueryState: QueryState) => {
        set({ query: newQueryState });
    },
}));
