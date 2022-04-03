import { useEffect, useState, Fragment } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { getChannels } from '@redux/thunks/getChannels';
import { useIsTablet } from '@hooks/useIsTablet';
import CreateChannelDialog from '@components/CreateChannelDialog';
import ChannelList from '@components/ChannelList';
import { joimRoom, addNewUser, userExited } from '@redux/reducers/chat.reducer';
import { Channel } from '@models/channel.model';
import { User } from '@models/user.model';
import { ChatConnection } from '@utils/chat';
import UserList from './UserList';
import UserMenu from './UserMenu';

type SlideMenuProps = {
  isOpen: boolean;
  toggleSlideMenu(): void;
  chatConnection: ChatConnection;
};

const WELCOME_CHANNEL_ID = 4;

const SlideMenu = ({
  isOpen,
  toggleSlideMenu,
  chatConnection,
}: SlideMenuProps) => {
  const currentChannel = useAppSelector((state) => state.chat.id);
  const [isChannelDialogOpen, setIsChannelDialogOpen] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const isTabletOrDesktop = useIsTablet();
  const dispatch = useAppDispatch();

  const closeChannelDialog = () => {
    setIsChannelDialogOpen(false);
  };

  const openChannelDialog = () => {
    setIsChannelDialogOpen(true);
  };

  useEffect(() => {
    chatConnection.joinRoom(WELCOME_CHANNEL_ID);
    chatConnection.on<Channel>('joinRoom', (data) => {
      dispatch(joimRoom(data));
      setShowUserList(true);
    });
    chatConnection.on<User>('newUser', (data) => {
      dispatch(addNewUser(data));
    });
    chatConnection.on<User>('userExited', (data) => {
      dispatch(userExited(data));
    });
  }, []);

  useEffect(() => {
    dispatch(getChannels);
  }, []);

  const joinChannel = (channelId: number) => {
    if (currentChannel !== channelId) {
      chatConnection.joinRoom(channelId);
    }
    setShowUserList(true);
  };

  return (
    <>
      <CreateChannelDialog
        isOpen={isChannelDialogOpen}
        closeModal={closeChannelDialog}
      />
      <Transition
        show={isOpen || isTabletOrDesktop}
        unmount={false}
        enter="transition-transform duration-500"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-500"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        as={Fragment}
      >
        <div
          className={`bg-secondary w-4/5 max-h-screen h-screen py-4 px-6 fixed left-0 top-0 z-40 md:relative md:w-60`}
        >
          <button
            onClick={toggleSlideMenu}
            className="absolute -right-10 top-2 bg-black p-2 rounded-md md:hidden"
          >
            <XIcon className="w-4 h-4 text-white" />
          </button>
          {showUserList ? (
            <UserList setShowUserList={setShowUserList} />
          ) : (
            <ChannelList
              openChannelDialog={openChannelDialog}
              joinChannel={joinChannel}
            />
          )}
          <UserMenu top={true} />
        </div>
      </Transition>
    </>
  );
};

export default SlideMenu;
