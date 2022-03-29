type AlertProps = {
  message: string;
};

import { ExclamationCircleIcon } from '@heroicons/react/solid';

const Alert = ({ message }: AlertProps) => {
  return (
    <div className="text-red-400 flex justify-center items-center mb-4">
      <ExclamationCircleIcon className="w-4 h-4 mr-1" />
      <span className="text-center">{message}</span>
    </div>
  );
};

export default Alert;
