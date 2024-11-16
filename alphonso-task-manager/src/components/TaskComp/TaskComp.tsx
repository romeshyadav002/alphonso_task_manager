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
}
const TaskComp: FC<TaskCompProps> = ({
  title,
  onPress,
  isChecked,
  onClose,
}) => {
  return (
    <div className="flex w-full p-3 border-2 rounded-lg justify-between">
      <div className="flex flex-row gap-3 justify-center items-center">
        <CheckboxView
          title={title || ''}
          labelClassName="w-[100%] overflow-hidden text-ellipsis text-left capitalize"
          containerClassName="justify-start"
          customStyle={{
            backgroundColor: 'white',
            width: '95%',
            paddingTop: 5,
            paddingBottom: 5,
          }}
          onPress={onPress}
          checked={isChecked}
        />
      </div>
      <RxCrossCircled onClick={onClose} />
    </div>
  );
};

export default TaskComp;
