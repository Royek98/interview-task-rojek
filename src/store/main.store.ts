import { create } from 'zustand';
import {
    KeySummary,
    Model,
    MonthlyPriceInfo,
    NavGroup,
    Product,
} from '../models/Response.model.ts';
import axios from 'axios';
// import data from '../data/samsungApiResponse.json';

export type QueryState = {
    start: number;
    sort: string;
    filters: string[];
};

export type ProductState = {
    query: QueryState;
    products: Product[];
    nav: NavGroup[];
    countProducts: number;
    searchInput: string;
    fetchData: (newQuery: QueryState) => void;
    setQuery: (newQueryState: QueryState) => void;
    setCountProducts: (countProducts: number) => void;
    setSearchInput: (searchInput: string) => void;
};

export const useStore = create<ProductState>((set) => ({
    query: { start: 1, sort: 'onlineavailability', filters: [] },
    products: [],
    nav: [],
    countProducts: 0,
    searchInput: '',
    fetchData: async (newQuery: QueryState) => {
        let url =
            'https://searchapi.samsung.com/v6/front/b2c/product/finder/newhybris?type=08010000&siteCode=pl&onlyFilterInfoYN=N&keySummaryYN=Y&specHighlightYN=Y&num=10';

        url = `${url}&sort=${newQuery.sort}&start=${newQuery.start}`;

        for (let i = 0; i < newQuery.filters.length; i++) {
            url += `&filter${i + 1}=${newQuery.filters[i]}`;
        }

        console.log('url', url);
        const request = await axios.get(url);

        const response = request.data.response;

        // const response = data.response;

        const navGroups: NavGroup[] = response.resultData.navGroups;

        // I had errors in parsing, so I had to do it manually
        const productList: Product[] = response.resultData.productList.map(
            (p: Product) => {
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
                        promotionPriceDisplay: m.promotionPriceDisplay,
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
                state.setCountProducts(productList.length);
                return {
                    products: productList,
                    nav: navGroups,
                };
            }

            const newProducts = [...state.products, ...productList];

            state.setCountProducts(newProducts.length);
            return {
                products: newProducts,
                nav: navGroups,
            };
        });
    },
    setQuery: (newQueryState: QueryState) => {
        set({ query: newQueryState });
    },
    setCountProducts: (countProducts: number) => {
        set({ countProducts: countProducts });
    },
    setSearchInput: (searchInput: string) => {
        set({ searchInput: searchInput.toLowerCase().trim() });
    },
}));
