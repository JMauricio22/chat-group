import { useAppSelector } from '@hooks/useAppSelector';
import Cookies from 'js-cookie';
import { logout } from '@redux/reducers/authentication.reducer';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { isValidToken } from '@utils/checkToken';
import { getToken } from '@redux/thunks/sigin.thunk';
import { SignInBody } from '@models/user.model';
import { useRouter } from 'next/router';

export function useAuth() {
  const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const checkAuth = (): boolean => {
    try {
      if (!isLoggedIn) {
        return false;
      }
      const token = Cookies.get('token');
      return isValidToken(token || '');
    } catch (error) {
      return false;
    }
  };

  const signin = (values: SignInBody) => {
    dispatch(getToken(values));
  };

  const signout = () => {
    dispatch(logout());
    router.replace('/');
  };

  return {
    checkAuth,
    signout,
    signin,
  };
}
