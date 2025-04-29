import { ProductFinderFilter } from '../../../models/Response.model.ts';
import { useState } from 'react';
import ArrowUp from '../../../assets/icons/arrow-up.svg';
import ArrowDown from '../../../assets/icons/arrow-down.svg';

const FilterOption = ({
    title,
    productFinderFilter,
}: {
    title: string;
    productFinderFilter: ProductFinderFilter[];
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const showAllProducts: ProductFinderFilter = {
        filterLocalName: 'Wszystkie',
        filterSearchCode: 'onlineavailability',
    };

    const [currentPick, setCurrentPick] =
        useState<ProductFinderFilter>(showAllProducts);

    window.onclick = (event) => {
        if (!(event.target as HTMLObjectElement).matches('.btn-option')) {
            if (showDropdown) {
                setShowDropdown(false);
            }
        }
    };

    const handleCurrentPickChange = (change: ProductFinderFilter) => {
        setCurrentPick(change);
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
                        <li
                            onClick={() =>
                                handleCurrentPickChange(showAllProducts)
                            }
                        >
                            {showAllProducts.filterLocalName}
                        </li>
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
