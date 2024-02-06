import { Card, Badge, Button } from 'antd';
import {
  CalendarOutlined,
  FieldTimeOutlined,
  PushpinOutlined,
  DashboardOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import customTheme from '../../../theme';
import { Meeting } from '../../../models/Meeting.model';

const { Meta } = Card;

const MeetingCard: React.FC<Meeting> = ({
  title,
  description,
  date,
  time,
  availableSeats,
  city,
  level
}) => ( 
  <Badge.Ribbon
        text={`${availableSeats} seats are available`}
        color={customTheme.token.colorSuccess}
        style={{ transform: 'translate 10px 10px'}}
      >
    <Card
      style={{ width: 350, backgroundColor: customTheme.token.colorPrimary }}
      hoverable
      cover={
        <img
          alt=""
          src={`https://source.unsplash.com/random/400x200?${title}`}
        />
      }
      actions={[
        <Button type="link" size="small" icon={<EditOutlined />} ghost>Book</Button>,
        <Button type="link" size="small" icon={<InfoCircleOutlined />} ghost>Details</Button>,
      ]}
    >
      <p>
        <CalendarOutlined style={{ color: customTheme.token.colorLink }} />
        <span style={{ margin: '0 1rem 0 0.5rem' }}>{date}</span>
        <FieldTimeOutlined style={{ color: customTheme.token.colorLink }} />
        <span style={{ marginLeft: '0.5rem' }}>{time}</span>
      </p>
      <h3 style={{ marginBottom: '0.5rem'}}>
        {title}
      </h3>
        <Meta
        title={(
          <p style={{ fontSize: customTheme.token.fontSize }}>
            <PushpinOutlined style={{ color: customTheme.token.colorLink }} />
            <span style={{ margin: '0 1rem 0 0.5rem' }}>{city}</span>
            <DashboardOutlined style={{ color: customTheme.token.colorWarning }} />
            <span style={{ marginLeft: '0.5rem' }}>{level}</span>
          </p>
        )}
        description={(
          <p style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            maxHeight: '3em',
            minHeight: '3em',
            WebkitLineClamp: 2,
            marginBlock: '0.5rem',
          }}>{description}</p>
        )}
        />
      </Card>
    </Badge.Ribbon>
);

export default MeetingCard;