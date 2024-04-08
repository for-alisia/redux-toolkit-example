import { createSlice, nanoid, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export enum MODALS {
  MEETING_DETAILS = 'meeting_details',
}

export type MeetingDetailData = {
  meetingId: number;
}

export type Modal = { 
  modalName: MODALS | null;
  modalData: MeetingDetailData | null;
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
}

export interface LayoutState {
  modal: Modal;
  notifications: Notification[];
}

const initialState: LayoutState = {
  modal: {
    modalName: null,
    modalData: null,
  },
  notifications: [],
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setModal: (state, { payload }: PayloadAction<Modal>) => {
      state.modal = payload;
    },
    unsetModal: (state) => {
      state.modal.modalData = null;
      state.modal.modalName = null;
    },
    addNotification: (state, { payload: { message, type } }: PayloadAction<Omit<Notification, 'id'>>) => {
      state.notifications.push({
        id: nanoid(),
        message,
        type,
      });
    },
    removeNotification: (state, { payload }: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(({ id }) => id !== payload);
    }
  },
});

export const {
  setModal, unsetModal, addNotification, removeNotification,
} = layoutSlice.actions;

const getLayoutSlice = ({ layout }: RootState) => layout;

export const getModal = createSelector(
  getLayoutSlice,
  ({ modal }) => modal,
);

export const getModalName = createSelector(
  getLayoutSlice,
  ({ modal }) => modal.modalName,
);

export const getNotifications = createSelector(
  getLayoutSlice,
  ({ notifications }) => notifications,
);

export default layoutSlice.reducer;
