import { Layout, theme } from 'antd';
import customTheme from '../../theme';
import MeetingsContent from './MeetingsContent';

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{
      padding: '0 48px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Layout
        style={{
          margin: '2.5rem 0',
          padding: '24px 0',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          height: '100%',
          backgroundColor: customTheme.token.colorTextBase
        }}
      >
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <MeetingsContent />
        </Content>
      </Layout>
    </Content>
  );
};

export default Dashboard;
