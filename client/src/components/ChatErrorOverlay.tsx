import { RefreshIcon } from '@heroicons/react/solid';
import { useAppSelector } from '@hooks/useAppSelector';
import Loading from '@components/Loading';

type ChatErrorOverlayProps = {
  retryJoinChannel(): void;
};

const ChatErrorOverlay = ({ retryJoinChannel }: ChatErrorOverlayProps) => {
  const loading = useAppSelector((state) => state.chat.loading);

  return (
    <div className="w-full h-screen max-h-screen fixed top-0 left-0 bg-black/10 flex justify-center items-center z-50">
      <div className="w-auto inline-block h-auto text-red-400 text-xl">
        {loading ? (
          <Loading />
        ) : (
          <>
            <p>Oopss!!! error joining channel</p>
            <button
              className="bg-gray-600 hover:bg-gray-700 w-20 p-1 rounded-md text-gray-300 mt-2 text-md font-light flex items-center"
              onClick={retryJoinChannel}
            >
              <RefreshIcon className="w-5 h-5 mr-1" />
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatErrorOverlay;
