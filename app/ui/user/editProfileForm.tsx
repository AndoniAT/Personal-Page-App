'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormState, useFormStatus } from 'react-dom';
import { createAccount } from '@/app/lib/user/createAccount';
import { Button } from '@/app/ui/components/button';
import { User } from '@/app/lib/definitions';
import { modifyProfile } from '@/app/lib/user/modifyProfile';
import { useEffect, useState } from 'react';
import TrashButton from '../components/trash-button';

export default function EditProfileForm({
  user
}:
Readonly<{
  user:User
}>) {

  const initialState = { message: '', errorss:{ user_id:[], firstname:[], lastname:[], username:[], email:[], password:[], confirm:[]} };
  const [state, dispatch] = useFormState(modifyProfile, initialState);

  const [ bgButton, setBgButton ] = useState<string>('bg-blue-500');
  const [ bgButtonHover, setBgButtonHover ] = useState<string>('hover:bg-blue-400');

  useEffect(() => {
    if( state.message == 'OK' ) { 
      setBgButton('bg-green-500');
      setBgButtonHover('hover:bg-green-400');
      setTimeout(() => {
        setBgButton('bg-blue-500');
        setBgButtonHover('hover:bg-blue-400');
      }, 2000);
    }
  }, [ state ]);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 border-solid border-2 border-slate-400 from-current">
        <div className="w-full">
          <div className='grid grid-rows-1 grid-cols-2 gap-3'>
            <div className='user_id hidden'>
              <div className="relative">
                <input
                  className="hidden"
                  id="user_id"
                  type="text"
                  name="user_id"
                  placeholder="user_id"
                  defaultValue={user.user_id}
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="user_id-error" aria-live="polite" aria-atomic="true">
                { state?.errorss?.user_id && showErrors( state.errorss.user_id ) }
              </div>
            </div>
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
                  defaultValue={user.firstname}
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="firstname-error" aria-live="polite" aria-atomic="true">
                { state?.errorss?.firstname && showErrors( state?.errorss.firstname ) }
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
                  defaultValue={user.lastname}
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <div id="lastname-error" aria-live="polite" aria-atomic="true">
                { state?.errorss?.lastname && showErrors( state?.errorss.lastname ) }
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
                defaultValue={user.username}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="username-error" aria-live="polite" aria-atomic="true">
                { state?.errorss?.username && showErrors( state?.errorss.username ) }
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
                defaultValue={user.email}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />              
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
                { state?.errorss?.email && showErrors( state?.errorss.email ) }
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
                placeholder="Enter a new password"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {
                /* id="password-error" : This id attribute uniquely identifies the HTML element that holds the error message for the select input. This is necessary for aria-describedby to establish the relationship. */
                /* aria-live="polite" The screen reader should politely notify the user when the error inside the div is updated. When the content changes (e.g. when a user corrects an error), the screen reader will announce these changes, 
                but only when the user is idle so as not to interrupt them. */

                state?.errorss?.password && showErrors( state?.errorss.password )
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
                { state?.errorss?.confirm && showErrors( state?.errorss.confirm ) }
            </div>
          </div>
        </div>
        <EditProfileBtn color={bgButton} hover={bgButtonHover}/>
      </div>
    </form>
  );
}

function EditProfileBtn({
  color,
  hover
}:Readonly<{
  color:string,
  hover:string
}>) {
  const { pending } = useFormStatus();
  let classname = `mt-4 w-full ${color} ${hover}`;
  return (
      <Button className={classname} aria-disabled={pending}>
        Update <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
  );
}

function showErrors( errorss:any[]) {
  if( errorss.length > 0 ) {
    return errorss.map( ( error: string ) => (
      <p className="mt-2 text-sm text-red-500" key={error}>
        {error}
      </p>
    ))
  } else {
    return <></>
  }
}