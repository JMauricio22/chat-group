import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChannelInfo } from '@models/channel.model';

interface ChannelState {
  list: ChannelInfo[];
  loading: boolean;
  error: string;
  filter: string;
  newChannelError: string;
  isCreatingChannel: boolean;
}

const initialState: ChannelState = {
  list: [],
  loading: false,
  error: '',
  filter: '',
  newChannelError: '',
  isCreatingChannel: false,
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchingChannels: (state: ChannelState) => ({
      ...initialState,
      loading: true,
    }),
    setChannels: (
      state: ChannelState,
      { payload }: PayloadAction<ChannelInfo[]>,
    ) => ({
      ...initialState,
      list: payload,
    }),
    setError: (state: ChannelState, { payload }: PayloadAction<string>) => ({
      ...initialState,
      list: state.list,
      error: payload,
    }),
    changeFilter: (
      state: ChannelState,
      { payload }: PayloadAction<string>,
    ) => ({
      ...state,
      filter: payload,
    }),
    addNewChannel: (
      state: ChannelState,
      { payload }: PayloadAction<ChannelInfo>,
    ) => {
      state.list.push(payload);
      state.newChannelError = '';
      state.isCreatingChannel = false;
    },
    errorToCreateChannel: (
      state: ChannelState,
      { payload }: PayloadAction<string>,
    ) => ({
      ...state,
      newChannelError: payload,
      isCreatingChannel: false,
    }),
    creatingChannel: (state: ChannelState) => ({
      ...state,
      isCreatingChannel: true,
    }),
  },
});

export const {
  fetchingChannels,
  setChannels,
  setError,
  changeFilter,
  addNewChannel,
  errorToCreateChannel,
  creatingChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
