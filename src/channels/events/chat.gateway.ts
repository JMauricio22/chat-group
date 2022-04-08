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
import { User } from '@users/entities/user.entity';

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

  async removeRooms(socket: Socket, user: User) {
    for (const value of socket.rooms) {
      if (socket.id !== value) {
        socket.broadcast.to(value).emit('userExited', user);
        await socket.leave(value);
      }
    }
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
    message.user = user;
    this.server.to(body.channelId.toString()).emit('sendMessage', message);
  }
  @SubscribeMessage('userExited')
  async userExited(@ConnectedSocket() socket: Socket) {
    const user = await this.chatService.getUserFromToken(socket);
    socket.rooms.forEach((room) => {
      socket.broadcast.to(room).emit('userExited', user);
    });
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
    await this.removeRooms(socket, user);
    socket.join(channel.id.toString());
    socket.broadcast.to(channel.id.toString()).emit('newUser', user);
    return {
      event: 'joinRoom',
      data: channel,
    };
  }
}
