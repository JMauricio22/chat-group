import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { AppDispatch } from '@redux/store';
import { retryChannelConnection } from '@redux/reducers/chat.reducer';

type Event =
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

  getHandlerError(error: any) {
    return errorHandlers[error.name];
  }
}

const chatConnection = new ChatConnection();

export default chatConnection;
