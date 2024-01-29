import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import customTheme from '../../theme';

const { Header: AntHeader } = Layout;

const Header = () => (
  <AntHeader style={{
  display: 'flex',
  alignItems: 'center',
  backgroundColor: customTheme.token.colorPrimary,
}}>
  <Menu
    theme="dark"
    mode="horizontal"
    style={{ flex: 1, minWidth: 0, backgroundColor: customTheme.token.colorPrimary }}
    >
      <Menu.Item key="home">
        <NavLink to="/">Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item key="coaches">
        <NavLink to="/coaches">Coaches</NavLink>
      </Menu.Item>
  </Menu>
</AntHeader>
);

export default Header;