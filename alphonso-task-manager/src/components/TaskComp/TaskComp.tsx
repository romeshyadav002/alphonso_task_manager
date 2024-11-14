import React, { FC } from 'react';
import Image from 'next/image';
import { Checkbox } from '../ui/checkbox';
import { RxCrossCircled } from 'react-icons/rx';

interface TaskCompProps {
  title?: string;
  onClose?: () => void;
}
const TaskComp: FC<TaskCompProps> = ({ title, onClose }) => {
  return (
    <div className="flex w-full p-3 border-2 rounded-lg justify-between">
      <div className="flex flex-row gap-3 justify-center items-center">
        <Checkbox />
        <div>{title}</div>
      </div>
      <RxCrossCircled onClick={onClose} />
    </div>
  );
};

export default TaskComp;
