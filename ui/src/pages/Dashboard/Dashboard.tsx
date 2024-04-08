import { Layout, theme } from 'antd';
import customTheme from '../../theme';
import MeetingsContent from './MeetingsContent';
import Filters from './Filters';
import MeetingDetailsModal from './MeetingDetailsModal';

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
      <Layout style={{
        marginBlock: '2rem',
        backgroundColor: customTheme.token.colorSuccess,
      }}>
        <Filters />
      </Layout>
      <Layout
        style={{
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
        <MeetingDetailsModal />
      </Layout>
    </Content>
  );
};

export default Dashboard;
