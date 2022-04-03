import { createContext, useContext } from 'react';
import { SignInBody } from '@models/user.model';
import { useAuth } from '@hooks/useAuth';

interface AuthContext {
  checkAuth(): boolean;
  signout(): void;
  signin(values: SignInBody): void;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

interface AuthProviderProps {
  children: JSX.Element;
}

export const useAuthProvider = () => useContext(AuthContext);

export default function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
