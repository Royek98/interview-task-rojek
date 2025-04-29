import { MonthlyPriceInfo } from '../../../models/Response.model.ts';

type Props = {
    monthlyPriceInfo: MonthlyPriceInfo;
    price: string;
};
const GetMonthlyPriceInfo = ({ monthlyPriceInfo, price }: Props) => {
    if (monthlyPriceInfo === null) {
        return <>{(Number(price) / 30).toFixed(2)} zł x 30 rat</>;
    }
    return (
        <>
            {Number(monthlyPriceInfo.leasingMonthly).toFixed(2)} zł x{' '}
            {monthlyPriceInfo.leasingMonths} rat
        </>
    );
};

export default GetMonthlyPriceInfo;
