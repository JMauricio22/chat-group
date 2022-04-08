import { Menu } from '@headlessui/react';
import {
  ChevronDownIcon,
  UserCircleIcon,
  ChatIcon,
} from '@heroicons/react/solid';
import { useAppSelector } from '@hooks/useAppSelector';
import { LogoutIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useAuthProvider } from '@components/AuthProvider';
import { useRouter } from 'next/router';

type UserMenuProps = {
  top?: boolean;
};

function UserMenu({ top = false }: UserMenuProps) {
  const userName = useAppSelector((state) => state.user.profile?.name);
  const { pathname } = useRouter();
  const auth = useAuthProvider();

  return (
    <div className={`${top ? 'absolute left-0 bottom-0 w-full' : 'w-auto'}`}>
      <Menu
        as="div"
        className={`${
          top ? 'bg-black' : 'bg-transparent'
        } w-full text-white relative `}
      >
        <Menu.Button className="h-10 px-4 py-7 flex justify-between items-center w-full">
          <div className="flex items-center">
            <img
              className="w-6 h-8 mr-3 rounded-md"
              src={`https://ui-avatars.com/api/?name=${userName}`}
            />
            <span className="text-sm font-semibold text-gray-400 mr-8">
              {userName}
            </span>
          </div>
          <ChevronDownIcon className="w-4 h-4" />
        </Menu.Button>
        <Menu.Items
          className={`
        ${top ? 'bg-primary' : 'bg-black'} absolute right-2 ${
            top ? 'top-0 -translate-y-full mt-4' : ''
          } z-50 text-white w-48 h-auto rounded-xl px-3 pt-4 pb-2`}
        >
          <Menu.Item>
            <div
              className={`px-2 py-3 rounded-md mb-1 ${
                pathname === '/profile' ? 'bg-zinc-700' : ''
              }`}
            >
              <Link href="/profile">
                <a className="flex items-center h-full">
                  <UserCircleIcon className="w-5 h-5 inline-block mr-1" />
                  <span className="text-sm font-normal">My Profile</span>
                </a>
              </Link>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              className={`px-2 py-3 rounded-md mb-1 ${
                pathname === '/chat-group' ? 'bg-zinc-700' : ''
              }`}
            >
              <Link href="/chat-group">
                <a className="flex items-center h-full">
                  <ChatIcon className="w-5 h-5 inline-block mr-1" />
                  <span className="text-sm font-normal">Chat</span>
                </a>
              </Link>
            </div>
          </Menu.Item>
          <hr className="mt-3 mb-1" />
          <Menu.Item>
            <button
              className="px-2 py-3 rounded-md mb-1 text-red-400 cursor-pointer flex items-center h-full"
              onClick={auth.signout}
            >
              <LogoutIcon className="w-5 h-5 inline-block mr-1" />
              <span className="text-sm font-normal">Logout</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default UserMenu;
