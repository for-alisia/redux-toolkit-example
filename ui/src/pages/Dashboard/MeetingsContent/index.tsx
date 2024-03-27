import { useGetAllMeetingsQuery } from '../../../store/apis/meetings.api';
import { useSelector } from 'react-redux';
import { Alert, Result } from 'antd';
import { getShowUnavailable, getSelectedCities } from '../../../store/slices/filters.slice';
import MeetingsContent from './MeetingsContent';
import { Meeting } from '../../../models/Meeting.model';

const filterData = (data: Meeting[], showUnavailable: boolean, selectedCities: string[]) => {
  return data.filter(({ availableSeats, city }) => {
    if (!showUnavailable && availableSeats < 1) {
      return false;
    }

    if (selectedCities.length > 0 && !selectedCities.includes(city)) {
      return false;
    }
    return true;
  });
};

const MeetingsContentWrapper = () => {
  const showUnavailableMeetings = useSelector(getShowUnavailable);
  const selectedCities = useSelector(getSelectedCities);
  const {
    data,
    isLoading, // true only for initial call (when no data is available)
    isFetching, // true when each call is executed
    isSuccess, // true if we have some success data from the call
    refetch, // allows to force an updates
  } = useGetAllMeetingsQuery(undefined, {
    selectFromResult: ({ data, ...other }) => ({
      data: filterData(data || [], showUnavailableMeetings, selectedCities),
      ...other
    }),
    pollingInterval: 5000, // polling happens each 5 sec
    skipPollingIfUnfocused: true, // polling is be skipped if tab is not in focus (available in last version)
    // refetchOnFocus: true, // also quite usefull - not too often, but refetching
  });

  const updateMeetingsHandler = () => {
    refetch();
  }

  if (isLoading) {
    return (
      <Result title="Fetching data..." status="success" />
    );
  }

  if (data && !data?.length) {
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