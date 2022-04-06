import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { ErrorHandler } from '@utils/chat';
import Loading from '@components/Loading';

type ChatErrorOverlayProps = {
  errorHandler: ErrorHandler;
};

const ChatErrorOverlay = ({ errorHandler }: ChatErrorOverlayProps) => {
  const loading = useAppSelector((state) => state.chat.loading);
  const error = useAppSelector((state) => state.chat.error);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full h-screen max-h-screen fixed top-0 left-0 bg-black/10 flex justify-center items-center z-50">
      <div className="w-auto inline-block h-auto text-red-400 text-xl text-center">
        {loading ? (
          <Loading />
        ) : (
          <>
            <p>Oopss something went wrong!!!</p>
            <p className="font-light text-md italic">{error.message}</p>
            {errorHandler && (
              <div className="w-full text-center">
                <button
                  className="inline-block w-auto px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-md mt-2 text-md font-light"
                  onClick={() => errorHandler(dispatch)}
                >
                  Try Again
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatErrorOverlay;
