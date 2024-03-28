import SideNav from '@/app/ui/resumes/sidenav';
import { Section } from '../../lib/definitions'; 
import { getUserByUsername, getAllUserSections } from '@/app/api/data';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { notFound } from 'next/navigation';

export default async function Layout({ 
  children,
  params
}: 
Readonly<{ 
 
  children: React.ReactNode,
  params: { username: string } 
}>) {
  
  const username = params.username;
  let sections = await getAllUserSections( username );
  const user = await getUserByUsername( username );

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden myBackgroundPage">
      <div className="w-full flex-none md:w-80">
        <SideNav sections={sections} user={user} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-3">{children}</div>
    </div>
  );
}
