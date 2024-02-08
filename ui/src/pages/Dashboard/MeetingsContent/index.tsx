import { useGetAllMeetingsQuery } from '../../../store/apis/meetings.api';
import { Spin, Flex, Alert } from 'antd';
import MeetingsContent from './MeetingsContent';

const MeetingsContentWrapper = () => {
  const {
    data,
    isLoading, // true only for initial call (when no data is available)
    isFetching, // true when each call is executed
    isSuccess, // true if we have some success data from the call
    refetch, // allows to force an update
  } = useGetAllMeetingsQuery(undefined, {
    pollingInterval: 5000, // polling happens each 3 sec
    skipPollingIfUnfocused: true, // polling is be skipped if tab is not in focus (available in last version)
    // refetchOnFocus: true, // also quite usefull - not too often, but refetching
  });

  const updateMeetingsHandler = () => {
    refetch();
  }

  if (isLoading) {
    return (
      <Flex align="center" justify="center" style={{ height: 200 }}>
        <Spin size="large" />
      </Flex>
    )
  }

  if (data && !data.length) {
    return <Alert type="info" message="No available meetings" />
  }

  return (
    <MeetingsContent
      meetings={data || []}
      isFetching={isFetching}
      onUpdate={updateMeetingsHandler}
      isSuccess={isSuccess}
    />
  );
}

export default MeetingsContentWrapper;