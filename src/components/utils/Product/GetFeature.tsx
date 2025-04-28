const GetFeature = ({ usp }: { usp: string[] }) => {
    return (
        <>
            {usp.map((feature, index) => {
                if (index === usp.length - 1)
                    return `${feature.split(' -')[0]}`;
                else return `${feature.split(' -')[0]}, `;
            })}
        </>
    );
};

export default GetFeature;
