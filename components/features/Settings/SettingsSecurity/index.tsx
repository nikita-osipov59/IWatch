'use client';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import z from 'zod';

import { BorderPanel } from '@/components/common';
import { updateEmail, updatePassword, updateEmailAndPassword } from '@/actions/settings';
import { signOut } from '@/actions/auth';
import { TUser } from '@/app/hooks';

export type SettingsProfileForm = {
  email?: string;
  password?: string;
};

type ModeType = 'email' | 'password' | 'both';

const schema = z.object({
  email: z
    .string()
    .optional()
    .refine(
      (val) => {
        return !val || z.email().safeParse(val).success;
      },
      { message: 'Некорректный email' },
    ),
  password: z
    .string()
    .optional()
    .refine(
      (val) => {
        return !val || val.length >= 6;
      },
      { message: 'Минимум 6 символов' },
    ),
});

export const SettingsSecurity = ({ user }: TUser) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<'email' | 'password' | 'both'>('both');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<SettingsProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const watchedEmail = useWatch({ control, name: 'email' });
  const watchedPassword = useWatch({ control, name: 'password' });
  const hasEmailChange = watchedEmail && watchedEmail !== user.email;
  const hasPasswordChange = !!watchedPassword;

  const onSubmit: SubmitHandler<SettingsProfileForm> = async (data) => {
    try {
      let hasSuccess = false;

      if (mode === 'email' && hasEmailChange) {
        const response = await updateEmail(data.email!);
        if (response?.error) {
          toast.error(response.error);
        } else {
          toast.success('✅ Email обновлен! Проверьте почту.');
          hasSuccess = true;
        }
      }

      if (mode === 'password' && hasPasswordChange) {
        const response = await updatePassword(data.password!);
        if (response?.error) {
          toast.error(response.error);
        } else {
          toast.success('✅ Пароль обновлен!');
          hasSuccess = true;
        }
      }

      if (mode === 'both' && (hasEmailChange || hasPasswordChange)) {
        const response = await updateEmailAndPassword({
          email: data.email,
          password: data.password,
        });
        if (response?.error) {
          toast.error(response.error);
        } else {
          toast.success('✅ Email и пароль обновлены. Проверьте почту!');
          hasSuccess = true;
        }
      }

      if (hasSuccess) {
        reset();
        signOut();
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Ошибка при обновлении');
    }
  };

  const canSubmit = hasEmailChange || hasPasswordChange;

  const buttonList: { title: string; mode: ModeType }[] = [
    { title: 'Email', mode: 'email' },
    { title: 'Password', mode: 'password' },
    { title: 'Both', mode: 'both' },
  ];

  return (
    <BorderPanel className="w-fit" classNameTitle="text-[24px] text-main" title="Security Details">
      <div className="flex flex-col gap-[15px]">
        <div className="flex w-fit rounded-xl border border-border bg-background-info">
          {buttonList.map((item, index) => {
            return (
              <button
                onClick={() => setMode(item.mode)}
                className={`border-r border-border px-4 py-2 transition-all first:rounded-l-xl last:rounded-r-xl last:border-r-0 ${
                  mode === item.mode
                    ? 'bg-primary text-white shadow-md'
                    : 'hover:cursor-pointer hover:text-primary'
                }`}
                key={index}
              >
                {item.title}
              </button>
            );
          })}
        </div>
        <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[15px]">
            {mode !== 'password' && (
              <>
                <div className="relative flex flex-col gap-[5px]">
                  <label
                    className="absolute bottom-[17px] left-[15px] text-accent"
                    htmlFor="email-input"
                  >
                    <Mail size={22} />
                  </label>
                  <input
                    {...register('email')}
                    id="email-input"
                    className="flex w-[300px] rounded-xl border border-border py-[15px] pr-[15px] pl-[45px] font-light duration-300 outline-none focus:border-focus"
                    type="email"
                    placeholder="your new email"
                  />
                </div>
                {errors.email && <div className="error text-red-500">{errors.email.message}</div>}
              </>
            )}

            {mode !== 'email' && (
              <>
                <div className="relative flex flex-col gap-[5px]">
                  <label
                    className="absolute bottom-[17px] left-[15px] text-accent"
                    htmlFor="password-input"
                  >
                    <Lock size={22} />
                  </label>
                  <input
                    {...register('password')}
                    id="password-input"
                    className="flex w-[300px] rounded-xl border border-border px-[45px] py-[15px] font-light duration-300 outline-none focus:border-focus"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="your new password"
                  />
                  <label
                    className="absolute right-[15px] bottom-[17px] cursor-pointer text-accent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </label>
                </div>
                {errors.password && (
                  <div className="error text-red-500">{errors.password.message}</div>
                )}
              </>
            )}
          </div>

          {canSubmit && (
            <button
              className="w-full cursor-pointer rounded-xl bg-primary p-[15px] duration-300 outline-none hover:brightness-[.8]"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting
                ? 'Сохранение...'
                : `Сохранить ${mode === 'email' ? 'Email' : mode === 'password' ? 'Пароль' : 'Изменения'}`}
            </button>
          )}
        </form>
      </div>
    </BorderPanel>
  );
};
