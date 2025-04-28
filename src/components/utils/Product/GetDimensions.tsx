import { KeySummary } from '../../../models/Response.ts';

const GetDimensions = ({ keySummary }: { keySummary: KeySummary[] }) => {
    const dimensions = keySummary
        .filter(
            (product) =>
                product.displayType === 'Spec' &&
                (product.key === 'Parametry fizyczne' ||
                    product.key?.includes('Wymiary netto'))
        )
        .map((product) => product.value)[0];

    if (dimensions) {
        const [width, height, depth, unit] = dimensions
            .replaceAll('x ', '')
            .split(' ');
        return (
            <span className={'text-bold'}>
                {depth} x {width} x {height} {unit}
            </span>
        );
    }

    return <span className={'text-bold'}>N\D</span>;
};

export default GetDimensions;
