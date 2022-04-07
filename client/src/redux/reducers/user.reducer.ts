import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@models/user.model';

type UserState = {
  loading: boolean;
  profile: User | null;
  error: string;
};

const initialState: UserState = { loading: false, profile: null, error: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchingUser: (state: UserState) => ({
      ...state,
      error: '',
      loading: true,
    }),
    addUser: (state: UserState, { payload }: PayloadAction<User>) => ({
      ...initialState,
      profile: payload,
    }),
    setUserInNull: (state: UserState) => ({
      ...initialState,
    }),
    errorGettingUser: (
      state: UserState,
      { payload }: PayloadAction<string>,
    ) => ({
      ...state,
      error: payload,
      loading: false,
    }),
  },
});

export const { addUser, setUserInNull, fetchingUser, errorGettingUser } =
  userSlice.actions;

export default userSlice.reducer;
