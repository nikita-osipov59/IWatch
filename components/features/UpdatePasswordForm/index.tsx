'use client';

import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Lock } from 'lucide-react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Reminder } from '@/components/common';
import { updatePasswordForEmail } from '@/actions/recovery';

const schema = z.object({
  password: z.string().min(6, 'Минимальное кол-во символов 6'),
});

type UpdatePasswordForm = z.infer<typeof schema>;

// ? Возможно нужно переделать обработку ошибки от signIn

export const UpdatePasswordForm = () => {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<UpdatePasswordForm> = async (data) => {
    const response = await updatePasswordForEmail(data);

    if (response?.error) {
      setError(response.error);
    }
  };

  return (
    <div className="flex items-center gap-[15px]">
      <div className="flex h-[-webkit-fill-available] w-[300px] flex-col justify-center rounded-xl bg-[url(/welcomeBG.png)]">
        <p className="flex flex-col justify-center gap-[5px] text-center text-[20px]">
          Welcome to <span className="text-[30px] text-primary uppercase">IWatch</span>you can do
          more
        </p>
      </div>
      <form
        className="flex w-[300px] flex-col gap-[15px] rounded-xl border border-border p-[15px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-center text-foreground">Update your password</div>
        <div className="flex w-full flex-col">
          <div className="relative flex flex-col gap-[5px]">
            <p>Password</p>
            <label className="absolute bottom-4 left-[15px] text-accent" htmlFor="mail-input">
              <Lock size={22} />
            </label>
            <input
              className="flex rounded-xl border border-border py-[15px] pr-[15px] pl-[45px] font-light duration-300 outline-none focus:border-focus"
              {...register('password')}
              id="mail-input"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="example@gmail.ru"
            />
          </div>
          {errors.password && <span className="error">{errors.password.message}</span>}
          <div className="relative flex flex-col gap-[5px]"></div>
          {error && <span className="error">{error}</span>}
        </div>

        <button
          className="w-full cursor-pointer rounded-xl bg-primary p-[15px] duration-300 outline-none hover:brightness-[.8] focus:brightness-[.8]"
          type="submit"
        >
          {isSubmitting ? 'Loading...' : 'Send password'}
        </button>
        <Reminder view="Remember" />
      </form>
    </div>
  );
};
