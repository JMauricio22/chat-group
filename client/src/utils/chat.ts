import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

type Event =
  | 'joinRoom'
  | 'sendMessage'
  | 'newUser'
  | 'userExited'
  | 'exception';

export class ChatConnection {
  socket: Socket;

  constructor() {
    const token = Cookies.get('token');

    this.socket = io('ws://localhost:3300', {
      auth: {
        token,
      },
    });
  }

  joinRoom(channelId: number) {
    this.socket.emit('joinRoom', { channelId });
  }

  sendMessage(channelId: number, content: string) {
    this.socket.emit('sendMessage', { channelId, content });
  }

  on<T>(event: Event, callback: (data: T) => void) {
    this.socket.on(event, callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
