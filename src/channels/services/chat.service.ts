import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '@users/entities/user.entity';
import { Channel } from '@channels/entities/channel.entity';
import { Message } from '@channels/entities/message.entity';
import { UsersService } from '@users/services/users.service';
import { ChannelService } from '@channels/services/channels.service';

const MESSAGE_LIMIT = 10;

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
      const newUser = plainToClass(User, user);
      return newUser;
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
      const newMessage = plainToClass(Message, message);
      return newMessage;
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  async joinUserToChannel(id: number, user: User): Promise<Channel> {
    let channel = await this.channelService.getResolvedChannels(id);
    if (channel.users.findIndex((u: User) => u.id === user.id) === -1) {
      channel.users.push(user);
      channel = await this.channelService.saveChannel(channel);
    }
    const newChannel = plainToClass(Channel, channel);
    return newChannel;
  }

  async removeUserFromChannel(user: User): Promise<void> {
    await this.userService.setChannelToNull(user);
  }
}
