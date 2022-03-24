import { Module } from '@nestjs/common';
import { ChannelsController } from './controllers/channels.controller';

@Module({
  controllers: [ChannelsController],
})
export class ChannelsModule {}
