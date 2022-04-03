import type { AppDispatch } from '@redux/store';
import { logout } from '@redux/reducers/authentication.reducer';
import Cookies from 'js-cookie';

export function getToken() {
  return async function (dispatch: AppDispatch) {
    Cookies.remove('token');
    dispatch(logout());
  };
}
