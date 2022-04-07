import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import InputWithError from '@components/InputWithError';
import { updateUser } from '@services/users.service';
import { UpdateUserDTO } from '@models/user.model';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import {
  addUser,
  errorGettingUser,
  fetchingUser,
} from '@redux/reducers/user.reducer';
import Loading from '@components/Loading';
import Alert from './Alert';

const fields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter your name...',
    type: 'text',
  },
  {
    name: 'bio',
    label: 'Bio',
    placeholder: 'Enter your bio...',
    type: 'text',
    displayTextArea: true,
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: 'Enter your phone...',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email...',
    type: 'text',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password...',
    type: 'password',
  },
];

const validationSchema = yup.object().shape({
  name: yup.string(),
  bio: yup.string(),
  phone: yup.string(),
  email: yup.string().email(),
  password: yup.string().min(6),
});

const EditProfileForm = () => {
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  const dispatch = useAppDispatch();
  const form = useFormik({
    initialValues: {
      name: '',
      bio: '',
      phone: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values: UpdateUserDTO) => {
      try {
        const body: Record<string, string> = {};
        Object.entries(values).forEach((data: [field: string, value: any]) => {
          const [field, value] = data;
          if (value) {
            body[field] = value;
          }
        });
        if (Object.keys(body).length === 0) {
          return;
        }
        dispatch(fetchingUser());
        const { data } = await updateUser(body);
        dispatch(addUser(data));
        form.resetForm();
      } catch (error: any) {
        let errorMessage = `An error occurred while updating the user`;
        if (error.response) {
          const responseError = error as AxiosError;
          if (responseError.response?.status === 409) {
            errorMessage = `user with email ${form.values.email} alredy exists`;
          }
        }
        dispatch(errorGettingUser(errorMessage));
      }
    },
  });

  useEffect(() => {
    return () => {
      dispatch(errorGettingUser(''));
    };
  }, []);

  return (
    <div className="md:px-8 pb-10">
      {error && <Alert message={error} />}
      <form onSubmit={form.handleSubmit}>
        {fields.map((field) => (
          <div className="mb-3 max-w-sm" key={`form-item-${field.name}`}>
            <InputWithError
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              displayTextArea={field.displayTextArea}
              {...form.getFieldProps(field.name)}
              hasError={
                !!(form.errors as any)[field.name] &&
                (form.touched as any)[field.name]
              }
              errorMessage={(form.errors as any)[field.name]}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 mt-4 p-1 rounded-md w-auto px-3"
        >
          {loading ? <Loading /> : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
