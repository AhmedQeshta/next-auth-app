'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HiUsers, HiAtSymbol, HiEye, HiEyeSlash } from 'react-icons/hi2';
import style from '@/styles/Form.module.css';
import Input from '@/components/ui/Input';
import MessageError from '@/components/ui/MessageError';
import { hasError } from '@/utils/helper';
import { useRouter } from 'next/navigation';

const FormRegister = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();

  const form = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async ({ username, email, password }) => {
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      };

      const data = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_AUTH_URL}/api/auth/signup`, option);
      const res = await data.json();

      if (res?.error) {
        form.setFieldError('email', res?.error);
        return;
      }
      router.push(`${process.env.NEXT_PUBLIC_LOCAL_AUTH_URL}`);
    },
  });

  return (
    <form className="flex flex-col gap-7" onSubmit={form.handleSubmit}>
      <div className={`${style.inputGroup} ${hasError(form, 'username') ? 'border-rose-600' : ''}`}>
        <Input
          icon={<HiUsers size={20} />}
          placeholder="Username"
          {...form.getFieldProps('username')}
        />
        <MessageError form={form} name="username" />
      </div>

      <div className={`${style.inputGroup} ${hasError(form, 'email') ? 'border-rose-600' : ''}`}>
        <Input
          icon={<HiAtSymbol size={20} />}
          type="email"
          {...form.getFieldProps('email')}
          placeholder="Email Address"
        />
        <MessageError form={form} name="email" />
      </div>

      <div className={`${style.inputGroup} ${hasError(form, 'password') ? 'border-rose-600' : ''}`}>
        <Input
          icon={showPassword.password ? <HiEye size={20} /> : <HiEyeSlash size={20} />}
          type={showPassword.password ? 'text' : 'password'}
          {...form.getFieldProps('password')}
          placeholder="Password"
          onClick={() => setShowPassword((prev) => ({ ...prev, password: !prev?.password }))}
        />
        <MessageError form={form} name="password" />
      </div>

      <div
        className={`${style.inputGroup} ${
          hasError(form, 'confirmPassword') ? 'border-rose-600' : ''
        }`}>
        <Input
          icon={showPassword.confirmPassword ? <HiEye size={20} /> : <HiEyeSlash size={20} />}
          type={showPassword.confirmPassword ? 'text' : 'password'}
          {...form.getFieldProps('confirmPassword')}
          placeholder="Confirm Password"
          onClick={() =>
            setShowPassword((prev) => ({ ...prev, confirmPassword: !prev?.confirmPassword }))
          }
        />
        <MessageError form={form} name="confirmPassword" />
      </div>

      <button type="submit" className={style.Button}>
        Sign up
      </button>
    </form>
  );
};

export default FormRegister;
