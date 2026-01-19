'use client';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

export const SettingsList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTab = searchParams.get('tab') || 'profile';

  const list = [{ title: 'Security', href: '?tab=security' }];

  return (
    <ul className="flex w-fit rounded-xl border border-border bg-background-info">
      {list.map((item) => {
        const tabValue = item.href.split('=')[1];
        const isActive = currentTab === tabValue;

        return (
          <li
            key={item.title}
            className={`border-r border-border py-[15px] transition-all first:rounded-l-xl last:rounded-r-xl last:border-r-0 ${
              isActive ? 'bg-primary text-main shadow-sm' : ''
            }`}
          >
            <Link
              className="p-[15px] duration-300 hover:text-main"
              href={`${pathname}${item.href}`}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
