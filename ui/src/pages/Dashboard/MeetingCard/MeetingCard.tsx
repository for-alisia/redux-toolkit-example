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

type MeetingCardProps = Meeting & {
  onBookSeat: () => void;
  onShowDetails: () => void;
  isBookActionDisabled: boolean;
  isUpdatingMeeting: boolean;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  title,
  description,
  date,
  time,
  availableSeats,
  city,
  level,
  onBookSeat,
  onShowDetails,
  isBookActionDisabled,
  isUpdatingMeeting,
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
          style={{ minHeight: 200 }}
        />
      }
      actions={[
        <Button
          type="link"
          size="small"
          disabled={isBookActionDisabled}
          icon={<EditOutlined />}
          onClick={onBookSeat}
          loading={isUpdatingMeeting}
        >Book</Button>,
        <Button type="link" size="small" icon={<InfoCircleOutlined />} onClick={onShowDetails}>
          Details
        </Button>,
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
            <span style={{ margin: '0 1rem 0 0.5rem', color: customTheme.token.colorTextBase }}>{city}</span>
            <DashboardOutlined style={{ color: customTheme.token.colorWarning }} />
            <span style={{ marginLeft: '0.5rem', color: customTheme.token.colorTextBase }}>{level}</span>
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