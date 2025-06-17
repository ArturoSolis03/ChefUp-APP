// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import LogoDark from 'src/assets/images/logos/dark-logo.svg';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LogoDarkRTL from 'src/assets/images/logos/logo-icon.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LogoLight from 'src/assets/images/logos/light-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LogoLightRTL from 'src/assets/images/logos/light-rtl-logo.svg';

const AuthLogo = () => {
  return (
    <img src={LogoDark} alt="logo" style={{ width: '174px', height: '64px' }} />
  );
};

export default AuthLogo;
