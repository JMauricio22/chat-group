export interface User {
  id: number;
  email: string;
  name: string;
  bio: string;
  phone: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {
  password: string;
  repeatedPassword: string;
}

export interface UpdateUserDTO
  extends Partial<Omit<CreateUserDTO, 'repeatedPassword'>> {}

export interface SignInBody {
  username: string;
  password: string;
}
