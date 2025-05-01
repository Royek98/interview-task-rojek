import { ProductFinderFilter } from '../../../models/Response.model.ts';
import { useState } from 'react';
import { Filter, QueryState, useStore } from '../../../store/main.store.ts';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const FilterOption = ({
    title,
    productFinderFilter,
}: {
    title: string;
    productFinderFilter: ProductFinderFilter[];
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const { fetchData, query, setQuery } = useStore();

    const [currentPick, setCurrentPick] = useState<ProductFinderFilter>(
        productFinderFilter[0]
    );

    //todo BUG fix: when multiple dropdowns are opened this only closes the last one, the rest are still opened and you have to manually click on button to close them
    window.onclick = (event) => {
        if (!(event.target as HTMLObjectElement).matches('.btn-option')) {
            if (showDropdown) {
                setShowDropdown(false);
            }
        }
    };

    const handleCurrentPickChange = (change: ProductFinderFilter) => {
        setCurrentPick(change); // new local state for single dropdown menu

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
                    <ul onClick={() => setShowDropdown(!showDropdown)}>
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
                <h2 className={'text-bold'}>{title}</h2>
                <button
                    onEndedCapture={() => setShowDropdown(!showDropdown)}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={'btn-option'}
                >
                    {currentPick.filterLocalName}
                    {showDropdown ? (
                        <IoMdArrowDropup
                            className={'btn-option'}
                            size={30}
                            color={'#8D8D8D'}
                        />
                    ) : (
                        <IoMdArrowDropdown
                            className={'btn-option'}
                            size={30}
                            color={'#8D8D8D'}
                        />
                    )}
                </button>
                {/*<input type={'text'} value={currentPick} />*/}
                <ShowOptions productFinderFilter={productFinderFilter} />
            </div>
        </>
    );
};

export default FilterOption;
