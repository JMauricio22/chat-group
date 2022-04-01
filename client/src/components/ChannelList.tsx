import { PlusIcon, SearchIcon } from '@heroicons/react/solid';
import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { ChannelInfo } from '@models/channel.model';
import Loading from '@components/Loading';

type ChannelListProps = {
  openChannelDialog(): void;
  joinChannel(id: number): void;
};

const ChannelList = ({ openChannelDialog, joinChannel }: ChannelListProps) => {
  const loading = useAppSelector((state) => state.channels.loading);
  const channels = useAppSelector((state) => state.channels.list);

  return (
    <>
      <div className="flex justify-between mb-8">
        <span className="text-white font-bold text-lg">Channels</span>
        <button
          className="bg-gray-800 p-1 rounded-md"
          onClick={openChannelDialog}
        >
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
          {channels.map(({ name, id }: ChannelInfo) => (
            <li
              key={`channel-item-${name}`}
              className="text-gray-300 py-2 px-1 rounded-md uppercase text-md font-bold mb-1 flex items-center hover:bg-zinc-800 cursor-pointer"
              onClick={() => joinChannel(id)}
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
};

export default ChannelList;
