import { useSelector, useDispatch } from 'react-redux';
import { unsetModal, getModalName, getModal, MODALS } from '../../../store/slices/layout.slice';
import { useMeetingDetails } from '../../../store/apis/meetings.api';
import MeetingDetailsModal from './MeetingDetailsModal';
import { useGetCommentsByMeetingIdQuery } from '../../../store/apis/comments.api';

const MeetingDetailsModalWrapper = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(getModalName) === MODALS.MEETING_DETAILS;
  const meetingId = useSelector(getModal).modalData?.meetingId;
  const skip = !meetingId || !isOpened;
 const { meeting, isLoading } = useMeetingDetails(meetingId, skip)

  const { data: comments, isLoading: isCommentsFetching } = useGetCommentsByMeetingIdQuery(meetingId || 0, {
    skip: !meetingId || !isOpened,
  })


  const onOk = () => {
    dispatch(unsetModal());
  }

  const onCancel = () => {
    dispatch(unsetModal());
  }

  return (
    <MeetingDetailsModal
      isOpened={isOpened}
      onOk={onOk}
      onCancel={onCancel}
      meeting={meeting}
      isLoading={isLoading}
      comments={comments || []}
      isCommentsFetching={isCommentsFetching}
    />
  )
};

export default MeetingDetailsModalWrapper;