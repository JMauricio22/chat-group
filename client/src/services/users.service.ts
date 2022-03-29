import { AxiosResponse } from 'axios';
import { fetch } from '@services/config';
import { CreateUserDTO, SignInBody } from '@models/user.model';

export const registerUser = async (body: CreateUserDTO) => {
  const response: AxiosResponse = await fetch.post('/auth/register', body);
  return response;
};

export const sigin = async (body: SignInBody) => {
  const response: AxiosResponse = await fetch.post('/auth/login', body);
  return response.data.access_token;
};
