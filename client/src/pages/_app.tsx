import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@redux/store';
import PrivateRoute from '@components/PrivateRoute';
import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {(Component as any).protected ? (
        <PrivateRoute>
          <Component {...pageProps} />
        </PrivateRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}

export default MyApp;
