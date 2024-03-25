import { lusitana } from '@/app/ui/fonts';
import { getUserByUsername } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import MenuResumeUserSkeleton from '@/app/ui/resumes/sekeletons';
import Style1Wrapper from '@/app/ui/resumes/resumesStyles/style1';

export const metadata: Metadata = {
  title: 'Resume User',
};

export default async function Page(
  { 
    params 
  }: Readonly<{ 
    params: { username: string } 
  }>) {

    const username = params.username;
    const user = await getUserByUsername( username );

    if ( !user ) {
      notFound();
    }

    return (
      <main>
        <Suspense fallback={<MenuResumeUserSkeleton />}>
          <Style1Wrapper/>
        </Suspense>
      </main>
    );
}
/*        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-black`}>
          Resume
        </h1>*/
