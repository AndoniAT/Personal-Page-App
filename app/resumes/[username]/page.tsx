import { lusitana } from '@/app/ui/fonts';
import { getUserByUsername, getAllUserSections } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/app/resumes/(overview)/layout';

export const metadata: Metadata = {
  title: 'Resume User',
};

  export default async function Page({ params }: { params: { username: string } }) {
    const username = params.username;

    const user = await getUserByUsername( username );
    const sections = await getAllUserSections( username );

    if ( !user ) {
      notFound();
    }

    return (
      <Layout sections={sections}>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-black`}>
          Resume
        </h1>
      </Layout>
    );
  }