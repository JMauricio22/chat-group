import { AppDispatch, RootState } from '@redux/store';
import { getProfile } from '@services/users.service';
import { addUser, setUserInNull } from '@redux/reducers/user.reducer';

export async function getUserProfile(dispatch: AppDispatch) {
  try {
    const user = await getProfile();
    dispatch(addUser(user));
  } catch (error) {
    dispatch(setUserInNull());
  }
}
