'use server';

import { getUser } from '@/app/hooks';
import { SettingsSecurityForm } from '@/components/features';
import { createServer } from '@/utils/supabase';

export const updateEmail = async (email: string) => {
  const supabase = await createServer();

  const { error } = await supabase.auth.updateUser({ email: email });

  if (error) {
    return { error: error.message };
  }
};

export const updatePassword = async (password: string) => {
  const supabase = await createServer();

  const { error } = await supabase.auth.updateUser({ password: password });

  if (error) {
    return { error: error.message };
  }
};

export const updateEmailAndPassword = async (data: SettingsSecurityForm) => {
  const supabase = await createServer();

  const { error } = await supabase.auth.updateUser({ password: data.password, email: data.email });

  if (error) {
    return { error: error.message };
  }
};

export const updateUserName = async (username: string) => {
  const supabase = await createServer();
  const user = await getUser();

  const { error } = await supabase
    .from('profiles')
    .update({
      username: username,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user?.id);

  if (error) {
    return { error: error.message };
  }
};

export const updateUserDescription = async (description: string) => {
  const supabase = await createServer();
  const user = await getUser();

  const { error } = await supabase
    .from('profiles')
    .update({
      description: description,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user?.id);

  if (error) {
    return { error: error.message };
  }
};

export async function updateUserAvatar(formData: FormData) {
  'use server';

  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Не авторизован' };
  }

  const file = formData.get('avatar') as File;

  if (!file || file.size === 0) {
    return { error: 'Выберите файл' };
  }

  // ✅ КОНВЕРТИРУЕМ File → Uint8Array
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // ✅ Имя файла
  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}_${Date.now()}.${fileExt}`;

  // ✅ Загрузка как bytes
  const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, bytes, {
    contentType: file.type,
    cacheControl: '3600',
    upsert: true,
  });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return { error: `Ошибка загрузки: ${uploadError.message}` };
  }

  // ✅ Публичная ссылка
  const {
    data: { publicUrl },
  } = supabase.storage.from('avatars').getPublicUrl(fileName);

  // ✅ Обновить профиль
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      avatar_url: publicUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (profileError) {
    console.error('Profile error:', profileError);
    return { error: `Ошибка профиля: ${profileError.message}` };
  }

  return { success: true, avatar_url: publicUrl };
}
