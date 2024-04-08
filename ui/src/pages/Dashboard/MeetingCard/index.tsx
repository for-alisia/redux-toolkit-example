import React from 'react';
import { useDispatch } from 'react-redux';
import { MODALS, setModal } from '../../../store/slices/layout.slice';
import MeetingCard from './MeetingCard';
import { useBookSeatMutation } from '../../../store/apis/meetings.api';
import { Meeting } from '../../../models/Meeting.model';

type MeetingCardWrapperProps = {
  meeting: Meeting;
}

const MeetingCardWrapper: React.FC<MeetingCardWrapperProps> = ({ meeting }) => {
  const dispatch = useDispatch();
  const { id, availableSeats } = meeting;
  const [bookSeat, { isLoading }] = useBookSeatMutation(); // we have acess to the result and state of mutation

  const onBookSeat = () => bookSeat(id);

  const onShowDetails = () => dispatch(setModal({
    modalName: MODALS.MEETING_DETAILS,
    modalData: {
      meetingId: id,
    }
  }));

  const isBookActionDisabled = isLoading || availableSeats <= 0;

  return (
    <MeetingCard
      {...meeting}
      onBookSeat={onBookSeat}
      isBookActionDisabled={isBookActionDisabled}
      isUpdatingMeeting={isLoading}
      onShowDetails={onShowDetails}
    />
  );
}

export default MeetingCardWrapper;