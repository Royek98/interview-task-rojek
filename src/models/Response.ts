export type Response = {
    statusCode: number;
    statusMessage: string;
    siteCode: string;
    resultData: ResultData;
};

export type ResultData = {
    common: Common;
    productList: Product[];
};

export type Common = {
    siteCode: string;
    totalRecord: string;
    fromRecord: string;
    toRecord: string;
};

export type Product = {
    familyRecord: string;
    familyId: string;
    modelCount: string;
    fmyMarketingName: string;
    fmyEngName: string;
    categorySubTypeCode: string;
    categorySubTypeEngName: string;
    categorySubTypeName: string;
    productGroupId: string;
    modelList: Model[];
    chipOptions: ChipOptions[];
};

export type Model = {
    modelCode: string;
    modelName: string;
    displayName: string;
    thumbUrl: string;
    thumbUrlAlt: string;
    galleryImage: string[];
    galleryImageAlt: string[];
    energyLabelGrade: string | null;
    price: string;
    priceDisplay: string;
    usp: string[];
    monthlyPriceInfo: MonthlyPriceInfo;
    keySummary: KeySummary[];
};

export type MonthlyPriceInfo = {
    leasingUpfront: string | undefined;
    leasingMonthly: string | undefined;
    leasingMonths: string | undefined;
};

export type KeySummary = {
    displayType: string;
    title: string | null;
    description: string | null;
    key: string | null;
    value: string | null;
};

export type ChipOptions = {
    fmyChipType: string;
    optionTypeSeq: string;
    optionTypeCode: string;
    optionTypeName: string;
    optionTypeLocalName: string;
    optionList: OptionList[];
};

export type OptionList = {
    optionCode: string;
    optionName: string;
    optionLocalName: string;
    multiColorYN: string;
};
