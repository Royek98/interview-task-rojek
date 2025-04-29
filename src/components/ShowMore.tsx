import '../style/ShowMore.css';
import { IoMdArrowDropdown } from 'react-icons/io';
import { QueryState, useStore } from '../store/main.store.ts';

const ShowMore = () => {
    const { testFetch, countProducts, query } = useStore();

    const handleFetch = () => {
        const newQuery: QueryState = {
            start: countProducts + 1,
            sort: query.sort,
            filters: query.filters,
        };

        testFetch(newQuery);
    };

    return (
        <div className={'center-container'}>
            <p id={'show-more'} className={'text-bold'} onClick={handleFetch}>
                Pokaż więcej
                <IoMdArrowDropdown
                    className={'btn-option'}
                    size={20}
                    color={'#007AFF'}
                />
            </p>
        </div>
    );
};

export default ShowMore;
