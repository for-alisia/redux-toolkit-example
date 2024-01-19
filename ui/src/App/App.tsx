import React from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import customTheme from '../theme';

const { Header, Content, Footer } = Layout;

const menuItems: MenuProps['items'] = ['Speaking clubs', 'Coaches', 'Profile'].map((key) => ({
  key,
  label: key,
}));

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider theme={{
      ...customTheme,
      algorithm: theme.darkAlgorithm
    }}>
      <Layout style={{ minHeight: '100vh',background: customTheme.token.colorSuccess }}>
        <Header style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: customTheme.token.colorPrimary,
        }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={menuItems}
            style={{ flex: 1, minWidth: 0, backgroundColor: customTheme.token.colorPrimary }}
          />
        </Header>
        <Content style={{
          padding: '0 48px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Speaking Clubs</Breadcrumb.Item>
            <Breadcrumb.Item>Warsaw</Breadcrumb.Item>
            <Breadcrumb.Item>Spanish</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            style={{
              padding: '24px 0',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: '100%',
              backgroundColor: customTheme.token.colorTextBase
            }}
          >
            <Content style={{ padding: '0 24px', minHeight: 280 }}>No clubs found. Give it a try next time</Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: customTheme.token.colorSuccess }}>
          Speaking Club ©{new Date().getFullYear()} - Languages for everyone
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
