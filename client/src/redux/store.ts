import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@redux/reducers/user.reducer';
import authenticationReducer from '@redux/reducers/authentication.reducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    authentication: authenticationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
