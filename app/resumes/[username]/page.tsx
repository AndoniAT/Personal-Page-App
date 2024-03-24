import { lusitana } from '@/app/ui/fonts';
import { getUserByUsername } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Resume User',
};

export default async function Page({ params }: { params: { username: string } }) {
  const username = params.username;

  const user = await getUserByUsername( username );

  if ( !user ) {
    notFound();
  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-black`}>
        Resume
      </h1>
    </main>
  );
}