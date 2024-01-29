import { Flex } from 'antd';
import MeetingCard from '../MeetingCard';

const meetings = [
  {
    title: 'English in everyday life',
    description: 'Beginners friendly speaking club',
    date: '11 Feb, 2024',
    time: '15:00 (CET)',
    availableSeats: 8,
    city: 'Krakow',
    topic: 'class',
    level: 'Beginner',
  },
  {
    title: 'English in everyday life',
    description: 'Beginners friendly speaking club',
    date: '11 Feb, 2024',
    time: '15:00 (CET)',
    availableSeats: 8,
    city: 'Berlin',
    topic: 'kids',
    level: 'Advanced',
  },
  {
    title: 'English in everyday life',
    description: 'Beginners friendly speaking club',
    date: '11 Feb, 2024',
    time: '15:00 (CET)',
    availableSeats: 8,
    city: 'Paris',
    topic: 'Alphabet',
    level: 'Intermediate',
  },
  {
    title: 'English in everyday life',
    description: 'Beginners friendly speaking club',
    date: '11 Feb, 2024',
    time: '15:00 (CET)',
    availableSeats: 8,
    city: 'Lublin',
    topic: 'university',
    level: 'Beginner',
  }
];

const MeetingList = () => (
  <ul>
    <Flex wrap="wrap" gap="middle" justify="center">
      {meetings.map((meeting) => (
        <MeetingCard {...meeting} />
      ))}
    </Flex>
  </ul>
);

export default MeetingList;