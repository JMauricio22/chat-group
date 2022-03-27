import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from '@channels/entities/message.entity';
import { User } from '@users/entities/user.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'character varying',
    nullable: false,
    unique: true,
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
    name: 'created_at',
  })
  createdAt!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: string;

  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[];

  @OneToMany(() => User, (user) => user.channel)
  users: User[];
}
