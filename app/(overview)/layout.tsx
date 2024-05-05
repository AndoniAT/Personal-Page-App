import SideNav from '@/app/ui/resumes/navBar/sidenav';

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {  
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <SideNav sections={[]}/>
      <div className="flex-grow md:overflow-y-auto p-4 lg:p-12">
        {children}
      </div>
    </div>
  );
}