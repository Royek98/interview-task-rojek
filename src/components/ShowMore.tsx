import '../style/ShowMore.css';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useStore } from '../store/main.store.ts';
import LoadingScreen from './LoadingScreen.tsx';
import { QueryState } from '../models/Query.model.ts';

const ShowMore = () => {
    const {
        fetchData,
        products,
        query,
        lastResponseLength,
        loadingStatus,
        setLoadingStatus,
    } = useStore();
    const countProducts = products.length;

    const handleFetch = () => {
        const newQuery: QueryState = {
            start: countProducts + 1,
            sort: query.sort,
            filters: query.filters,
        };

        setLoadingStatus(true);
        fetchData(newQuery);
    };

    return (
        <div className={'center-container'}>
            {loadingStatus && <LoadingScreen />}

            {/* I am always fetch 10 products, so if list of last fetched products is shorter it means there are no more products */}
            {(lastResponseLength === 10 && (
                <p
                    id={'show-more'}
                    className={'text-bold'}
                    onClick={handleFetch}
                >
                    Pokaż więcej
                    <IoMdArrowDropdown
                        className={'btn-option'}
                        size={20}
                        color={'#007AFF'}
                    />
                </p>
            )) || <p></p>}
        </div>
    );
};

export default ShowMore;
