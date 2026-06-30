import Link from 'next/link';

import { ROUTER_PATH } from '@/constants';

interface ReminderProps {
  view: 'Registration' | 'Login' | 'Remember' | 'Forgot';
}

export const Reminder = ({ view }: ReminderProps) => {
  return (
    <>
      {view === 'Registration' && (
        <p className="flex flex-col gap-[5px] text-accent">
          Already have an account?
          <Link className="w-fit text-main" href={ROUTER_PATH.SIGNIN}>
            Login
          </Link>
        </p>
      )}
      {view === 'Login' && (
        <p className="flex flex-col gap-[5px] text-accent">
          Dont have an account?
          <Link className="w-fit text-main" href={ROUTER_PATH.SIGNUP}>
            Signup
          </Link>
        </p>
      )}
      {view === 'Remember' && (
        <p className="flex flex-col gap-[5px] text-accent">
          Remember password?
          <Link className="w-fit text-main" href={ROUTER_PATH.SIGNIN}>
            Login
          </Link>
        </p>
      )}
      {view === 'Forgot' && (
        <Link
          className="flex w-fit flex-col gap-[5px] text-accent duration-300 hover:text-foreground"
          href={ROUTER_PATH.RECOVERYPASSWORD}
        >
          Forgot password?
        </Link>
      )}
    </>
  );
};
