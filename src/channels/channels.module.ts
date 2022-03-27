import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelsController } from './controllers/channels.controller';
import { Channel } from './entities/channel.entity';
import { Message } from './entities/message.entity';
import { ChannelService } from './services/channels.service';
import { UsersModule } from '../users/users.module';
import { ChatGateway } from './events/chat.gateway';
import { AuthModule } from '../auth/auth.module';
import { ChatService } from './services/chat.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Channel, Message]),
    AuthModule,
  ],
  controllers: [ChannelsController],
  providers: [ChannelService, ChatGateway, ChatService],
})
export class ChannelsModule {}
