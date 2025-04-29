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
                            filterLocalName: 'Najnowsze',
                            filterSearchCode: 'newest',
                        },
                        {
                            filterLocalName: 'Cena: Od wysokiej do niskiej',
                            filterSearchCode: 'pricedecending',
                        },
                        {
                            filterLocalName: 'Cena: Od niskiej do wysokiej',
                            filterSearchCode: 'priceascending',
                        },
                    ]}
                />

                {navGroups
                    // I wanted to simplify filters, so I filtered out every option not related to washing machines
                    // and options not needed.
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
                        // This displays names for technologies much shorter
                        // without this it would look for example like this:
                        // EcoBubble™ - skuteczne i energooszczędne pranie w niskiej temperaturze
                        if (navGroup.categoryFilterName === 'technologies') {
                            const betterDisplayName: ProductFinderFilter[] =
                                navGroup.productFinderFilter.map((item) => ({
                                    filterLocalName:
                                        item.filterLocalName.split(' -')[0],
                                    filterSearchCode: item.filterSearchCode,
                                }));

                            return (
                                <FilterOption
                                    key={navGroup.categoryFilterDispName}
                                    title={`${navGroup.categoryFilterDispName}:`}
                                    productFinderFilter={betterDisplayName}
                                />
                            );
                        }

                        // This shortens filter name just to 'Klasa energetyczna'
                        if (
                            navGroup.categoryFilterName ===
                            'Klasa energetyczna pralki i pralko-suszarki'
                        ) {
                            return (
                                <FilterOption
                                    key={navGroup.categoryFilterDispName}
                                    title={'Klasa energetyczna:'}
                                    productFinderFilter={
                                        navGroup.productFinderFilter
                                    }
                                />
                            );
                        }

                        return (
                            <FilterOption
                                key={navGroup.categoryFilterDispName}
                                title={`${navGroup.categoryFilterDispName}:`}
                                productFinderFilter={
                                    navGroup.productFinderFilter
                                }
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default FilterContainer;
