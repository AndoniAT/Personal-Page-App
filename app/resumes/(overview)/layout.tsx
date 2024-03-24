import SideNav from '@/app/ui/resumes/sidenav';
import { Section } from '../../lib/definitions'; 

interface LayoutProps {
  children: React.ReactNode;
  sections: Section[]
}

export default function Layout({ children, sections }: LayoutProps) {

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-slate-100">
      <div className="w-full flex-none md:w-80">
        <SideNav sections={sections} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}