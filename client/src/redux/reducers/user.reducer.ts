import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@models/user.model';

type UserState = {
  loading: boolean;
  profile: User | null;
  error: string | null;
};

const initialState: UserState = { loading: false, profile: null, error: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchingUser: (state: UserState) => ({
      loading: true,
      profile: null,
      error: null,
    }),
    addUser: (state: UserState, action: PayloadAction<User>) => ({
      loading: false,
      profile: action.payload,
      error: null,
    }),
    setUserInNull: (state: UserState) => ({
      loading: false,
      profile: null,
      error: null,
    }),
  },
});

export const { addUser, setUserInNull, fetchingUser } = userSlice.actions;

export default userSlice.reducer;
