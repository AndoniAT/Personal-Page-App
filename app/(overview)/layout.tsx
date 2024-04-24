import SideNav from '@/app/ui/resumes/navBar/sidenav';

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {  
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <SideNav sections={[]} user={null} currentSection={null} />
      <div className="flex-grow md:overflow-y-auto lg:p-12">
        {children}
      </div>
    </div>
  );
}