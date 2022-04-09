import type { User } from '@models/user.model';

export interface Message {
  id: number;
  text: string;
  createdAt: string;
  user: User;
}
