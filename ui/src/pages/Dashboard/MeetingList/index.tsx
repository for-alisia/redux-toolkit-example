import { useGetAllMeetingsQuery } from '../../../store/apis/meetings.api';
import MeetingList from './MeetingList';

const MeetingListWrapper = () => {
  const { data, isLoading } = useGetAllMeetingsQuery();

  if (isLoading) {
    return <div>Loading data...</div>
  }

  if (!data) {
    return <div>Data is not available</div>
  }

  return <MeetingList meetings={data} />;
}

export default MeetingListWrapper;