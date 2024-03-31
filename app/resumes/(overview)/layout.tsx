import SideNav from '@/app/ui/resumes/navBar/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden myBackgroundPage">
      <div className="w-full flex-none md:w-80">
        <SideNav sections={[]} user={null} currentSection={null} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}