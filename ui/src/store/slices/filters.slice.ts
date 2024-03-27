import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface FiltersState {
  showNotAvailable: boolean;
  selectedCities: string[],
}

const initialState: FiltersState = {
  showNotAvailable: true,
  selectedCities: [],
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setShowUnavailable: (state, { payload }: PayloadAction<boolean>) => {
      state.showNotAvailable = payload;
    },
    setSelectedCities: (state, { payload }: PayloadAction<string[]>) => {
      state.selectedCities = payload;
    }
  },
});

export const { setShowUnavailable, setSelectedCities } = filtersSlice.actions;

const getFiltersSlice = ({ filters }: RootState) => filters;

export const getShowUnavailable = createSelector(
  getFiltersSlice,
  ({ showNotAvailable }) => showNotAvailable,
);

export const getSelectedCities = createSelector(
  getFiltersSlice,
  ({ selectedCities }) => selectedCities,
);

export default filtersSlice.reducer;
