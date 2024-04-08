import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Comment } from '../../../../models/Comment.model';
import { colors } from '../../../../theme';


const CommentItem: React.FC<Comment> = ({ authorName, date, time, text }) => (
  <div style={{
    backgroundColor: colors.lightPrimary,
    color: colors.basePrimary,
    borderRadius: '0.5rem',
    padding: '0.8rem',
    marginBottom: '1rem'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
      <div>
        <Avatar icon={<UserOutlined />} style={{ backgroundColor: colors.linkPrimary }} />
        <span style={{ marginLeft: '0.5rem' }}>{authorName}</span>
      </div>
      <div>
        <span style={{ marginRight: '0.5rem'}}>{date}</span>
        <span>{time}</span>
      </div>
    </div>
    <div>{text}</div>
  </div>
);

export default CommentItem;