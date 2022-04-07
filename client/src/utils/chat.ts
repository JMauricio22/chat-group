import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { AppDispatch } from '@redux/store';
import { retryChannelConnection } from '@redux/reducers/chat.reducer';

type EventNames =
  | 'joinRoom'
  | 'sendMessage'
  | 'newUser'
  | 'userExited'
  | 'exception'
  | 'connect_error'
  | 'disconnect'
  | 'connect';

export const DEFAULT_CHANNEL_ID = 1;

export interface ErrorHandler {
  (dispatch: AppDispatch): void;
}

interface Event {
  name: string;
  handler: (...args: any[]) => void;
}

function getConnectionErrorHandler(dispatch: AppDispatch) {
  chatConnection.connect();
  dispatch(retryChannelConnection());
}

function getJoinRoomErrorHandler(dispatch: AppDispatch) {
  const channelId = window.sessionStorage.getItem('selectedChannel');
  chatConnection.joinRoom(
    channelId ? Number.parseInt(channelId) : undefined || DEFAULT_CHANNEL_ID,
  );
  dispatch(retryChannelConnection());
}

const errorHandlers: Record<string, ErrorHandler> = {
  SocketConnectionError: getConnectionErrorHandler,
  SocketJoinRoomError: getJoinRoomErrorHandler,
};

export class ChatConnection {
  socket: Socket;
  events: Event[] = [];

  constructor() {
    const token = Cookies.get('token');

    this.socket = io('ws://localhost:3300', {
      auth: {
        token,
      },
      autoConnect: false,
      reconnection: false,
    });
  }

  connect() {
    this.socket.connect();
  }

  private generateEvent(
    name: string,
    handler: (...args: any[]) => void,
  ): Event {
    return {
      name,
      handler,
    };
  }

  joinRoom(channelId: number) {
    this.socket.emit('joinRoom', { channelId });
  }

  sendMessage(channelId: number, content: string) {
    this.socket.emit('sendMessage', { channelId, content });
  }

  on<T>(event: EventNames, callback: (data: T) => void) {
    this.events.push(this.generateEvent(event, callback));
    this.socket.on(event, callback);
  }

  disconnect() {
    this.events.forEach((event) => {
      this.socket.off(event.name, event.handler);
    });
    this.events = [];
    this.socket.disconnect();
  }

  getHandlerError(error: any) {
    return errorHandlers[error.name];
  }
}

const chatConnection = new ChatConnection();

export default chatConnection;
