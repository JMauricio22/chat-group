import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Message } from '../../channels/entities/message.entity';
import { UserChannel } from '../../channels/entities/user_channel.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  email!: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  password!: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  firstName!: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  lastName!: string;

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

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => UserChannel, (userChannel) => userChannel.user)
  channels: UserChannel[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
