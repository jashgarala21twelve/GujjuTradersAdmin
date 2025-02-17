import ChallengerLogo from '../../assets/challengerlogo.png';
import GujjuTraderLogo from '../../assets/gujjutradetslogo.png';

const ChallengerLogoComponent = () => <img src={ChallengerLogo} />;
const GujjuTraderLogoComponent = () => (
  <div className=" w-auto overflow-hidden flex justify-center items-center gap-2">
    <img className="h-full w-full object-cover" src={GujjuTraderLogo} />{' '}
  </div>
);

export { ChallengerLogoComponent, GujjuTraderLogoComponent };
