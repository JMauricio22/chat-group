import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@models/user.model';

type UserState = { profile: User | null };

const initialState: UserState = { profile: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state: UserState, action: PayloadAction<User>) => ({
      profile: action.payload,
    }),
    setUserInNull: (state: UserState) => ({ profile: null }),
  },
});

export const { addUser, setUserInNull } = userSlice.actions;

export default userSlice.reducer;
