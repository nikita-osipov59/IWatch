'use client';

import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from 'next/link';

import toast from 'react-hot-toast';

import { ROUTER_PATH } from '@/constants';

import { useGetAuthStore } from '@/store';

import { Reminder } from '@/components/common';
import { signUp } from '@/actions/auth';

const schema = z.object({
  email: z.email().min(2).max(40),
  password: z.string().min(6, 'Минимальное кол-во символов 6'),
});

export type SignUpForm = z.infer<typeof schema>;

// ? Возможно нужно переделать обработку ошибки от signUp

export const SignUpForm = () => {
  const { email, setEmail } = useGetAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(schema),
  });

  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    const response = await signUp(data);

    if (response.error) {
      return toast.error(response.error);
    }
  };

  return (
    <div className="flex min-h-[432px] items-center gap-[15px]">
      <div className="flex h-[-webkit-fill-available] w-[300px] flex-col justify-center rounded-xl bg-[url(/welcomeBG.png)]">
        <p className="flex flex-col justify-center gap-[5px] text-center text-[20px]">
          Welcome to <span className="text-[30px] text-primary uppercase">IWatch</span>you can do
          more
        </p>
      </div>
      <form
        className="flex h-[-webkit-fill-available] w-[300px] flex-col gap-[15px] rounded-xl border border-border p-[15px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-center gap-[5px]">
          <Link className="active" href={ROUTER_PATH.SIGNUP}>
            Signup
          </Link>
          <div className="text-[#75767c]">/</div>
          <Link className="text-accent" href={ROUTER_PATH.SIGNIN}>
            Login
          </Link>
        </div>
        <div className="flex h-full w-full flex-col gap-[15px]">
          <div className="relative flex flex-col gap-[5px]">
            <p>Email</p>
            <label className="absolute bottom-[17px] left-[15px] text-accent" htmlFor="mail-input">
              <Mail size={22} />
            </label>
            <input
              className="flex rounded-xl border border-border py-[15px] pr-[15px] pl-[45px] font-light duration-300 outline-none focus:border-focus"
              {...register('email')}
              id="mail-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.ru"
            />
          </div>
          {errors.email && <span className="error">{errors.email.message}</span>}
          <div className="relative flex flex-col gap-[5px]">
            <p>Password</p>
            <label
              className="absolute bottom-[17px] left-[15px] text-accent"
              htmlFor="password-input"
            >
              <Lock size={22} />
            </label>
            <input
              className="flex rounded-xl border border-border px-[45px] py-[15px] font-light duration-300 outline-none focus:border-focus"
              {...register('password')}
              id="password-input"
              type={isShow ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <label
              className="absolute right-[15px] bottom-[17px] cursor-pointer text-accent"
              onClick={() => setIsShow(!isShow)}
            >
              {isShow ? <EyeOff size={22} /> : <Eye size={22} />}
            </label>
          </div>
          {errors.password && <span className="error">{errors.password?.message}</span>}
        </div>
        <button
          className="w-full cursor-pointer rounded-xl bg-primary p-[15px] duration-300 outline-none hover:brightness-[.8] focus:brightness-[.8]"
          type="submit"
        >
          {isSubmitting ? 'Loading...' : 'Signup'}
        </button>
        <Reminder view="Registration" />
      </form>
    </div>
  );
};
