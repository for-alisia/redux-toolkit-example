import { Input, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { colors } from '../../../../theme';
import { ChangeEvent } from 'react';

const { TextArea } = Input;

type AddCommentFormProps = {
  commentValue: string;
  onCommentPost: () => void;
  onCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  commentValue,
  onCommentChange,
  onCommentPost,
}) => (
  <form style={{ marginBottom: '1rem' }}>
    <TextArea
      rows={4}
      placeholder="Type new comment here"
      value={commentValue}
      onChange={onCommentChange}
      allowClear
      maxLength={200}
      style={{ backgroundColor: colors.basePrimary }}
    />
    <Button
      type="primary"
      shape="round"
      icon={<CheckOutlined />}
      onClick={onCommentPost}
    >
      Send
    </Button>
  </form>
);

export default AddCommentForm;