import { useAuth } from '@hooks/useAuth';
import Loading from './Loading';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = useAuth();

  if (auth.isLogginIn) {
    return (
      <div className="w-full mt-6">
        <Loading text="Loading..." />
      </div>
    );
  }

  if (!auth.isLogginIn && auth.isAuthenticate) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateRoute;
