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
import { Exclude } from 'class-transformer';
import { Message } from '../../channels/entities/message.entity';
import { Channel } from '../../channels/entities/channel.entity';

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

  @Exclude()
  @Column({
    type: 'character varying',
    nullable: false,
  })
  password!: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  name!: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  phone!: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  bio!: string;

  @Exclude()
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
