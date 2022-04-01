import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { Dialog } from '@headlessui/react';

type CreateChannelDialogProps = {
  isOpen: boolean;
  closeModal(): void;
};

export default function CreateChannelDialog({
  isOpen,
  closeModal,
}: CreateChannelDialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-neutral-900 shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 text-white font-semibold mb-4"
              >
                New Channel
              </Dialog.Title>
              <div className="mt-2">
                <input
                  className="w-full mb-3 bg-zinc-700 text-gray-300 rounded-md h-8 py-5"
                  placeholder="Channel name"
                  type="text"
                />
                <textarea
                  className="w-full bg-zinc-700 rounded-md text-gray-300"
                  placeholder="Channel description"
                  rows={3}
                ></textarea>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Save
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
