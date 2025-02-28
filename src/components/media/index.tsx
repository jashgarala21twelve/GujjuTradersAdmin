import ChallengerLogo from '../../assets/challengerlogo.png';
import GujjuTraderLogo from '../../assets/gujjutradetslogo.png';

const ChallengerLogoComponent = () => <img src={ChallengerLogo} />;
const GujjuTraderLogoComponent = ({ onClick }) => (
  <div
    className=" w-auto overflow-hidden flex justify-center items-center gap-2 cursor-pointer"
    onClick={onClick}
  >
    <img className="h-[100px] w-[100px] object-cover " src={GujjuTraderLogo} />{' '}
  </div>
);

export { ChallengerLogoComponent, GujjuTraderLogoComponent };
