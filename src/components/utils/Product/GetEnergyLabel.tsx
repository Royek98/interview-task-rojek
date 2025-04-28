import klasaA from '../../../assets/imgs/klasaA.png';
import klasaB from '../../../assets/imgs/klasaB.png';
import klasaC from '../../../assets/imgs/klasaC.png';
import klasaD from '../../../assets/imgs/klasaD.png';
import klasaE from '../../../assets/imgs/klasaE.png';
import klasaF from '../../../assets/imgs/klasaF.png';
import klasaG from '../../../assets/imgs/klasaG.png';

const GetEnergyLabel = ({ energyGrade }: { energyGrade: string | null }) => {
    switch (energyGrade) {
        case 'A': {
            return <img src={klasaA} />;
        }
        case 'B': {
            return <img src={klasaB} />;
        }
        case 'C': {
            return <img src={klasaC} />;
        }
        case 'D': {
            return <img src={klasaD} />;
        }
        case 'E': {
            return <img src={klasaE} />;
        }
        case 'F': {
            return <img src={klasaF} />;
        }
        case 'G': {
            return <img src={klasaG} />;
        }
        default: {
            return <>¯\_(ツ)_/¯</>;
        }
    }
};

export default GetEnergyLabel;
