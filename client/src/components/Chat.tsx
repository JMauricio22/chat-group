import { useState, useEffect } from 'react';
import SlideMenu from '@components/SlideMenu';
import ChatHeader from '@components/ChatHeader';
import ChatMessages from '@components/ChatMessages';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { ChatConnection } from '@utils/chat';
import {
  errorJoiningChannel,
  retryChannelConnection,
  successfulReconnection,
} from '@redux/reducers/chat.reducer';
import ChatErrorOverlay from '@components/ChatErrorOverlay';

const chatConnection = new ChatConnection();

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
      dispatch(errorJoiningChannel(data.message));
    });
    chatConnection.on<any>('disconnect', (reason) => {
      if (reason === 'transport close') {
        dispatch(errorJoiningChannel(reason));
      }
    });
    chatConnection.on<any>('connect_error', (error) => {
      dispatch(errorJoiningChannel(error.message));
    });
    chatConnection.on<any>('connect', () => {
      dispatch(successfulReconnection());
    });
    return () => {
      chatConnection.disconnect();
    };
  }, []);

  const retryJoinChannel = () => {
    // chatConnection.joinRoom(1);
    chatConnection.connect();
    dispatch(retryChannelConnection());
  };

  return (
    <>
      {error && <ChatErrorOverlay retryJoinChannel={retryJoinChannel} />}
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
