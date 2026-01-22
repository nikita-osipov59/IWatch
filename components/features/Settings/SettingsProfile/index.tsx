'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleUser } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import z from 'zod';

import { BorderPanel } from '@/components/common';
import { updateUserName } from '@/actions/settings';
import { User } from '@supabase/supabase-js';
import { TProfile } from '@/types';

const schema = z.object({
  username: z.string().min(2).max(40),
});

export type SettingsProfileForm = z.infer<typeof schema>;

type SettingsProfileProps = {
  user: User;
  profile?: TProfile;
};

export const SettingsProfile = ({ user }: SettingsProfileProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsProfileForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SettingsProfileForm> = async (data) => {
    const response = await updateUserName(data);

    if (response?.error) {
      return toast.error(response.error);
    }
    toast.success('✅ Nickname обновлен!');
    router.refresh();
  };
  return (
    <BorderPanel className="w-fit" classNameTitle="text-[24px] text-main" title="Profile Details">
      <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex h-full w-full flex-col gap-[15px]">
          <div className="relative flex flex-col gap-[5px]">
            <p>Nickname</p>
            {user.action_link}
            <label
              className="absolute bottom-[17px] left-[15px] text-accent"
              htmlFor="username-input"
            >
              <CircleUser size={22} />
            </label>
            <input
              className="flex rounded-xl border border-border py-[15px] pr-[15px] pl-[45px] font-light duration-300 outline-none focus:border-focus"
              {...register('username')}
              id="username-input"
              type="text"
              placeholder="your new nickname"
            />
          </div>
          {errors.username && <span className="error">{errors.username.message}</span>}
        </div>
        <button
          className="w-full cursor-pointer rounded-xl bg-primary p-[15px] duration-300 outline-none hover:brightness-[.8] focus:brightness-[.8]"
          type="submit"
        >
          {isSubmitting ? 'Sending...' : 'Save'}
        </button>
      </form>
    </BorderPanel>
  );
};
