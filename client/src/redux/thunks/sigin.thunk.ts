import type { AppDispatch, RootState } from '@redux/store';
import { SignInBody } from '@models/user.model';
import { sigin } from '@services/users.service';
import { AxiosError } from 'axios';
import {
  authenticate,
  unauthorized,
  logginIn,
} from '@redux/reducers/authentication.reducer';
import { addUser } from '@redux/reducers/user.reducer';
import Cookies from 'js-cookie';

export function getToken(body: SignInBody) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    try {
      dispatch(logginIn());
      const { access_token, user } = await sigin(body);
      Cookies.set('token', access_token);
      dispatch(authenticate());
      if (!getState().user.profile) {
        dispatch(addUser(user));
      }
    } catch (error: any) {
      let errorMessage = 'An error occurred when logging in';
      if (error.response) {
        if ((error as AxiosError).response?.status === 401) {
          errorMessage = 'Bad credentials. Please login';
        }
      }
      dispatch(unauthorized(errorMessage));
    }
  };
}
