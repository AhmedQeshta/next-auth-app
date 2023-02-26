'use client';
import React, { useState } from 'react';
import style from '@/styles/Form.module.css';
import Input from '@/components/ui/Input';
import { HiUsers, HiAtSymbol, HiEye, HiEyeSlash } from 'react-icons/hi2';

const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="flex flex-col gap-5">
      <div className={style.inputGroup}>
        <Input icon={<HiUsers size={20} />} name="username" placeholder="Username" />
      </div>
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
        Sign up
      </button>
    </form>
  );
};

export default FormRegister;
