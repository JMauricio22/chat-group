import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Message } from '@channels/entities/message.entity';
import { Channel } from '@channels/entities/channel.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'character varying',
    nullable: false,
    unique: true,
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
    name: 'created_at',
  })
  createdAt!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @ManyToOne(() => Channel, (channel) => channel.users, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'channel_id',
  })
  channel: Channel;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
