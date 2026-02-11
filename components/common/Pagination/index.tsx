'use client';

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const pages: number[] = [];

    // Всегда показываем первую страницу
    pages.push(1);

    // Текущие страницы
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    // Последняя страница
    if (totalPages > 1 && !pages.includes(totalPages)) {
      if (pages[pages.length - 1] !== totalPages - 1) pages.push(-1);
      pages.push(totalPages);
    }

    return pages.filter((p, idx, arr) => p !== -1 || arr[idx - 1] !== -1);
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {currentPage > 1 && (
        <Link
          href={createPageURL(Math.max(1, currentPage - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary transition-all duration-300 hover:bg-primary/40"
        >
          <ChevronLeft size={20} />
        </Link>
      )}

      {getVisiblePages().map((page, index) =>
        page === -1 ? (
          <div key={`dots-${index}`} className="flex h-10 w-10 items-center justify-center">
            <MoreHorizontal size={30} />
          </div>
        ) : (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`flex h-10 min-w-10 items-center justify-center rounded-xl p-2.5 font-medium text-main transition-all duration-300 ${
              currentPage === page ? 'bg-primary' : 'bg-background hover:bg-accent'
            }`}
          >
            {page}
          </Link>
        ),
      )}
      {currentPage !== totalPages && (
        <Link
          href={createPageURL(Math.min(totalPages, currentPage + 1))}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary transition-all duration-300 hover:bg-primary/40"
        >
          <ChevronRight size={20} />
        </Link>
      )}
    </div>
  );
};
