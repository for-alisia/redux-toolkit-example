import { Layout as AntLayout, theme, ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import customTheme from '../theme';

const Layout: React.FC = () => {
  return (
    <ConfigProvider theme={{
      ...customTheme,
      algorithm: theme.darkAlgorithm
    }}>
      <AntLayout style={{ minHeight: '100vh',background: customTheme.token.colorSuccess }}>
        <Header />
        <Outlet />
        <Footer />
      </AntLayout>
    </ConfigProvider>
  );
};

export default Layout;