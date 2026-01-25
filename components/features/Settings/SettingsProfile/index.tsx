'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleUser, Upload } from 'lucide-react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import z from 'zod';

import { BorderPanel } from '@/components/common';
import { updateUserName, updateUserDescription, updateUserAvatar } from '@/actions/settings';

const schema = z.object({
  username: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 3, { message: 'Минимум 3 символов' }),
  description: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 3, { message: 'Минимум 3 символов' }),
  avatar: z.any().refine(
    (files) => {
      if (!files || files.length === 0) return true;
      const file = files[0];
      return file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024;
    },
    { message: 'Только изображения до 5MB' },
  ),
});

export type SettingsProfileForm = z.infer<typeof schema>;

type ModeType = 'nickname' | 'description' | 'avatar';

export const SettingsProfile = () => {
  const [mode, setMode] = useState<ModeType>('nickname');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsProfileForm>({
    resolver: zodResolver(schema),
  });

  const watchedUsername = useWatch({ control, name: 'username' });
  const watchedDescription = useWatch({ control, name: 'description' });
  const watchedAvatar = useWatch({ control, name: 'avatar' });

  const hasUsernameChange = !!watchedUsername?.trim();
  const hasDescriptionChange = !!watchedDescription?.trim();
  const hasAvatarChange = watchedAvatar && watchedAvatar.length > 0;

  const onSubmit: SubmitHandler<SettingsProfileForm> = async (data) => {
    try {
      let hasSuccess = false;

      if (mode === 'nickname' && hasUsernameChange) {
        const response = await updateUserName(data.username!);
        if (response?.error) {
          toast.error(response.error);
        } else {
          toast.success('✅ Username обновлен!');
          hasSuccess = true;
          router.refresh();
        }
      }

      if (mode === 'description' && hasDescriptionChange) {
        const response = await updateUserDescription(data.description!);
        if (response?.error) {
          toast.error(response.error);
        } else {
          toast.success('✅ Description обновлен!');
          hasSuccess = true;
        }
      }

      if (mode === 'avatar' && hasAvatarChange) {
        const formData = new FormData();
        formData.append('avatar', data.avatar![0]);
        const response = await updateUserAvatar(formData);

        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success('✅ Аватар загружен!');
          router.refresh();
        }
      }

      if (hasSuccess) {
        reset();
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Ошибка при обновлении');
    }
  };

  const canSubmit = hasUsernameChange || hasDescriptionChange || hasAvatarChange;

  const buttonList: { title: string; mode: ModeType }[] = [
    { title: 'Username', mode: 'nickname' },
    { title: 'Description', mode: 'description' },
    { title: 'Avatar', mode: 'avatar' },
  ];

  return (
    <BorderPanel className="w-fit" classNameTitle="text-[24px] text-main" title="Profile Details">
      <div className="flex flex-col gap-[15px]">
        <div className="flex w-fit rounded-xl border border-border bg-background-info">
          {buttonList.map((item) => (
            <button
              key={item.mode}
              onClick={() => setMode(item.mode)}
              className={`border-r border-border px-4 py-2 transition-all first:rounded-l-xl last:rounded-r-xl last:border-r-0 ${
                mode === item.mode
                  ? 'bg-primary text-white shadow-md'
                  : 'hover:cursor-pointer hover:text-primary'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <form className="flex w-[340px] flex-col gap-[15px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex h-full w-full flex-col gap-[15px]">
            {mode === 'nickname' && (
              <>
                <div className="relative">
                  <label
                    className="absolute bottom-[17px] left-[15px] text-accent"
                    htmlFor="nickname-input"
                  >
                    <CircleUser size={22} />
                  </label>
                  <input
                    {...register('username')}
                    className="w-[300px] rounded-xl border border-border py-[15px] pr-[15px] pl-[45px] font-light duration-300 outline-none focus:border-focus"
                    id="nickname-input"
                    placeholder="your new username"
                  />
                </div>
                {errors.username && (
                  <div className="error text-red-500">{errors.username.message}</div>
                )}
              </>
            )}

            {mode === 'description' && (
              <>
                <div className="relative">
                  <label
                    className="absolute bottom-[17px] left-[15px] text-accent"
                    htmlFor="description-input"
                  >
                    <CircleUser size={22} />
                  </label>
                  <input
                    {...register('description')}
                    className="w-[300px] rounded-xl border border-border py-[15px] pr-[15px] pl-[45px] font-light duration-300 outline-none focus:border-focus"
                    id="description-input"
                    placeholder="your new description"
                  />
                </div>
                {errors.description && (
                  <span className="error text-red-500">{errors.description.message}</span>
                )}
              </>
            )}

            {mode === 'avatar' && (
              <>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative rounded-xl border-2 border-dashed border-border p-4 text-center transition-all hover:border-primary">
                    <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                    <input
                      {...register('avatar')}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      disabled={isSubmitting}
                    />
                    <p className="text-sm text-gray-600">
                      Кликните чтобы выбрать аватарку (JPG, PNG, до 5MB)
                    </p>
                  </div>
                </div>
                {errors.avatar && (
                  <span className="error block text-center text-sm text-red-500">
                    {errors.avatar.message?.toString()}
                  </span>
                )}
              </>
            )}
          </div>

          {canSubmit && (
            <button
              className="w-full cursor-pointer rounded-xl bg-primary p-[15px] duration-300 outline-none hover:brightness-[.8] disabled:opacity-50"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting
                ? 'Сохранение...'
                : `Сохранить ${mode === 'nickname' ? 'Username' : mode === 'description' ? 'Description' : 'Avatar'}`}
            </button>
          )}
        </form>
      </div>
    </BorderPanel>
  );
};
