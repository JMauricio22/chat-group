import { Transition } from '@headlessui/react';

type InputWithErrorProps = {
  label: string;
  hasError: boolean;
  errorMessage?: string;
  displayTextArea?: boolean;
  [key: string]: any;
};

const InputWithError = ({
  label,
  hasError,
  errorMessage,
  displayTextArea = false,
  ...fieldProps
}: InputWithErrorProps) => (
  <div>
    <div className="text-md mb-2 text-white">{label}</div>
    {displayTextArea ? (
      <textarea
        className="w-full text-gray-400 bg-transparent ring-1 outline-none border-0 focus:ring-2 focus:ring-indigo-700 ring-gray-300 rounded-md"
        cols={30}
        rows={4}
        {...fieldProps}
      ></textarea>
    ) : (
      <input
        className="w-full text-gray-400 bg-transparent ring-1 outline-none border-0 focus:ring-2 focus:ring-indigo-700 ring-gray-300 rounded-md"
        {...fieldProps}
      />
    )}
    {hasError && (
      <Transition
        show
        appear
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        className="mt-1 text-red-400 text-sm font-thin"
        as="div"
      >
        {errorMessage}
      </Transition>
    )}
  </div>
);

export default InputWithError;
