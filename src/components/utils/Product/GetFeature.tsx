const GetFeature = ({ usp }: { usp: string[] }) => {
    const PrintFeatures = () => {
        if (usp !== null) {
            return (
                <>
                    {usp.map((feature, index) => {
                        if (index === usp.length - 1)
                            return `${feature.split(' -')[0]}`;
                        else return `${feature.split(' -')[0]}, `;
                    })}
                </>
            );
        }
        return <>N\D</>;
    };

    return <PrintFeatures />;
};

export default GetFeature;
