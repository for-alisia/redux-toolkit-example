import { Layout  } from 'antd';
import customTheme from '../../theme';

const { Footer: AntFooter } = Layout;

const Footer:React.FC = () => (
  <AntFooter style={{ textAlign: 'center', backgroundColor: customTheme.token.colorSuccess }}>
          Speaking Club ©{new Date().getFullYear()} - Languages for everyone
  </AntFooter>
);

export default Footer;