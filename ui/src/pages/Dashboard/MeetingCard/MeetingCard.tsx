import { Card, Badge } from 'antd';
import {
  CalendarOutlined,
  FieldTimeOutlined,
  PushpinOutlined,
  DashboardOutlined,
  FireTwoTone,
  HeartTwoTone,
  InfoCircleTwoTone,
} from '@ant-design/icons';
import customTheme from '../../../theme';

const { Meta } = Card;

type MeetingCardProps = {
  title: string;
  description: string;
  date: string;
  time: string;
  availableSeats: number;
  city: string;
  topic: string;
  level: string;
}

const getLevelColor = (level: string) => {
  if (level === 'Beginner') {
    return customTheme.token.colorSuccess;
  }

  if (level === 'Advanced') {
    return customTheme.token.colorLink;
  }

  return customTheme.token.colorWarning
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  title,
  description,
  date,
  time,
  availableSeats,
  city,
  topic,
  level
}) => ( 
  <Badge.Ribbon
        text={`${availableSeats} seats are available`}
        color={customTheme.token.colorSuccess}
        style={{ transform: 'translate 10px 10px'}}
      >
    <Card
      style={{ width: 400 }}
      cover={
        <img
          alt=""
          src={`https://source.unsplash.com/random/400x200?${topic}`}
        />
      }
      actions={[
        <FireTwoTone key="join" twoToneColor={customTheme.token.colorLink} />,
        <HeartTwoTone key="like" twoToneColor={customTheme.token.colorWarning} />,
        <InfoCircleTwoTone key="info" twoToneColor={customTheme.token.colorPrimary} />,
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
            <DashboardOutlined style={{ color: getLevelColor(level) }} />
            <span style={{ marginLeft: '0.5rem' }}>{level}</span>
          </p>
        )}
          description={description}
        />
      </Card>
    </Badge.Ribbon>
);

export default MeetingCard;