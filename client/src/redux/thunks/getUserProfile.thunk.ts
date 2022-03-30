import { AppDispatch } from '@redux/store';
import { AxiosError } from 'axios';
import { getProfile } from '@services/users.service';
import {
  addUser,
  setUserInNull,
  fetchingUser,
} from '@redux/reducers/user.reducer';
import { unauthorized } from '@redux/reducers/authentication.reducer';

export async function getUserProfile(dispatch: AppDispatch) {
  try {
    dispatch(fetchingUser());
    const user = await getProfile();
    dispatch(addUser(user));
  } catch (error) {
    if ((error as AxiosError).response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        dispatch(unauthorized(''));
      }
    }
    dispatch(setUserInNull());
  }
}
