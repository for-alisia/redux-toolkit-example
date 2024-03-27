import React from 'react';
import MeetingCard from './MeetingCard';
import { useBookSeatMutation } from '../../../store/apis/meetings.api';
import { Meeting } from '../../../models/Meeting.model';

type MeetingCardWrapperProps = {
  meeting: Meeting;
}

const MeetingCardWrapper: React.FC<MeetingCardWrapperProps> = ({ meeting }) => {
  const { id, availableSeats } = meeting;
  const [bookSeat, { isLoading }] = useBookSeatMutation(); // we have acess to the result and state of mutation

  const onBookSeat = () => bookSeat(id);

  const isBookActionDisabled = isLoading || availableSeats <= 0;

  return (
    <MeetingCard
      {...meeting}
      onBookSeat={onBookSeat}
      isBookActionDisabled={isBookActionDisabled}
      isUpdatingMeeting={isLoading}
    />
  );
}

export default MeetingCardWrapper;