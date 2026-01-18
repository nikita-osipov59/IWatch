'use client';

import { Metadata } from 'next';
import { User } from '@supabase/supabase-js';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import z from 'zod';

import { BorderPanel } from '@/components/common';
import { updateEmail, updatePassword } from '@/actions/settings';
import { signOut } from '@/actions/auth';

export const metadata: Metadata = {
  title: 'Профиль',
};

type SettingsProfileProps = {
  user: User;
};

const schema = z.object({
  email: z
    .email()
    .optional()
    .refine((val) => !val || z.email().safeParse(val).success, {
      message: 'Некорректный email',
    }),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: 'Минимум 6 символов',
    }),
});

type SettingsProfileForm = z.infer<typeof schema>;

export const SettingsProfile = ({ user }: SettingsProfileProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsProfileForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SettingsProfileForm> = async (data) => {
    if (data.email && data.email !== user.email) {
      const response = await updateEmail(data.email);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success('Проверьте почту для подтверждения!');
        signOut();
      }
    }

    if (data.password) {
      const response = await updatePassword(data.password);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success('Пароль обновлен!');
      }
    }
  };

  return (
    <BorderPanel
      className="w-fit"
      classNameTitle="text-[24px] text-main"
      title="General Details"
      subTitle="Update your personal details"
    >
      <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[15px]">
          <div className="relative flex flex-col gap-[5px]">
            <p>Email</p>
            <label className="absolute bottom-[17px] left-[15px] text-accent" htmlFor="email-input">
              <Mail />
            </label>
            <input
              {...register('email')}
              className="flex rounded-xl border border-border py-[15px] pr-[15px] pl-[45px] font-light duration-300 outline-none focus:border-focus"
              id="email-input"
              type="text"
              placeholder="example@mail.com"
            />
          </div>
          {errors.email && <div className="error">{errors.email.message}</div>}
          <div className="relative flex flex-col gap-[5px]">
            <p>Password</p>
            <label
              className="absolute bottom-[17px] left-[15px] text-accent"
              htmlFor="password-input"
            >
              <Lock />
            </label>
            <input
              {...register('password')}
              className="flex rounded-xl border border-border py-[15px] pr-[15px] pl-[45px] font-light duration-300 outline-none focus:border-focus"
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
            />
            <label
              className="absolute right-[15px] bottom-[17px] cursor-pointer text-accent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </label>
          </div>
          {errors.password && <div className="error">{errors.password.message}</div>}
        </div>
        <button className="w-full cursor-pointer rounded-xl bg-primary p-[15px] duration-300 outline-none hover:brightness-[.8] focus:brightness-[.8]">
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </BorderPanel>
  );
};
