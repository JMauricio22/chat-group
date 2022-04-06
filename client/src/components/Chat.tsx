import { useState, useEffect } from 'react';
import SlideMenu from '@components/SlideMenu';
import ChatHeader from '@components/ChatHeader';
import ChatMessages from '@components/ChatMessages';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import chatConnection from '@utils/chat';
import {
  errorJoiningChannel,
  successfulReconnection,
} from '@redux/reducers/chat.reducer';
import ChatErrorOverlay from '@components/ChatErrorOverlay';
import SocketJoinRoomError from '@utils/exceptions/socket/SocketJoinRoomError';
import SocketConnectionError from '@utils/exceptions/socket/SocketConnectionError';
import { DEFAULT_CHANNEL_ID } from '@utils/chat';

const Chat = () => {
  const [slideIsOpen, setSlideIsOpen] = useState(false);
  const error = useAppSelector((state) => state.chat.error);
  const dispatch = useAppDispatch();

  const toggleSlideMenu = () => {
    setSlideIsOpen(!slideIsOpen);
  };

  useEffect(() => {
    chatConnection.connect();
    chatConnection.on<any>('exception', (data) => {
      dispatch(
        errorJoiningChannel(new SocketJoinRoomError(DEFAULT_CHANNEL_ID)),
      );
    });
    chatConnection.on<any>('disconnect', (reason) => {
      if (reason === 'transport close') {
        dispatch(errorJoiningChannel(new SocketConnectionError(reason)));
      }
    });
    chatConnection.on<any>('connect_error', (error) => {
      dispatch(errorJoiningChannel(new SocketConnectionError(error.message)));
    });
    chatConnection.on<any>('connect', () => {
      dispatch(successfulReconnection());
    });
    return () => {
      chatConnection.disconnect();
    };
  }, []);

  return (
    <>
      {error && (
        <ChatErrorOverlay
          errorHandler={chatConnection.getHandlerError(error)}
        />
      )}
      <div className={`h-screen w-full md:flex ${error ? 'blur-sm' : ''}`}>
        <SlideMenu
          isOpen={slideIsOpen}
          toggleSlideMenu={toggleSlideMenu}
          chatConnection={chatConnection}
        />
        <div className="md:flex-1 relative">
          <ChatHeader toggleSlideMenu={toggleSlideMenu} />
          <ChatMessages chatConnection={chatConnection} />
        </div>
      </div>
    </>
  );
};

export default Chat;
