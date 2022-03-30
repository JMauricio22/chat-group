import type { User } from '@models/user.model';

export interface Message {
  text: string;
  createdAt: string;
  user: User;
}
