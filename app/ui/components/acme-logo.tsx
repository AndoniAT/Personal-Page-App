import { HomeIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none 
      text-white
      dark:text-zinc-800	
      `}
    >
      <HomeIcon className="h-12 w-12 rotate-[15deg] md:w-9" />
      <p className="text-3xl ml-3">Resumes</p>
    </div>
  );
}
