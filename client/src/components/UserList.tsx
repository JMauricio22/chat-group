import { useAppSelector } from '@hooks/useAppSelector';
import { ChevronLeftIcon } from '@heroicons/react/solid';

type UserListProps = {
  setShowUserList(show: boolean): void;
};

const UserList = ({ setShowUserList }: UserListProps) => {
  const channelName = useAppSelector((state) => state.chat.name);
  const channelDescription = useAppSelector((state) => state.chat.description);
  const users = useAppSelector((state) => state.chat.users);

  return (
    <div className="text-white">
      <div className="mb-4 text-gray-300 font-semibold flex items-center">
        <button onClick={() => setShowUserList(false)}>
          <ChevronLeftIcon className="w-7 h-7 mr-2" />
        </button>
        All Channels
      </div>
      <div className="mb-6">
        <p className="uppercase font-bold text-xl mb-2 text-gray-300">
          {channelName}
        </p>
        <p className="font-thin text-md text-gray-300">{channelDescription}</p>
      </div>
      <div>
        <p className="font-bold text-md mb-4">MEMBERS</p>
        <ul>
          {users.map((user) => (
            <li className="flex items-center mb-4">
              <img
                className="w-7 h-7 mr-3 rounded-md"
                src={`https://ui-avatars.com/api/?name=${user.name}`}
              />
              <span className="text-zinc-400 font-bold text-md">
                {user.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
