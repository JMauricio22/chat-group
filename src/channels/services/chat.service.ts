import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Channel } from '../entities/channel.entity';
import { Message } from '../entities/message.entity';
import { UsersService } from 'src/users/services/users.service';
import { ChannelService } from '../services/channels.service';

const MESSAGE_LIMIT = 1;

@Injectable()
export class ChatService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private channelService: ChannelService,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async getUserFromToken(socket: Socket): Promise<User> {
    try {
      const token = socket.handshake.auth.token;
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new WsException('Invalid token');
      }
      return user;
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  async saveMessage(
    user: User,
    channelId: number,
    content: string,
  ): Promise<Message> {
    try {
      const channel = await this.channelService.getChannelById(
        channelId.toString(),
      );

      const message = await this.messageRepository.save(
        this.messageRepository.create({
          user,
          channel,
          text: content,
        }),
      );

      return message;
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  async joinUserToChannel(id: number, user: User): Promise<Channel> {
    let channel = await this.channelService.getChannelWithUsers(id);
    if (channel.users.findIndex((u: User) => u.id === user.id) === -1) {
      channel.users.push(user);
      channel = await this.channelService.saveChannel(channel);
    }
    const messages = await this.messageRepository.find({
      where: {
        channel: channel,
      },
      take: MESSAGE_LIMIT,
      order: {
        createdAt: 'DESC',
      },
    });
    channel.messages = messages;
    return channel;
  }

  async removeUserFromChannel(user: User): Promise<void> {
    await this.userService.setChannelToNull(user);
  }
}
