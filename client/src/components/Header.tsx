import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, UserIcon, ChatIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';
import UserMenu from '@components/UserMenu';
import Logo from '@components/Logo';
import { useAuth } from '@hooks/useAuth';
import Link from 'next/link';

interface MenuItem {
  id: string;
  name: string;
  url: string;
  icon(props: React.ComponentProps<'svg'>): JSX.Element;
}

const MenuItemLink = (props: {
  item: MenuItem;
  children: JSX.Element | string;
}) => (
  <Link href={props.item.url}>
    <a className="w-full flex items-center py-2 text-md font-semibold hover:bg-slate-600">
      <props.item.icon className="w-4 h-4 mr-2" />
      {props.children}
    </a>
  </Link>
);

const menuItems: MenuItem[] = [
  {
    id: 'nav-item-1',
    name: 'Profile',
    url: '/profile',
    icon: UserIcon,
  },
  {
    id: 'nav-item-2',
    name: 'Chat',
    url: '/chat-group',
    icon: ChatIcon,
  },
];

const Header = () => {
  const auth = useAuth();

  return (
    <header>
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center px-8">
        <div>
          <Logo />
        </div>
        <div>
          <UserMenu />
        </div>
      </div>
      {/* Mobile Header */}
      <div className="w-full h-auto p-2 md:hidden cursor-pointer bg-zinc-800">
        <Popover>
          <Popover.Button className="w-full h-10 flex items-center justify-between">
            <MenuIcon className="w-6 h-6 mr-1" />
            <Logo />
          </Popover.Button>
          <Popover.Panel>
            {menuItems.map((item) => (
              <Popover.Button as="div" key={item.id}>
                <MenuItemLink item={item}>{item.name}</MenuItemLink>
              </Popover.Button>
            ))}
            <Popover.Button
              as="button"
              className="w-full flex items-center py-2 text-md font-semibold hover:bg-slate-600"
              onClick={auth.signout}
            >
              <LogoutIcon className="w-4 h-4 mr-2" />
              Logout
            </Popover.Button>
          </Popover.Panel>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
