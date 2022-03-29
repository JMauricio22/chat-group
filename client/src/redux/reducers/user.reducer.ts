import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {} from 'react-redux';
import { User } from '@models/user.model';

const initialState: User = {} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
