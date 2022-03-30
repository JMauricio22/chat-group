import { useEffect, Fragment } from 'react';
import { PlusIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { getChannels } from '@redux/thunks/getChannels';
import Loading from '@components/Loading';
import { useIsTablet } from '@hooks/useIsTablet';

type SlideMenuProps = {
  isOpen: boolean;
  toggleSlideMenu(): void;
};

const SlideMenu = ({ isOpen, toggleSlideMenu }: SlideMenuProps) => {
  const loading = useAppSelector((state) => state.channels.loading);
  const channels = useAppSelector((state) => state.channels.list);
  const isTabletOrDesktop = useIsTablet();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChannels);
  }, []);

  const Menu = () => (
    <>
      <button
        onClick={toggleSlideMenu}
        className="absolute -right-10 top-2 bg-black p-2 rounded-md md:hidden"
      >
        <XIcon className="w-4 h-4 text-white" />
      </button>
      <div className="flex justify-between mb-8">
        <span className="text-white font-bold text-lg">Channels</span>
        <button className="bg-gray-800 p-1 rounded-md">
          <PlusIcon className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="mb-8">
        <div className="relative">
          <SearchIcon className="w-6 h-6 text-white absolute left-2 top-1/2 -translate-y-1/2" />
          <input
            className="w-full py-3 px-1 rounded-md bg-zinc-700 pl-11 ring-0 outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Search"
          />
        </div>
      </div>
      <div>
        {loading && <Loading text="Loading..." />}
        <ul>
          {channels.map(({ name }) => (
            <li
              key={`channel-item-${name}`}
              className="text-gray-300 py-2 px-1 rounded-md uppercase text-md font-bold mb-1 flex items-center hover:bg-zinc-800 cursor-pointer"
            >
              <img
                className="w-10 h-10 md:w-8 md:h-8 rounded-md mr-4"
                src={`https://ui-avatars.com/api/?name=${name}`}
              />
              <span className="text-sm">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <Transition
      appear={true}
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
        className={`bg-black w-4/5 h-screen py-4 px-6 fixed left-0 top-0 z-50 md:static md:w-60`}
      >
        <Menu />
      </div>
    </Transition>
  );
};

export default SlideMenu;
