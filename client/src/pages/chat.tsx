import { useState, useEffect } from 'react';
import SlideMenu from '@components/SlideMenu';
import ChatHeader from '@components/ChatHeader';
import ChatMessages from '@components/ChatMessages';
import Loading from '@components/Loading';

const Chat = () => {
  const [isClientSide, setIsClientSide] = useState(false);
  const [slideIsOpen, setSlideIsOpen] = useState(false);

  const toggleSlideMenu = () => {
    setSlideIsOpen(!slideIsOpen);
  };

  useEffect(() => {
    if (window) {
      setIsClientSide(true);
    }
  }, []);

  if (!isClientSide) {
    return <Loading />;
  }

  return (
    <div className="h-screen w-full md:flex">
      <SlideMenu isOpen={slideIsOpen} toggleSlideMenu={toggleSlideMenu} />
      <div className="md:flex-1 relative">
        <ChatHeader toggleSlideMenu={toggleSlideMenu} />
        <ChatMessages />
      </div>
    </div>
  );
};

// Chat.protected = true;

export default Chat;
