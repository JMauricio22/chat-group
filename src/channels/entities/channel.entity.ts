import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './message.entity';
import { UserChannel } from './user_channel.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  name!: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  description!: string;

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

  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[];

  @OneToMany(() => UserChannel, (userChannel) => userChannel.channel)
  users: UserChannel[];
}
