import { useRef, useEffect } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { Message } from '@models/message.models';
import { MailIcon } from '@heroicons/react/solid';
import { ChatConnection } from '@utils/chat';
import { addNewMessage } from '@redux/reducers/chat.reducer';

type ChatMessagesProps = {
  chatConnection: ChatConnection;
};

const ChatMessages = ({ chatConnection }: ChatMessagesProps) => {
  const channelId = useAppSelector((state) => state.chat.id);
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);
  const messageInput = useRef(null);
  const ulElement = useRef(null);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      messageInput.current &&
      (messageInput.current as HTMLInputElement).value
    ) {
      chatConnection.sendMessage(
        channelId,
        (messageInput.current as HTMLInputElement).value,
      );
      (messageInput.current as HTMLInputElement).value = '';
    }
  };

  useEffect(() => {
    if (!ulElement.current) {
      return;
    }
    const ul = ulElement.current as HTMLUListElement;
    if (ul.clientHeight + ul.scrollTop >= ul.scrollHeight - 100) {
      ul.scrollTop = ul.clientHeight + ul.scrollTop;
    }
  }, [messages]);

  useEffect(() => {
    chatConnection.on<Message>('sendMessage', (data) => {
      dispatch(addNewMessage(data));
    });
  }, []);

  return (
    <div className="max-h-screen overflow-hidden h-screen text-white px-4 relative">
      <div className="max-h-screen h-full flex flex-col relative">
        <ul
          className="overflow-auto pt-16 scrollbar-thin flex-1"
          ref={ulElement}
        >
          {messages.map((message: Message, index) => (
            <li key={`Message-Item-${index}`} className="flex mb-4">
              <img
                className="w-8 h-8 mr-3 rounded-md"
                src={`https://ui-avatars.com/api/?name=${message.user.name}`}
              />
              <div>
                <div className="text-zinc-400 mb-2 flex items-center">
                  <div className="mr-4 text-lg font-bold ">
                    {message.user.name}
                  </div>
                  <div className="text-sm font-thin">today at 1:29 PM</div>
                </div>
                <div>{message.text}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="h-20"></div>
        <div className="h-auto w-full pb-4 pt-6 px-4 absolute left-0 bottom-0">
          <input
            type="text"
            className="w-full h-12 rounded-xl bg-zinc-700 focus:ring-0 outline-none"
            placeholder="Type a message here"
            ref={messageInput}
          />
          <form onSubmit={sendMessage}>
            <button
              type="submit"
              className="w-7 h-7 bg-sky-500 absolute right-8 rounded-md top-1/2 -translate-y-1/2 mt-1 flex justify-center items-center"
            >
              <MailIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
