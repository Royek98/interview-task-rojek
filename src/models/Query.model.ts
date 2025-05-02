// codes example: filter5=05z19 - technology AI Home
export type Filter = {
    filter2: string; // capacity
    filter5: string; // technologies / functionality
    filter6: string; // energy grade
};

export type QueryState = {
    start: number;
    sort: string;
    filters: Filter;
};
