import { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import { CreateChannelDTO } from '@models/channel.model';
import { createNewChannel } from '@redux/thunks/createChannel';
import Loading from '@components/Loading';
import { errorToCreateChannel } from '@redux/reducers/channels.reducer';

type CreateChannelDialogProps = {
  isOpen: boolean;
  closeModal(): void;
};

const channelSchema = yup.object().shape({
  name: yup.string().min(5).required(),
  description: yup.string().required(),
});

export default function CreateChannelDialog({
  isOpen,
  closeModal,
}: CreateChannelDialogProps) {
  const isCreatingChannel = useAppSelector(
    (state) => state.channels.isCreatingChannel,
  );
  const error = useAppSelector((state) => state.channels.newChannelError);
  const dispatch = useAppDispatch();
  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: channelSchema,
    onSubmit: (values: CreateChannelDTO) => {
      dispatch(createNewChannel(values, closeModal));
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.resetForm();
      dispatch(errorToCreateChannel(''));
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment} unmount={true}>
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
                className="text-lg leading-6 text-white font-semibold mb-3"
              >
                New Channel
              </Dialog.Title>
              {error && (
                <div className="text-red-400 text-md flex justify-center items-center font-semibold mb-2">
                  <ExclamationCircleIcon className="inline-block w-5 h-5 text-red-400 align-middle mr-1" />
                  {error}
                </div>
              )}
              <form onSubmit={form.handleSubmit}>
                <div className="mt-2">
                  <div className="mb-3">
                    <input
                      className="w-full mb-1 bg-zinc-700 text-gray-300 rounded-md h-8 py-5"
                      placeholder="Channel name"
                      type="text"
                      {...form.getFieldProps('name')}
                    />
                    {form.touched.name && form.errors['name'] && (
                      <span className="text-red-300 text-sm font-thin">
                        {form.errors['name']}
                      </span>
                    )}
                  </div>
                  <div>
                    <textarea
                      className="w-full bg-zinc-700 rounded-md text-gray-300"
                      placeholder="Channel description"
                      rows={3}
                      {...form.getFieldProps('description')}
                    ></textarea>
                    {form.touched.description && form.errors['description'] && (
                      <span className="text-red-300 text-sm font-thin">
                        {form.errors['description']}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    disabled={isCreatingChannel}
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    {isCreatingChannel ? (
                      <Loading text="Creating..." />
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
