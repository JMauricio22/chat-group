import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { MailIcon, LockClosedIcon } from '@heroicons/react/solid';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { getToken } from '@redux/thunks/sigin.thunk';
import { SignInBody } from '@models/user.model';
import Loading from '@components/Loading';
import Alert from '@components/Alert';

const SigninSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
  const loading = useAppSelector((state) => state.authentication.loading);
  const error = useAppSelector((state) => state.authentication.error);
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values: SignInBody) => {
      dispatch(getToken(values));
    },
    validationSchema: SigninSchema,
  });
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/profile');
    }
  }, [isLoggedIn]);

  return (
    <div className="h-screen w-100 flex justify-center items-center bg-primary">
      <div className="w-80 p-2 md:rounded-2xl md:w-96 md:px-8 md:py-4 md:shadow-2xl md:bg-black/10">
        <h1 className="text-2xl text-center font-bold mb-5 text-white">
          Login
        </h1>
        {error && <Alert message={error} />}
        <form onSubmit={form.handleSubmit}>
          <div className="w-full h-9 mb-3 relative">
            <MailIcon className="w-5 h-5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              className="w-full h-full text-gray-400 pl-8 bg-transparent ring-1 outline-none border-0 focus:ring-2 focus:ring-indigo-700 ring-gray-300 rounded-md"
              type="text"
              placeholder="Email"
              {...form.getFieldProps('username')}
            />
          </div>
          <div className="w-full h-9 mb-3 relative">
            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              className="w-full h-full text-gray-400 pl-8 bg-transparent ring-1 outline-none border-0 focus:ring-2 focus:ring-indigo-700 ring-gray-300 rounded-md"
              type="password"
              placeholder="Password"
              {...form.getFieldProps('password')}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading || !form.isValid}
              className="bg-blue-500 disabled:bg-blue-500 hover:bg-blue-600 px-2 py-1 w-full text-white rounded-md font-semibold"
            >
              {loading ? <Loading text="Logging In..." /> : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-center text-md">
            <span className="text-gray-200 font-thin">
              Don't have an account yet?
            </span>{' '}
            <Link href="/register">
              <a className="text-blue-400 hover:underline">Register</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
