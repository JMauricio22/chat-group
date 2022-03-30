import { useAppSelector } from '@hooks/useAppSelector';
import { Message } from '@models/message.models';
import { MailIcon } from '@heroicons/react/solid';

const ChatMessages = () => {
  const messages = useAppSelector((state) => state.chat.messages);

  return (
    <div className="max-h-screen overflow-hidden text-white px-4 relative">
      <div className="max-h-screen flex flex-col">
        <ul className="overflow-auto pt-16 scrollbar-thin">
          {messages.map((message: Message, index) => (
            <li key={`Message-Item-${index}`} className="flex mb-4">
              <img
                className="w-8 h-8 mr-3 rounded-md"
                src="https://ui-avatars.com/api/?name=John+Doe"
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
        <div className="h-auto w-full pb-4 pt-6 px-4 relative">
          <input
            type="text"
            className="w-full h-12 rounded-xl bg-zinc-700 focus:ring-0 outline-none"
            placeholder="Type a message here"
          />
          <button className="w-7 h-7 bg-sky-500 absolute right-8 rounded-md top-1/2 -translate-y-1/2 mt-1 flex justify-center items-center">
            <MailIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
