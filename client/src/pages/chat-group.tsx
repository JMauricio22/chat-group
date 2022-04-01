import { useState, useEffect } from 'react';
import Loading from '@components/Loading';
import Chat from '@components/Chat';

const ChatContainer = () => {
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    if (window) {
      setIsClientSide(true);
    }
  }, []);

  if (isClientSide) {
    return <Chat />;
  }

  return (
    <div className="pt-6">
      <Loading />
    </div>
  );
};

// ChatContainer.protected = true;

export default ChatContainer;
