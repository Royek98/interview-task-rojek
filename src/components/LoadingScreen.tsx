import loadingGif from '../assets/imgs/loading.gif';

const LoadingScreen = () => {
    return (
        <img
            src={loadingGif}
            alt={'loading...'}
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        />
    );
};

export default LoadingScreen;
