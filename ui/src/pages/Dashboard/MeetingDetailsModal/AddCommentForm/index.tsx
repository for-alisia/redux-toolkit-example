import { ChangeEvent, useState } from 'react';
import { usePostCommentMutation } from '../../../../store/apis/comments.api';
import type { CommentDTO } from '../../../../models/Comment.model';
import AddCommentForm from './AddcommentForm';

type AddCommentFormWrapperProps = {
  meetingId?: number;
}

const AddCommentFormWrapper: React.FC<AddCommentFormWrapperProps> = ({ meetingId }) => {
  const [commentValue, setCommentValue] = useState('');

  const [postCommentMutation] = usePostCommentMutation();

  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e);
    setCommentValue(e.target.value);
  }

  const onCommentPost = () => {
    if (!meetingId || !commentValue) {
      return;
    }

    const newComment: CommentDTO = {
      meetingId,
      text: commentValue,
      authorId: 'u1',
      createdDate: new Date().toISOString(),
    }
    postCommentMutation(newComment)
      .unwrap()
      .then(() => {
        setCommentValue('');
      });
  };

  return (
    <AddCommentForm
      onCommentPost={onCommentPost}
      onCommentChange={onCommentChange}
      commentValue={commentValue}
    />
  );
}

export default AddCommentFormWrapper;