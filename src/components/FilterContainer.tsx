import '../style/FilterContainer.css';
import { NavGroup, ProductFinderFilter } from '../models/Response.model.ts';
import FilterOption from './utils/Filter/FilterOption.tsx';

const FilterContainer = ({ navGroups }: { navGroups: NavGroup[] }) => {
    return (
        <div className={'center-container'}>
            <div id={'filter-container'}>
                <FilterOption
                    title={'Sortuj po'}
                    productFinderFilter={[
                        {
                            filterLocalName: 'Wszystkie',
                            filterSearchCode: 'onlineavailability',
                        },
                        {
                            filterLocalName: 'Cena: Od wysokiej do niskiej',
                            filterSearchCode: 'pricedecending',
                        },
                        {
                            filterLocalName: 'Cena: Od niskiej do wysokiej',
                            filterSearchCode: 'priceascending',
                        },
                        {
                            filterLocalName: 'Najnowsze',
                            filterSearchCode: 'newest',
                        },
                    ]}
                />

                {navGroups
                    // I wanted to simplify filters, so I filtered out every option not related to washing machines
                    // and options not needed like for example reviews.
                    .filter(
                        (navGroup) =>
                            navGroup.categoryFilterName !== 'Price' &&
                            navGroup.categoryFilterName !== 'Casing Color' &&
                            navGroup.categoryFilterName !== 'Product type' &&
                            navGroup.categoryFilterName !==
                                'Klasa energetyczna suszarki' &&
                            navGroup.categoryFilterName !== 'Amenities' &&
                            navGroup.categoryFilterName !== 'Recommended' &&
                            navGroup.categoryFilterName !== 'reviews'
                    )
                    .map((navGroup) => {
                        const navFinalResult: ProductFinderFilter[] = [
                            {
                                filterLocalName: 'Wszystkie',
                                filterSearchCode: '',
                            },
                        ];

                        // This displays names for technologies much shorter
                        // without this it would look for example like this:
                        // EcoBubble™ - skuteczne i energooszczędne pranie w niskiej temperaturze
                        if (navGroup.categoryFilterName === 'technologies') {
                            const betterDisplayName: ProductFinderFilter[] = [
                                {
                                    filterLocalName: 'Wszystkie',
                                    filterSearchCode: '',
                                },
                            ];

                            navGroup.productFinderFilter.forEach((item) =>
                                betterDisplayName.push({
                                    filterLocalName:
                                        item.filterLocalName.split(' -')[0],
                                    filterSearchCode: item.filterSearchCode,
                                })
                            );

                            return (
                                <FilterOption
                                    key={navGroup.categoryFilterDispName}
                                    // title={`${navGroup.categoryFilterDispName}:`}
                                    title={`Funkcje:`}
                                    productFinderFilter={betterDisplayName}
                                />
                            );
                        }

                        navGroup.productFinderFilter.forEach((item) => {
                            navFinalResult.push(item);
                        });

                        // This shortens filter name just to 'Klasa energetyczna'
                        if (
                            navGroup.categoryFilterName ===
                            'Klasa energetyczna pralki i pralko-suszarki'
                        ) {
                            return (
                                <FilterOption
                                    key={navGroup.categoryFilterDispName}
                                    title={'Klasa energetyczna:'}
                                    productFinderFilter={navFinalResult}
                                />
                            );
                        }

                        return (
                            <FilterOption
                                key={navGroup.categoryFilterDispName}
                                title={`${navGroup.categoryFilterDispName}:`}
                                productFinderFilter={navFinalResult}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default FilterContainer;
