import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChannel } from '@channels/dtos/channel.dtos';
import { Channel } from '@channels/entities/channel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
  ) {}

  async find(): Promise<Channel[]> {
    const channels = await this.channelRepository.find({
      relations: ['users', 'messages'],
    });
    return channels;
  }

  async getResolvedChannels(id: number): Promise<Channel> {
    const channel = await this.channelRepository.findOne(id, {
      relations: ['users', 'messages', 'messages.user'],
    });

    return channel;
  }

  async create(body: CreateChannel) {
    const newChannel = await this.channelRepository.save(
      this.channelRepository.create(body),
    );
    return newChannel;
  }

  async getChannelById(id: string) {
    const channel = await this.channelRepository.findOne(id);
    if (!channel) {
      throw new NotFoundException(`Don´t exist channel with id ${id}`);
    }
    return channel;
  }

  async saveChannel(channel: Channel): Promise<Channel> {
    const newChannel = await this.channelRepository.save(channel);
    return newChannel;
  }
}
