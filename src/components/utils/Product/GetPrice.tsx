const GetPrice = ({ priceDisplay }: { priceDisplay: string }) => {
    const PrintPrice = () => {
        if (priceDisplay !== null) {
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
        }

        return <></>;
    };

    return <PrintPrice />;
};

export default GetPrice;
