import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CSSProperties } from 'react';

import CheckedIcon from '../../../public/checked.svg';
import UnCheckedIcon from '../../../public/unchecked.svg';
import { cn } from '../../lib/utils';

interface CheckBoxViewProps {
  title: string;
  customStyle?: CSSProperties;
  onPress?: () => void;
  children?: React.ReactNode;
  labelClassName?: string;
  containerClassName?: string;
  checked?: boolean;
}

export const CheckboxView: React.FC<CheckBoxViewProps> = ({
  title,
  customStyle,
  onPress,
  labelClassName,
  containerClassName,
  checked = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = () => {
    setIsChecked(!isChecked);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onPress && onPress();
  };

  return (
    <div
      className={cn(
        'flex items-center space-x-2 rounded m-1 p-1 w-36 justify-center cursor-pointer',
        containerClassName,
      )}
      style={customStyle ? customStyle : { backgroundColor: '#F3F1F3' }}
      onClick={handleClick}
    >
      {isChecked ? (
        <Image src={CheckedIcon} alt="Search Logo" width={24} height={24} />
      ) : (
        <Image src={UnCheckedIcon} alt="Search Logo" width={24} height={24} />
      )}

      <label
        htmlFor={title}
        className={cn(
          'text-sm text-[#503d5c] font-medium leading-none cursor-pointer',
          labelClassName,
        )}
        title={title}
      >
        {title}
      </label>
    </div>
  );
};
