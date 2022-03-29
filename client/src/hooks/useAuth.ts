import { useState, useEffect } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';

export function useAuth() {
  const [isAuthenticate, setAuthenticate] = useState(false);
  const [isLogginIn, setIsLoggingIn] = useState(true);
  const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = Cookies.get('token');
      const decodeToken = isLoggedIn ? decode(token as string) : null;
      if (isLoggedIn && decodeToken) {
        setAuthenticate(true);
      } else {
        throw new Error('User is not authenticated');
      }
      setIsLoggingIn(false);
    } catch (error) {
      router.replace('/');
    }
  }, []);

  return {
    isAuthenticate,
    isLogginIn,
  };
}
