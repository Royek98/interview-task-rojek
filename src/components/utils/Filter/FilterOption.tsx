import { ProductFinderFilter } from '../../../models/Response.model.ts';
import { useState } from 'react';
import { Filter, QueryState, useStore } from '../../../store/main.store.ts';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import LoadingScreen from '../../LoadingScreen.tsx';

const FilterOption = ({
    title,
    productFinderFilter,
}: {
    title: string;
    productFinderFilter: ProductFinderFilter[];
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const { fetchData, query, setQuery, loadingStatus, setLoadingStatus } =
        useStore();

    const [currentPick, setCurrentPick] = useState<ProductFinderFilter>(
        productFinderFilter[0]
    );

    document.onclick = (event) => {
        if (!(event.target as HTMLObjectElement).matches('.btn-option')) {
            if (showDropdown) {
                setShowDropdown(false);
            }
        }
    };

    const handleCurrentPickChange = (change: ProductFinderFilter) => {
        setCurrentPick(change); // new local state for single dropdown menu
        setShowDropdown(false);

        const newFilter: Filter = {
            filter2: query.filters.filter2,
            filter5: query.filters.filter5,
            filter6: query.filters.filter6,
        };
        let newSort = query.sort;

        switch (title) {
            case 'Pojemność:':
                newFilter.filter2 = change.filterSearchCode;
                break;
            case 'Funkcje:':
                newFilter.filter5 = change.filterSearchCode;
                break;
            case 'Klasa energetyczna:':
                newFilter.filter6 = change.filterSearchCode;
                break;
            case 'Sortuj po:':
                newSort = change.filterSearchCode;
                break;
            default:
                console.error('Unknown title');
                break;
        }

        const newQuery: QueryState = {
            start: 1,
            sort: newSort,
            filters: newFilter,
        };

        setLoadingStatus(true);
        setQuery(newQuery); // new global state
        fetchData(newQuery);
    };

    const ShowOptions = ({
        productFinderFilter,
    }: {
        productFinderFilter: ProductFinderFilter[];
    }) => {
        if (showDropdown) {
            return (
                <div className={'option-container'}>
                    <ul>
                        {/*<li*/}
                        {/*    onClick={() =>*/}
                        {/*        handleCurrentPickChange(showAllProducts)*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    {showAllProducts.filterLocalName}*/}
                        {/*</li>*/}
                        {productFinderFilter.map((item) => {
                            return (
                                <li
                                    key={item.filterSearchCode}
                                    onClick={() =>
                                        handleCurrentPickChange(item)
                                    }
                                >
                                    {item.filterLocalName}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }

        return <></>;
    };

    return (
        <>
            <div className={'filter-option-container'}>
                {loadingStatus && <LoadingScreen />}
                <h2 className={'text-bold'}>{title}</h2>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={'btn-option'}
                >
                    {currentPick.filterLocalName}
                    {showDropdown ? (
                        <IoMdArrowDropup size={30} color={'#8D8D8D'} />
                    ) : (
                        <IoMdArrowDropdown size={30} color={'#8D8D8D'} />
                    )}
                </button>
                <ShowOptions productFinderFilter={productFinderFilter} />
            </div>
        </>
    );
};
export default FilterOption;
