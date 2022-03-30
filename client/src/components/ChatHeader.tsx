import { MenuIcon } from '@heroicons/react/solid';
import { useAppSelector } from '@hooks/useAppSelector';

type ChatHeaderProps = {
  toggleSlideMenu(): void;
};

const ChatHeader = ({ toggleSlideMenu }: ChatHeaderProps) => {
  const name = useAppSelector((state) => state.chat.name);

  return (
    <div className="w-full py-4 px-4 flex items-center text-white shadow-xl absolute left-0 top-0 z-10 bg-primary">
      <MenuIcon
        className="w-6 h-6 mr-4 cursor-pointer md:hidden"
        onClick={toggleSlideMenu}
      />
      <span className="uppercase font-bold">{name}</span>
    </div>
  );
};

export default ChatHeader;
