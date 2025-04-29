import { ProductFinderFilter } from '../../../models/Response.model.ts';
import { useState } from 'react';
import { QueryState, useStore } from '../../../store/main.store.ts';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const FilterOption = ({
    title,
    productFinderFilter,
}: {
    title: string;
    productFinderFilter: ProductFinderFilter[];
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const { testFetch, query, setQuery } = useStore();

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

        if (title.includes('Sortuj')) {
            const newQuery: QueryState = {
                start: 1,
                sort: change.filterSearchCode,
                filters: query.filters,
            };
            setQuery(newQuery); // new global state

            testFetch(newQuery);
            return;
        }

        // it removes previous pick from the same dropdown menu
        const removePreviousPushNew: string[] = query.filters.filter(
            (filter) => filter !== currentPick.filterSearchCode
        );

        // adds new nav pick but NOT 'Wszystkie' (it's an empty string)
        if (change.filterSearchCode !== '')
            removePreviousPushNew.push(change.filterSearchCode);

        const newQuery: QueryState = {
            start: 1,
            sort: query.sort,
            filters: removePreviousPushNew,
        };
        setQuery(newQuery); // new global state

        testFetch(newQuery);
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
