import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@models/user.model';
import { Message } from '@models/message.models';
import { Channel } from '@models/channel.model';

interface ChatState {
  id: number | undefined;
  loading: boolean;
  name: string;
  description: string;
  messages: Message[];
  users: User[];
  error: string;
}

const initialState: ChatState = {
  id: undefined,
  loading: false,
  messages: [],
  users: [],
  error: '',
  name: '',
  description: '',
};

const messageSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    joimRoom: (state: ChatState, { payload }: PayloadAction<Channel>) => ({
      id: payload.id,
      loading: false,
      name: payload.name,
      description: payload.description,
      messages: payload.messages,
      users: payload.users,
      error: '',
    }),
    addNewUser: (state: ChatState, { payload }: PayloadAction<User>) => {
      state.users.push(payload);
    },
    addNewMessage: (state: ChatState, { payload }: PayloadAction<Message>) => {
      state.messages.push(payload);
    },
    userExited: (state: ChatState, { payload }: PayloadAction<User>) => {
      const index = state.users.findIndex((user) => user.id === payload.id);

      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },
    errorJoiningChannel: (
      state: ChatState,
      { payload }: PayloadAction<string>,
    ) => ({
      ...state,
      error: payload,
      loading: false,
    }),
    retryChannelConnection: (state: ChatState) => {
      state.loading = true;
    },
    successfulReconnection: (state: ChatState) => {
      if (state.error) {
        state.loading = false;
        state.error = '';
      }
    },
  },
});

export const {
  joimRoom,
  addNewUser,
  addNewMessage,
  userExited,
  errorJoiningChannel,
  retryChannelConnection,
  successfulReconnection,
} = messageSlice.actions;

export default messageSlice.reducer;
