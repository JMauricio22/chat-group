import type { NextPage } from 'next';
import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import RegisterForm from '@components/RegisterForm';

const Register: NextPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-primary">
      <Transition
        show
        appear
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        as={Fragment}
      >
        <div className="w-80 p-2 md:rounded-2xl md:w-110 md:px-12 md:py-8 md:shadow-2xl md:bg-black/20 mb-24 mt-10">
          <h1 className="text-2xl text-left font-bold mb-4 text-white">
            Register
          </h1>
          <RegisterForm />
          <div className="mt-6">
            <p className="text-center text-md">
              <span className="text-gray-200 font-thin">
                Are you alredy registered?
              </span>{' '}
              <Link href="/">
                <a className="text-blue-400 hover:underline">Login</a>
              </Link>
            </p>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Register;
