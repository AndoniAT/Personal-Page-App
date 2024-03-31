import SideNav from '@/app/ui/resumes/navBar/sidenav';
import { getUserByUsername, getAllUserSections } from '@/app/lib/data';

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
  const home = sections.find( s => s.type == 'Home' );
  if( !home ) throw new Error('No home page');

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden myBackgroundPage">
      <div className="w-full flex-none md:w-80">
        <SideNav sections={sections} user={user} currentSection={home} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-3">{children}</div>
    </div>
  );
}
