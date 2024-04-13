'use client';

import {
  HomeIcon, ClipboardDocumentCheckIcon, UserCircleIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { SectionsNavBar } from '@/app/resumes/[username]/interfaces';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface ParamsProps {
  home  :SectionsNavBar|null
  sections:SectionsNavBar[]|[]
}

interface LinkParam {
  name: string,
  href: string,
  icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;
}

const mainLinksObj = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Resumes', href: '/resumes', icon: ClipboardDocumentCheckIcon }
];

export default function NavLinks( { params } : Readonly<{ params: ParamsProps }>) {
  const pathname = usePathname();
  const sections = params.sections;
  const home = params.home;
  const mainLinks = mainLinksObj.map( link => makeLink( link ) );

  let username = null;
  let homeLink = null;
  if( home ) {
    const homeObj = { name: home.name, href: `${pathname}/`, icon: HomeIcon }
    homeLink = makeLink( homeObj );

    username = pathname.split('/')[ 2 ];
  }

  let sectionsLinks = null;
  if( sections.length > 0 ) {
    const sectionsObj = sections.map( s => {
      return { name: s.name, href: `${pathname}/${s.id}`, icon: Squares2X2Icon }
    } );
    sectionsLinks = sectionsObj.map( section => makeLink( section ) );
  }
  
  return (
    <div className='w-full flex-none'>
      <div className='grid grid-rows-* gap-1'>
        {mainLinks}
      </div>
      <div className='grid grid-rows-* gap-1 mt-10'>
        <div className='text-gray-600 font-bold text-lg'>
          {username}
        </div>
        {homeLink}
        {sectionsLinks}
      </div>
    </div>
    
  );
}

/**
 * Create the link with the information in element
 * @param link
 * @returns {Link} Element to put in the nav bar
 */
function makeLink( link:LinkParam ) {
  const LinkIcon = link.icon;

  return (
    <Link
      key={link.name}
      href={link.href}
      className={clsx(
        'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium',
        'bg-gray-50 bg-sky-100 text-blue-600',
        'hover:bg-sky-100 hover:text-blue-600',
        'md:flex-none md:justify-start md:p-2 md:px-3',
        'border-solid border-2 border-slate-400',
        'transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300 '
      )}
    >
      <LinkIcon className="w-6" />
          <p className="block">{link.name}</p>
    </Link>
  );

}