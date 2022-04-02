type InputWithErrorProps = {
  label: string;
  hasError: boolean;
  errorMessage: string | undefined;
  [key: string]: any;
};

const InputWithError = ({
  label,
  hasError,
  errorMessage,
  ...fieldProps
}: InputWithErrorProps) => (
  <div>
    <div className="mb-2text-white text-md mb-2 text-white">{label}</div>
    <input
      className="w-full text-gray-400 bg-transparent ring-1 outline-none border-0 focus:ring-2 focus:ring-indigo-700 ring-gray-300 rounded-md"
      {...fieldProps}
    />
    {hasError && (
      <div className="mt-1 text-red-400 text-sm font-thin">{errorMessage}</div>
    )}
  </div>
);

export default InputWithError;
