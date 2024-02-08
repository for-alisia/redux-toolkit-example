import React from 'react';
import MeetingCard from './MeetingCard';
import { useBookSeatMutation } from '../../../store/apis/meetings.api';
import { Meeting } from '../../../models/Meeting.model';

const MeetingCardWrapper: React.FC<Meeting> = (meeting) => {
  const { id } = meeting;
  const [bookSeat] = useBookSeatMutation();

  const onBookSeat = () => bookSeat(id);

  return <MeetingCard {...meeting} onBookSeat={onBookSeat} />;
}

export default MeetingCardWrapper;