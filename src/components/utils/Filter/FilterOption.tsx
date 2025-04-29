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
    // todo: When user clicks outside of box it will disappear
    const [arrowState, setArrowState] = useState<boolean>(false);

    const ShowOptions = ({
        productFinderFilter,
    }: {
        productFinderFilter: ProductFinderFilter[];
    }) => {
        if (arrowState) {
            return (
                <div className={'option-container'}>
                    <ul onClick={() => setArrowState(!arrowState)}></ul>
                    {productFinderFilter.map((item) => {
                        return (
                            <li key={item.filterSearchCode}>
                                {item.filterLocalName}
                            </li>
                        );
                    })}
                </div>
            );
        }

        return <></>;
    };

    return (
        <>
            <div className={'filter-option-container'}>
                <h2 className={'text-bold'}>{title}</h2>
                <button onClick={() => setArrowState(!arrowState)}>
                    Popularność <img src={arrowState ? ArrowUp : ArrowDown} />
                </button>
                <ShowOptions productFinderFilter={productFinderFilter} />
            </div>
        </>
    );
};

export default FilterOption;
