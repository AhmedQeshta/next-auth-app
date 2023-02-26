import React, { ReactNode } from 'react';
import style from '@/styles/Form.module.css';

interface InputProps {
  icon: ReactNode;
  onClick?: () => void;
  name: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input = ({ icon, onClick, ...props }: InputProps) => {
  return (
    <>
      <input
        className={style.inputText}
        type="text"
        autoComplete="false"
        autoCorrect="false"
        {...props}
      />
      <span className="icon flex items-center px-4" onClick={onClick}>
        {icon}
      </span>
    </>
  );
};

export default Input;
