import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelsController } from '@channels/controllers/channels.controller';
import { Channel } from '@channels/entities/channel.entity';
import { Message } from '@channels/entities/message.entity';
import { ChannelService } from '@channels/services/channels.service';
import { ChatGateway } from '@channels/events/chat.gateway';
import { ChatService } from '@channels/services/chat.service';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';

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
