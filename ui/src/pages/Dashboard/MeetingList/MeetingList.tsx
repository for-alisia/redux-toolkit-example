import { Flex } from 'antd';
import MeetingCard from '../MeetingCard';
import { Meeting } from '../../../models/Meeting.model';

type MeetingListProps = {
  meetings: Meeting[];
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings }) => (
  <ul>
    <Flex wrap="wrap" gap="middle" justify="center">
      {meetings.map((meeting) => (
        <MeetingCard {...meeting} key={meeting.id} />
      ))}
    </Flex>
  </ul>
);

export default MeetingList;