import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@users/entities/user.entity';
import { Channel } from '@channels/entities/channel.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  text!: string;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'channel_id',
  })
  channel: Channel;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: string;

  @Exclude()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: string;
}
