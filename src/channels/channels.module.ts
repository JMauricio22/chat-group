import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelsController } from './controllers/channels.controller';
import { Channel } from './entities/channel.entity';
import { Message } from './entities/message.entity';
import { UserChannel } from './entities/user_channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, Message, UserChannel])],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
