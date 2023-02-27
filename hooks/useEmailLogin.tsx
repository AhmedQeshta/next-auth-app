'use client';
import { useEffect } from 'react';

interface formProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const useEmailLogin = (form: formProps) => {
  useEffect(() => {
    // get email from query params
    const email = location.search.split('email=')[1] as string;
    // set email to form
    form.setFieldValue('email', email);
    return () => {
      form.setFieldValue('email', '');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return false;
};

export default useEmailLogin;
