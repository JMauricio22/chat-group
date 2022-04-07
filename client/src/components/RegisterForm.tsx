import { useFormik } from 'formik';
import { useState } from 'react';
import { AxiosError } from 'axios';
import * as yup from 'yup';
import InputWithError from '../components/InputWithError';
import { registerUser } from '@services/users.service';
import { useRouter } from 'next/router';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import Loading from './Loading';

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().min(5).required(),
  bio: yup.string().required(),
  phone: yup.string().required(),
  password: yup.string().min(6).required(),
  repeatedPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
});

interface Fields {
  label: string;
  name: string;
  type: string;
  displayTextArea?: boolean;
}

const fields: Fields[] = [
  {
    label: 'Email',
    type: 'text',
    name: 'email',
  },
  {
    label: 'Name',
    type: 'text',
    name: 'name',
  },
  {
    label: 'Bio',
    type: 'text',
    name: 'bio',
    displayTextArea: true,
  },
  {
    label: 'Phone',
    type: 'text',
    name: 'phone',
  },
  {
    label: 'Password',
    type: 'password',
    name: 'password',
  },
  {
    label: 'Confirm Password',
    type: 'password',
    name: 'repeatedPassword',
  },
];
const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useFormik({
    initialValues: {
      email: '',
      name: '',
      bio: '',
      phone: '',
      password: '',
      repeatedPassword: '',
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await registerUser(values);
        router.push('/');
      } catch (error: any) {
        let errorMessage = `An error occurred while registering the user`;
        if (error.response) {
          const responseError = error as AxiosError;
          if (responseError.response?.status === 409) {
            errorMessage = `user with email ${form.values.email} alredy exists`;
          }
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: registerSchema,
  });

  return (
    <div>
      {error && (
        <div className="text-red-400 text-sm mb-4 flex justify-center items-center">
          <ExclamationCircleIcon className="w-5 h-5 mr-1" />
          {error}
        </div>
      )}
      <form onSubmit={form.handleSubmit}>
        {fields.map((item: Fields) => (
          <div className="w-full mb-3" key={`form-input-${item.name}`}>
            <InputWithError
              label={item.label}
              type={item.type}
              placeholder={`${item.label}...`}
              displayTextArea={item.displayTextArea}
              hasError={
                !!(form.errors as any)[item.name] &&
                (form.touched as any)[item.name]
              }
              errorMessage={(form.errors as any)[item.name]}
              {...form.getFieldProps(item.name)}
            />
          </div>
        ))}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 h-8 w-full flex justify-center items-center bg-blue-500 disabled:bg-blue-500 hover:bg-blue-600 px-2 py-2 md:w-36 text-white rounded-md font-semibold"
          >
            {loading ? <Loading text="Processing..." /> : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
