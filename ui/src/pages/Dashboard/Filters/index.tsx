import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getShowUnavailable, setShowUnavailable, getSelectedCities, setSelectedCities,
} from '../../../store/slices/filters.slice';
import { useGetAllMeetingsQuery } from '../../../store/apis/meetings.api';
import Filters from './Filters';

const FiltersWrapper = () => {
  const dispatch = useDispatch();
  const showUnavailable = useSelector(getShowUnavailable);
  const selectedCities = useSelector(getSelectedCities);
  const { cities, isLoading } = useGetAllMeetingsQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      cities: Array.from(new Set(data?.map(({ city }) => city))).map((item) => ({ label: item, value: item })),
      isLoading,
    }),
  });

  const changeShowUnavailable = (checked: boolean) => {
    dispatch(setShowUnavailable(checked));
  }

  const changeSelectedCities = (value: string[]) => {
    dispatch(setSelectedCities(value));
  }

  return (
    <Filters
      showUnavailable={showUnavailable}
      onShowUnavailable={changeShowUnavailable}
      isCititesLoading={isLoading}
      citySelectOptions={cities}
      selectedCities={selectedCities}
      onCitySelectChange={changeSelectedCities}
    />);
}

export default FiltersWrapper;