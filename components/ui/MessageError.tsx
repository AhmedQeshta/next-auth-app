import React from 'react';

interface MessageErrorProps {
  name: string;
  form: {
    errors?: {
      [key: string]: string;
    };
    touched?: {
      [key: string]: boolean;
    };
  };
}
const MessageError = ({ form, name }: MessageErrorProps) => {
  return form.errors?.[name] && form.touched?.[name] ? (
    <p className="text-red-500 text-sm absolute top-11 left-2/4 -translate-x-1/2">
      {form.errors?.[name]}
    </p>
  ) : null;
};

export default MessageError;
