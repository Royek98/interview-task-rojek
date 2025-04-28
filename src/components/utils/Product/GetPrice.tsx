const GetPrice = ({ priceDisplay }: { priceDisplay: string }) => {
    const [price, decimalAndCurrency] = priceDisplay.split(',');
    const [decimal, currency] = decimalAndCurrency.split(' ');
    return (
        <>
            <span className={'price-label'}>{price}</span>
            <span className={'price-small-label'}>
                <span className={'decimal-number'}>{decimal}</span>{' '}
                <span className={'currency'}>{currency}</span>
            </span>
        </>
    );
};

export default GetPrice;
