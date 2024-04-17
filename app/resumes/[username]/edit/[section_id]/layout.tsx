import SideNav from '@/app/ui/resumes/navBar/sidenav';
import { getUserByUsername, getAllUserSections, getHomeUserSection } from '@/app/lib/data';

export default async function Layout({ 
  children,
  params
}: 
Readonly<{ 
 
  children: React.ReactNode,
  params: { username: string, section_id: string } 
}>) {
  const { username, section_id } = params;
  let sections = await getAllUserSections( username );
  const user = await getUserByUsername( username );
  const section = sections.find( s => s.section_id == section_id );

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden myBackgroundPage">
      { /* <div className="w-full flex-none md:w-80"> */ }
      <SideNav sections={sections} user={user} mode={'edit'} currentSection={section || null} />
      <div className="flex-grow p-6 md:overflow-y-auto md:p-3">{children}</div>
    </div>
  );
}