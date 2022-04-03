import { useEffect, useState } from 'react';
import { useAuthProvider } from '@components/AuthProvider';
import Loading from '@components/Loading';
import { useRouter } from 'next/router';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = useAuthProvider();
  const router = useRouter();

  useEffect(() => {
    if (auth.checkAuth()) {
      setLoading(false);
      setIsAuthenticated(true);
    } else {
      router.replace('/');
    }
  }, []);

  if (!loading && isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="w-full mt-6">
      <Loading text="Loading..." />
    </div>
  );
};

export default PrivateRoute;
