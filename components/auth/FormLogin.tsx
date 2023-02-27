'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import * as Yup from 'yup';
import style from '@/styles/Form.module.css';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { HiAtSymbol, HiEye, HiEyeSlash } from 'react-icons/hi2';
import MessageError from '@/components/ui/MessageError';
import { hasError } from '@/utils/helper';
import useEmailLogin from '@/hooks/useEmailLogin';

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handlerSignIn = useCallback(async (provider: string) => {
    signIn(provider, { callbackUrl: process.env.NEXT_PUBLIC_LOCAL_AUTH_URL });
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
    onSubmit: async ({ email, password }) => {
      const status = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/',
      });

      if (status?.error) {
        form.setFieldError('email', status?.error);
      }

      if (status?.ok) {
        form.resetForm();
        router.push(status?.url || '/');
      }
    },
  });

  useEmailLogin(form);

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
