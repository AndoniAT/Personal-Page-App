import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import MenuResumeSkeleton from '@/app/ui/skeletons';
import CardUserWrapper from '@/app/ui/resumes/cardsUser';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resumes',
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<MenuResumeSkeleton />}>
          <CardUserWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      </div>
    </main>
  );
}