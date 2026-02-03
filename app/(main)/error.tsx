'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[15px]">
      <h2 className="text-2xl font-bold">Что-то пошло не так!</h2>
      <button
        className="cursor-pointer rounded-xl bg-primary p-[15px] text-main duration-300 hover:brightness-80"
        onClick={() => reset()}
      >
        Попробовать снова
      </button>
    </div>
  );
}
