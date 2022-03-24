import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Channel } from './channel.entity';

@Entity({
  name: 'user_channel',
})
export class UserChannel {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.channels)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.users)
  @JoinColumn({
    name: 'channel_id',
  })
  channel: Channel;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: string;
}
