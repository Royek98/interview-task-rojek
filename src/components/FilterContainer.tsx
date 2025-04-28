import '../style/FilterContainer.css';
import { useState } from 'react';
import ArrowDown from '../assets/icons/arrow-down.svg';
import ArrowUp from '../assets/icons/arrow-up.svg';

const FilterContainer = () => {
    return (
        <div className={'center-container'}>
            <div id={'filter-container'}>
                <FilterOption title={'Sortuj po'} />
                <FilterOption title={'Funkcje'} />
                <FilterOption title={'Klasa energetyczna'} />
                <FilterOption title={'Pojemność'} />
            </div>
        </div>
    );
};

const FilterOption = ({ title }: { title: string }) => {
    // todo: When user clicks outside of box it will disappear
    const [arrowState, setArrowState] = useState<boolean>(false);

    const ShowOptions = () => {
        if (arrowState) {
            return (
                <div className={'option-container'}>
                    <ul onClick={() => setArrowState(!arrowState)}>
                        <li>First</li>
                        <li>First</li>
                        <li>First</li>
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
                <button onClick={() => setArrowState(!arrowState)}>
                    Popularność <img src={arrowState ? ArrowUp : ArrowDown} />
                </button>
                <ShowOptions />
            </div>
        </>
    );
};

export default FilterContainer;
