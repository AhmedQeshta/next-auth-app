interface iFormProps {
  errors?: {
    [key: string]: string;
  };
  touched?: {
    [key: string]: boolean;
  };
}

export const hasError = (iForm: iFormProps, name: string): boolean => {
  return !!(iForm?.touched?.[name] && iForm?.errors?.[name]);
};
