'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ROUTER_PATH } from '@/constants';

export const Search = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`${ROUTER_PATH.SEARCH}/${inputValue.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="group relative inline-flex w-fit transition-all">
      <input
        className="group/search flex w-60 items-center gap-2.5 rounded-xl border border-border bg-background-info p-[13px] pr-[68px] font-light text-main transition-all duration-300 focus-within:border-focus focus:ring-0 focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="absolute top-px right-px h-[50px] cursor-pointer rounded-[0_12px_12px_0] border-l border-border px-[15px] text-accent transition-all duration-300 group-focus-within:border-l-focus focus-within:bg-focus focus-within:text-main hover:bg-focus hover:text-main focus:ring-0 focus:outline-none"
        type="submit"
      >
        <ArrowRight size={22} />
      </button>
    </form>
  );
};
