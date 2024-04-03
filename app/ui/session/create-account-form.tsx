'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { createAccount } from '@/app/lib/createAccount';

export default function CreateAccountForm() {
  const initialState = { message: '', errors:{ firstname:[], lastname:[], username:[], email:[], password:[], confirm:[]} };
  const [state, dispatch] = useFormState(createAccount, initialState);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 border-solid border-2 border-slate-400 from-current">
        <div className="w-full">
          <div className='grid grid-rows-1 grid-cols-2 gap-3'>
            <div className='firstname'>
              <label
                className={`${lusitana.className} mb-3 mt-5 block text-xl font-xs text-gray-900`}
                htmlFor="firstname"
              >
                Firstname
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black-200 text-black"
                  id="firstname"
                  type="text"
                  name="firstname"
                  placeholder="Firstname"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="firstname-error" aria-live="polite" aria-atomic="true">
                { state.errors.firstname && showErrors( state?.errors.firstname ) }
              </div>
            </div>
            <div className='lastname'>
              <label
                className={`${lusitana.className} mb-3 mt-5 block text-xl font-xs text-gray-900`}
                htmlFor="lastname"
              >
                Lastname
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black-200 text-black"
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="lastname-error" aria-live="polite" aria-atomic="true">
                { state.errors.lastname && showErrors( state?.errors.lastname ) }
              </div>
            </div>
          </div>
          <div className='username'>
            <label
              className={`${lusitana.className} mb-3 mt-5 block text-xl font-xs text-gray-900`}
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
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="username-error" aria-live="polite" aria-atomic="true">
                { state.errors.username && showErrors( state?.errors.username ) }
            </div>
          </div>
          <div className='email'>
            <label
              className={`${lusitana.className} mb-3 mt-5 block text-xl font-xs text-gray-900`}
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black-200 text-black"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />              
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
                { state.errors.email && showErrors( state?.errors.email ) }
            </div>
          </div>
          <div className='password'>
            <label
              className={`${lusitana.className} mb-3 mt-5 block text-xl font-xs text-gray-900`}
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
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {
                /* id="password-error" : This id attribute uniquely identifies the HTML element that holds the error message for the select input. This is necessary for aria-describedby to establish the relationship. */
                /* aria-live="polite" The screen reader should politely notify the user when the error inside the div is updated. When the content changes (e.g. when a user corrects an error), the screen reader will announce these changes, 
                but only when the user is idle so as not to interrupt them. */

                state.errors.password && showErrors( state?.errors.password )
              }

            </div>
          </div>
          <div className='confirm'>
            <label
              className={`${lusitana.className} mb-3 mt-5 block text-xl font-xs text-gray-900`}
              htmlFor="confirm"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black-200 text-black"
                id="confirm"
                type="password"
                name="confirm"
                placeholder="Confirm your password"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="confirm-error" aria-live="polite" aria-atomic="true">
                { state.errors.confirm && showErrors( state?.errors.confirm ) }
            </div>
          </div>
        </div>
        <CreateAccountButton />
      </div>
    </form>
  );
}

function CreateAccountButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="mt-4 w-full" aria-disabled={pending}>
        Create Account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
      <div>
        <span className='text-black text-sm'> Do you already have an account? </span>
        <Link
        href="/login"
        className="mt-4 text-sm text-blue transition-colors text-blue-500"
      >
        Sign in
      </Link>
      </div>
    </>
  );
}

function showErrors( errors:any[]) {
  return errors.map( ( error: string ) => (
    <p className="mt-2 text-sm text-red-500" key={error}>
      {error}
    </p>
  ))
}