import { ProductFinderFilter } from '../../../models/Response.model.ts';
import { useState } from 'react';
import ArrowUp from '../../../assets/icons/arrow-up.svg';
import ArrowDown from '../../../assets/icons/arrow-down.svg';
import { useStore } from '../../../store/main.store.ts';

const FilterOption = ({
    title,
    productFinderFilter,
}: {
    title: string;
    productFinderFilter: ProductFinderFilter[];
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const { currentNavPicks, setCurrentNavPicks, testFetch } = useStore();

    // const showAllProducts: ProductFinderFilter = {
    //     filterLocalName: 'Wszystkie',
    //     filterSearchCode: 'onlineavailability',
    // };

    // const [currentPick, setCurrentPick] =
    //     useState<ProductFinderFilter>(showAllProducts);

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
        // it removes previous pick from the same dropdown menu
        const removePreviousPushNew = currentNavPicks.filter(
            (pick: string) => pick !== currentPick.filterSearchCode
        );

        // adds new pick but not 'Wszystkie' - it's an empty string
        if (change.filterSearchCode !== '')
            removePreviousPushNew.push(change.filterSearchCode);

        setCurrentPick(change); // local state for single dropdown menu
        setCurrentNavPicks(removePreviousPushNew); // global state

        testFetch(removePreviousPushNew);
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
                    <img
                        src={showDropdown ? ArrowUp : ArrowDown}
                        className={'btn-option'}
                    />
                </button>
                {/*<input type={'text'} value={currentPick} />*/}
                <ShowOptions productFinderFilter={productFinderFilter} />
            </div>
        </>
    );
};

export default FilterOption;
