import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChannelInfo } from '@models/channel.model';

interface ChannelState {
  list: ChannelInfo[];
  loading: boolean;
  error: string;
  filter: string;
}

const initialState: ChannelState = {
  list: [],
  loading: false,
  error: '',
  filter: '',
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchingChannels: (state: ChannelState) => ({
      list: [],
      loading: true,
      error: '',
      filter: '',
    }),
    setChannels: (
      state: ChannelState,
      { payload }: PayloadAction<ChannelInfo[]>,
    ) => ({
      list: payload,
      loading: false,
      error: '',
      filter: '',
    }),
    setError: (state: ChannelState, { payload }: PayloadAction<string>) => ({
      list: state.list,
      loading: false,
      error: payload,
      filter: '',
    }),
    changeFilter: (
      state: ChannelState,
      { payload }: PayloadAction<string>,
    ) => ({
      ...state,
      filter: payload,
    }),
  },
});

export const { fetchingChannels, setChannels, setError, changeFilter } =
  channelSlice.actions;

export default channelSlice.reducer;
