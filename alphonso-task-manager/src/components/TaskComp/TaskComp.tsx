import React, { FC } from 'react';
import Image from 'next/image';
import { Checkbox } from '../ui/checkbox';
import { RxCrossCircled } from 'react-icons/rx';
import { CheckboxView } from '../CheckBoxView/CheckBoxView';

interface TaskCompProps {
  title?: string;
  isChecked: boolean;
  onPress: () => void;
  onClose?: () => void;
  isSearched: boolean;
}
const TaskComp: FC<TaskCompProps> = ({
  title,
  onPress,
  isChecked,
  onClose,
  isSearched,
}) => {
  return (
    <div
      className="flex w-full p-2 border-2 rounded-lg justify-between items-center"
      style={{ backgroundColor: isSearched ? 'Highlight' : undefined }}
    >
      <div className="flex flex-row gap-3 justify-center items-center">
        <CheckboxView
          title={title || ''}
          labelClassName="w-[100%] overflow-hidden text-ellipsis text-left capitalize"
          containerClassName="justify-start"
          customStyle={{
            width: '95%',
          }}
          onPress={onPress}
          checked={isChecked}
        />
      </div>
      <RxCrossCircled onClick={onClose} className="w-5 h-5" />
    </div>
  );
};

export default TaskComp;
