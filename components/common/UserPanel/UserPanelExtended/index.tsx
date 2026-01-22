'use client';

import { useEffect, useRef, useState } from 'react';
import { User } from '@supabase/supabase-js';

import { LogOut, Settings, UserPanel } from '@/components/common';
import { TProfile } from '@/types';

type UserPanelExtendedProps = {
  user: User;
  profile: TProfile;
};

export const UserPanelExtended = ({ user, profile }: UserPanelExtendedProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <UserPanel type="button" user={user} profile={profile} />
      </div>
      {isOpen && (
        <div className="absolute top-[69px] right-0 z-10 min-w-[250px] rounded-xl border border-border bg-background-info p-[15px]">
          <ul className="flex flex-col gap-[15px]">
            <UserPanel type="link" user={user} profile={profile} />
            <li className="border-t border-t-border pt-[15px]">
              <Settings />
            </li>
            <li className="border-t border-t-border pt-[15px]">
              <LogOut size={22} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
