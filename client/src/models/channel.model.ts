import type { User } from '@models/user.model';
import type { Message } from '@models/message.models';

export interface ChannelInfo {
  id: number;
  name: string;
  description: string;
}

export interface Channel extends ChannelInfo {
  users: User[];
  messages: Message[];
}
