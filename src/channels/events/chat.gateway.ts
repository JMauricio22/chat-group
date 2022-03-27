import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  WsResponse,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Channel } from '@channels/entities/channel.entity';
import { ChatService } from '@channels/services/chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  async handleDisconnect(socket: Socket) {
    const user = await this.chatService.getUserFromToken(socket);
    await this.chatService.removeUserFromChannel(user);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: any,
  ) {
    const user = await this.chatService.getUserFromToken(socket);
    const message = await this.chatService.saveMessage(
      user,
      body.channelId,
      body.content,
    );
    this.server.to(body.channelId).emit('sendMessage', message);
  }

  @SubscribeMessage('joinRoom')
  async joinToChannel(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: any,
  ): Promise<WsResponse<Channel>> {
    const user = await this.chatService.getUserFromToken(socket);
    const channel = await this.chatService.joinUserToChannel(
      body.channelId,
      user,
    );
    socket.join(channel.id.toString());
    socket.broadcast.to(channel.id.toString()).emit('newUser', user);
    return {
      event: 'joinRoom',
      data: channel,
    };
  }
}
