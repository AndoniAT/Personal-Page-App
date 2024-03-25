'use client';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 // "use client" - error.tsx needs to be a Client Component.
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.log('Error !', error);
}, [error]);
console.error(error);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-center text-black">Something went wrong! {error?.message}</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}