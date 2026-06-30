'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Pencil, X } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { normalizeUrl } from '@/utils/helpers';

interface BackgroundUploadProps {
  currentBackground?: string;
  userId: string;
}

export const BackgroundUpload = ({ currentBackground, userId }: BackgroundUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Разрешённые форматы и размер
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Валидация
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Разрешены только JPEG, PNG, GIF, WEBP, SVG');
      e.target.value = ''; // сброс
      return;
    }

    if (file.size > MAX_SIZE) {
      toast.error('Максимальный размер файла — 5 МБ');
      e.target.value = '';
      return;
    }

    setIsUploading(true);

    try {
      // 1. Загружаем файл в Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `profiles/${userId}/background.${fileExt}`; // путь с папкой пользователя
      const { error: uploadError } = await supabase.storage
        .from('profile-backgrounds')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Получаем публичный URL
      const { data: urlData } = supabase.storage.from('profile-backgrounds').getPublicUrl(fileName);

      const backgroundUrl = urlData.publicUrl;

      // 3. Обновляем профиль в таблице profiles (!!)
      const { error: updateError } = await supabase
        .from('profiles') // исправлено!
        .update({ background_url: backgroundUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      toast.success('Фон обновлён!');
      router.refresh(); // обновить данные на странице
    } catch {
      toast.error('Не удалось загрузить фон. Попробуйте позже.');
    } finally {
      setIsUploading(false);
      e.target.value = ''; // сброс input
    }
  };

  // Удаление фона
  const handleRemoveBackground = async () => {
    if (!currentBackground) return;
    if (!confirm('Удалить фоновое изображение?')) return;

    try {
      // Удаляем файл из Storage
      const fileName = currentBackground.split('/').pop(); // извлекаем имя файла
      if (fileName) {
        const path = `profiles/${userId}/${fileName}`;
        const { error: deleteError } = await supabase.storage
          .from('profile-backgrounds')
          .remove([path]);

        if (deleteError) console.warn('Не удалось удалить файл:', deleteError);
      }

      // Обновляем профиль (убираем ссылку)
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ background_url: null })
        .eq('id', userId);

      if (updateError) throw updateError;

      toast.success('Фон удалён');
      router.refresh();
    } catch {
      toast.error('Ошибка удаления фона');
    }
  };

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800">
      {currentBackground ? (
        <>
          <Image
            src={normalizeUrl(currentBackground)}
            alt="Background"
            fill
            className="object-cover"
            unoptimized
          />
          {/* Кнопка удаления */}
          <button
            onClick={handleRemoveBackground}
            className="absolute right-14 bottom-4 rounded-full bg-red-500 p-2 text-white shadow-lg transition hover:bg-red-600"
            title="Удалить фон"
          >
            <X size={20} />
          </button>
        </>
      ) : (
        <div className="flex h-full items-center justify-center text-gray-400">
          Загрузите фон профиля
        </div>
      )}

      <label
        htmlFor="background-upload"
        className="absolute right-4 bottom-4 cursor-pointer rounded-full bg-primary p-2 text-white shadow-lg transition hover:bg-primary/80"
      >
        <Pencil size={20} />
        <input
          id="background-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
          <div className="flex items-center gap-2">
            <span className="loader" /> {/* можете добавить спиннер */}
            Загрузка...
          </div>
        </div>
      )}
    </div>
  );
};
