import { Modal, Spin, Tag, Avatar } from 'antd';
import {
  CalendarOutlined,
  FieldTimeOutlined,
  PushpinOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { MetingDetailed } from '../../../models/Meeting.model';
import customTheme, { colors } from '../../../theme';
import type { Comment } from '../../../models/Comment.model';
import AddCommentForm from './AddCommentForm';
import CommentItem from './Comment';
import formatter from '../../../services/Formatter';

export type MeetinDetailsProps = {
  isOpened: boolean;
  onOk: () => void;
  onCancel: () => void;
  meeting: MetingDetailed | null;
  isLoading: boolean;
  comments: Comment[];
  isCommentsFetching: boolean;
}

const MeetingDetailsModal: React.FC<MeetinDetailsProps> = ({
  isOpened, onOk, onCancel, meeting, isLoading, comments, isCommentsFetching,
}) => (
  <Modal
    title={!isLoading ? meeting?.title : 'Data is loading...'}
    open={isOpened}
    onOk={onOk}
    onCancel={onCancel}
    footer={null}
    width={700}
  >
    <div>
      {isLoading ? <Spin style={{ marginLeft: 16 }} /> : (
        <article>
          <p>{meeting?.description}</p>
          <p>
            <CalendarOutlined style={{ color: customTheme.token.colorLink }} />
            <span style={{ margin: '0 1rem 0 0.5rem' }}>{meeting?.date}</span>
            <FieldTimeOutlined style={{ color: customTheme.token.colorLink }} />
            <span style={{ marginLeft: '0.5rem' }}>{meeting?.time}</span>
          </p>
          <p style={{ fontSize: customTheme.token.fontSize }}>
            <PushpinOutlined style={{ color: customTheme.token.colorLink }} />
            <span style={{ margin: '0 1rem 0 0.5rem', color: customTheme.token.colorTextBase }}>{meeting?.city}</span>
            <DashboardOutlined style={{ color: customTheme.token.colorWarning }} />
            <span style={{ marginLeft: '0.5rem', color: customTheme.token.colorTextBase }}>{meeting?.level}</span>
          </p>
          <p>
            <Tag color={colors.errorPrimary}>Available seats: {meeting?.availableSeats}</Tag>
          </p>
          <p>
            <Avatar.Group>
              {meeting?.attendies?.map((user) => (
                <Avatar key={user} style={{ backgroundColor: colors.linkPrimary}}>{formatter.parseNameToInitials(user)}</Avatar>
              ))}
            </Avatar.Group>
          </p>
        </article>
      )}
      <h3 style={{ color: colors.linkPrimary }}>Comments</h3>
      <AddCommentForm meetingId={meeting?.id} />
      {
        !isCommentsFetching ? comments.map((comment) => (
          <CommentItem {...comment} key={`${comment.authorId}/${comment.date}`} />
        )) : <Spin style={{ marginLeft: 16 }} />
      }
    </div>
  </Modal>
);

export default MeetingDetailsModal;