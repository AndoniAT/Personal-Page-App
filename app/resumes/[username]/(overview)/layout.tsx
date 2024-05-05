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
  const home = sections.find( s => s.ishome );

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden myBackgroundPage">
        <SideNav sections={sections} user={user} currentSection={home} />
      <div className="flex-grow p-2 md:overflow-y-auto md:p-3">{
        children
      }</div>
    </div>
  );
}
