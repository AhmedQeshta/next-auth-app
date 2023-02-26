'use client';
import React, { useState } from 'react';
import style from '@/styles/Form.module.css';
import Input from '@/components/ui/Input';
import { HiAtSymbol, HiEye, HiEyeSlash } from 'react-icons/hi2';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handlerSignIn = async (provider: string) => {
    signIn(provider, { callbackUrl: 'http://localhost:3000/' });
  };
  return (
    <form className="flex flex-col gap-5">
      <div className={style.inputGroup}>
        <Input
          icon={<HiAtSymbol size={20} />}
          type="email"
          name="email"
          placeholder="Email Address"
        />
      </div>

      <div className={style.inputGroup}>
        <Input
          icon={showPassword ? <HiEye size={20} /> : <HiEyeSlash size={20} />}
          type={showPassword ? 'text' : 'password'}
          name="email"
          placeholder="Email Address"
          onClick={() => setShowPassword((prev) => !prev)}
        />
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
