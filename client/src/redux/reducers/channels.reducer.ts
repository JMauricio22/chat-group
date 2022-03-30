import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChannelInfo } from '@models/channel.model';

interface ChannelState {
  list: ChannelInfo[];
  loading: boolean;
  error: string;
}

const initialState: ChannelState = {
  list: [],
  loading: false,
  error: '',
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    fetchingChannels: (state: ChannelState) => ({
      list: [],
      loading: true,
      error: '',
    }),
    setChannels: (
      state: ChannelState,
      action: PayloadAction<ChannelInfo[]>,
    ) => ({
      list: action.payload,
      loading: false,
      error: '',
    }),
    setError: (state: ChannelState, action: PayloadAction<string>) => ({
      list: state.list,
      loading: false,
      error: action.payload,
    }),
  },
});

export const { fetchingChannels, setChannels, setError } = channelSlice.actions;

export default channelSlice.reducer;
