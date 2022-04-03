import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AuthenticationState {
  isLoggedIn: boolean;
  error: string | null;
  loading: boolean;
}

const initialState: AuthenticationState = {
  isLoggedIn: true,
  error: null,
  loading: false,
};

export const authenticationSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    authenticate: (
      state: AuthenticationState,
      action: PayloadAction<void>,
    ) => ({ isLoggedIn: true, error: null, loading: false }),
    unauthorized: (
      state: AuthenticationState,
      action: PayloadAction<string>,
    ) => ({ isLoggedIn: false, error: action.payload, loading: false }),
    logginIn: (state: AuthenticationState, action: PayloadAction<void>) => ({
      isLoggedIn: false,
      error: null,
      loading: true,
    }),
  },
});

export const { authenticate, unauthorized, logginIn } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
