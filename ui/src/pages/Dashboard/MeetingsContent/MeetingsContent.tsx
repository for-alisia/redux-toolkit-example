import { Meeting } from '../../../models/Meeting.model';
import { Button, Flex, Spin, Alert } from 'antd';
import MeetingList from '../MeetingList';

type MeetingsContentProps = {
  meetings: Meeting[];
  isFetching: boolean;
  isSuccess: boolean;
  onUpdate: () => void;
}

const MeetingsContent: React.FC<MeetingsContentProps> = ({
  meetings, isFetching, isSuccess, onUpdate
}) => (
  <>
    <Flex style={{ paddingInline: 32, marginBottom: 32 }} align="center">
      <Button type="primary" onClick={onUpdate}>Update meetings</Button>
      {isFetching && <Spin style={{ marginLeft: 16 }} />}
    </Flex>
    {!isSuccess && (
      <Alert
        type="error"
        message="Error happened on meetings update"
        closable
        style={{ marginInline: 32, marginBottom: 32 }} />
    )}
    <MeetingList meetings={meetings} />
  </> 
);

export default MeetingsContent;