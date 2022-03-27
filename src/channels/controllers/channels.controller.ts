import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  UseFilters,
} from '@nestjs/common';
import { CreateChannel } from '@channels/dtos/channel.dtos';
import { ChannelService } from '@channels/services/channels.service';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';
import { QueryException } from '@common/filters/QueryException';

@Controller('channels')
export class ChannelsController {
  constructor(private channelService: ChannelService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async find() {
    const channels = await this.channelService.find();
    return channels;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryException)
  async create(@Body() body: CreateChannel) {
    const newChannel = await this.channelService.create(body);
    return newChannel;
  }
}
