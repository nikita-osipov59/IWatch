'use client';

import toast from 'react-hot-toast';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Mail } from 'lucide-react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGetAuthStore } from '@/store';

import { Reminder } from '@/components/common';
import { recoveryPasswordForEmail } from '@/actions/recovery';

const schema = z.object({
  email: z.email().min(2).max(40),
});

type RecoveryPasswordForm = z.infer<typeof schema>;

// ? Возможно нужно переделать обработку ошибки от signIn

export const RecoveryPasswordForm = () => {
  const { email, setEmail } = useGetAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecoveryPasswordForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RecoveryPasswordForm> = async (data) => {
    const response = await recoveryPasswordForEmail(data);
    if (response?.error) {
      return toast.error(response.error);
    }

    toast.success('Проверьте почту!');
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
        <div className="flex justify-center text-foreground">Recovery your password</div>
        <div className="flex w-full flex-col">
          <div className="relative flex flex-col gap-[5px]">
            <p>Email</p>
            <label className="absolute bottom-4 left-[15px] text-accent" htmlFor="mail-input">
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
          <div className="relative flex flex-col gap-[5px]"></div>
        </div>

        <button
          className="w-full cursor-pointer rounded-xl bg-primary p-[15px] duration-300 outline-none hover:brightness-[.8] focus:brightness-[.8]"
          type="submit"
        >
          {isSubmitting ? 'Loading...' : 'Send email'}
        </button>
        <Reminder view="Remember" />
      </form>
    </div>
  );
};
