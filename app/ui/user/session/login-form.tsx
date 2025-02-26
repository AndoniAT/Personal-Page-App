'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../../components/button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/login';
import Link from 'next/link';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 border-solid border-2 border-slate-400 from-current">
        <div className="w-full">
          <div>
            <label
              className={`${lusitana.className} mb-3 mt-5 block text-xl font-medium text-gray-900`}
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black-200 text-black"
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className={`${lusitana.className} mb-3 mt-5 block text-xl font-medium text-gray-900`}
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black-200 text-black"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="mt-4 w-full" aria-disabled={pending}>
        Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
      <div>
        <span className='text-black text-sm'> You don&apos;t have an account? </span>
        <Link
        href="/createAccount"
        className="mt-4 text-sm text-blue transition-colors text-blue-500"
      >
        Create an account
      </Link>
      </div>
    </>
  );
}
