import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@redux/reducers/user.reducer';
import authenticationReducer from '@redux/reducers/authentication.reducer';
import channelReducer from '@redux/reducers/channels.reducer';
import chatReducer from '@redux/reducers/chat.reducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    authentication: authenticationReducer,
    channels: channelReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
