import { AxiosResponse } from 'axios';
import { fetch } from '@services/config';
import { User } from '@models/user.model';
import { CreateUserDTO, SignInBody, UpdateUserDTO } from '@models/user.model';

export const registerUser = async (body: CreateUserDTO) => {
  const response: AxiosResponse = await fetch.post('/users/register', body);
  return response;
};

export const updateUser = async (
  body: UpdateUserDTO,
): Promise<AxiosResponse<User>> => {
  const response: AxiosResponse = await fetch.put('/users', body);
  return response;
};

export const sigin = async (
  body: SignInBody,
): Promise<{ access_token: string; user: User }> => {
  const response: AxiosResponse = await fetch.post('/auth/login', body);
  return response.data;
};

export const getProfile = async () => {
  const response: AxiosResponse = await fetch.get('/users/profile');
  return response.data;
};
