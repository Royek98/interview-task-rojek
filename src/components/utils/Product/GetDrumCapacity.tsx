import { Product } from '../../../models/Response.ts';

type Props = {
    product: Product;
};

// some washers have the capacity in chipOptions, some in keySummary
// but the summary can be 'Pojemnoość' or 'Ładowność'
// this should be in one place for every washer...
const GetDrumCapacity = ({ product }: Props) => {
    const drumCapacity = product.chipOptions
        .filter((option) => option.optionTypeName === 'Capacity')
        .map((option) => option.optionList[0].optionLocalName);

    if (drumCapacity.length > 0)
        return <PrintDrumCapacity drumCapacity={drumCapacity[0]} />;

    const summary = product.modelList[0].keySummary;
    const drumCapacityAlt = summary
        .filter(
            (item) =>
                (item.displayType === 'Spec' &&
                    item.key !== null &&
                    item.key.includes('Pojemność')) ||
                (item.key !== null && item.key.includes('Ładowność'))
        )
        .map((item) => item.value);

    return <PrintDrumCapacity drumCapacity={drumCapacityAlt[0]} />;
};

const PrintDrumCapacity = ({
    drumCapacity,
}: {
    drumCapacity: string | null;
}) => {
    if (drumCapacity) {
        if (!drumCapacity.includes('.')) {
            const [value, unit] = drumCapacity.split(' ');
            return (
                <span className={'text-light'}>
                    Pojemność ({unit}):{' '}
                    <span className={'text-bold'}>{value}</span>
                </span>
            );
        }

        // Some values are fetched as float numbers (example 11.0), so I remove part .0 to keep consistency
        const weight = drumCapacity.split('.')[0];
        return (
            <span className={'text-light'}>
                Pojemność (kg): <span className={'text-bold'}>{weight}</span>
            </span>
        );
    }

    return <span className={'text-light'}>N\D</span>;
};

export default GetDrumCapacity;
