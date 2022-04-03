import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@redux/store';
import PrivateRoute from '@components/PrivateRoute';
import AuthProvider from '@components/AuthProvider';
import '@styles/globals.css';
import '@interceptors/axios.interceptor';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {(Component as any).protected ? (
          <PrivateRoute>
            <Component {...pageProps} />
          </PrivateRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
