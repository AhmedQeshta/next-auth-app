'use client';
import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import * as Yup from 'yup';
import style from '@/styles/Form.module.css';
import Input from '@/components/ui/Input';
import MessageError from '@/components/ui/MessageError';
import { HiAtSymbol, HiEye, HiEyeSlash } from 'react-icons/hi2';
import Image from 'next/image';
import { hasError } from '@/utils/helper';

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlerSignIn = useCallback(async (provider: string) => {
    signIn(provider, { callbackUrl: process.env.LOCAL_AUTH_URL });
  }, []);

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className="flex flex-col gap-7" onSubmit={form.handleSubmit}>
      <div className={`${style.inputGroup} ${hasError(form, 'email') ? 'border-rose-600' : ''}`}>
        <Input
          icon={<HiAtSymbol size={20} />}
          type="email"
          placeholder="Email Address"
          {...form.getFieldProps('email')}
        />
        <MessageError form={form} name="email" />
      </div>

      <div className={`${style.inputGroup} ${hasError(form, 'password') ? 'border-rose-600' : ''}`}>
        <Input
          icon={showPassword ? <HiEye size={20} /> : <HiEyeSlash size={20} />}
          type={showPassword ? 'text' : 'password'}
          {...form.getFieldProps('password')}
          placeholder="Password"
          onClick={() => setShowPassword((prev) => !prev)}
        />
        <MessageError form={form} name="password" />
      </div>

      <button type="submit" className={style.Button}>
        Login
      </button>
      <button className={style.ButtonCustom} type="button" onClick={() => handlerSignIn('google')}>
        <Image
          className={style.ImageButtonCustom}
          src="/assets/google.svg"
          width="30"
          height="30"
          alt="Sign In with Google"
        />
        <p>Sign In with Google</p>
      </button>

      <button className={style.ButtonCustom} onClick={() => handlerSignIn('github')} type="button">
        <Image
          className={style.ImageButtonCustom}
          src="/assets/github.svg"
          width="30"
          height="30"
          alt="Sign In with Github"
        />
        <p>Sign In with Github</p>
      </button>
    </form>
  );
};

export default FormLogin;
