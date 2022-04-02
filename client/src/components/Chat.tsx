import { useState, useEffect } from 'react';
import SlideMenu from '@components/SlideMenu';
import ChatHeader from '@components/ChatHeader';
import ChatMessages from '@components/ChatMessages';
import { ChatConnection } from '@utils/chat';

const chatConnection = new ChatConnection();

const Chat = () => {
  const [slideIsOpen, setSlideIsOpen] = useState(false);

  const toggleSlideMenu = () => {
    setSlideIsOpen(!slideIsOpen);
  };

  useEffect(() => {
    chatConnection.on<any>('exception', (data) => {
      console.log('socket exception:', data);
    });
    return () => {
      chatConnection.disconnect();
    };
  }, []);

  return (
    <div className="h-screen w-full md:flex">
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
  );
};

export default Chat;
