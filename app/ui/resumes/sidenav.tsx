import Link from 'next/link';
import NavLinks from '@/app/ui/resumes/nav-links';
import { SectionsNavBar } from '@/app/resumes/[username]/interfaces';

import { Section } from '../../lib/definitions'; 
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from '@/auth';
import { goToLogin } from '@/app/lib/actions';

export default async function SideNav( { sections } : { sections: Section[]|[] } ) {

  if( sections.length == 0 ) {
    return await createSideNav( { home:null, sections:[]} )
  }

  const home = sections.find( s => s.type == 'Home' );
  if( !home ) throw new Error('No home page');

  const homeSend = constructSection( home );

  // Other sections
  sections = sections.filter( s => s.type != 'Home' ).filter( s => s.visible );
  const sectionsSend = sections.filter( s => s.visible ).map( s => constructSection( s ) );

  const paramsSend = {
    home: homeSend,
    sections: sectionsSend
  }

  return await createSideNav( paramsSend )
}

/**
 * Prepare section to send to client
 * @param section 
 */
function constructSection( section:Section ) {
  return {
    id: section.section_id,
    name: section.name,
    created: section.created,
    type: section.type
  }
}

async function createSideNav( paramsSend : {
  home: SectionsNavBar|null,
  sections: SectionsNavBar[]|[]
}) {
  let session = await auth();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-slate-800 p-4 md:h-30"
        href="/"
      >
        <div className="w-32 text-white md:w-60">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks params={paramsSend}/>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {
          session?.user ? (
                <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div className="text-blue-600 text-sm font-medium">Sign Out</div>
              </button>
            </form>
          ) : 
          (
            <div className='grid grid-cols-2'>
              <form action={goToLogin}>
                <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                  <PowerIcon className="w-6" />
                  <div className="text-blue-600 text-sm font-medium">Login</div>
                </button>
              </form>
              <form action={goToLogin}>
              <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-mediu hover:bg-sky-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <UserCircleIcon className="w-6" />
                <div className="text-blue-600 text-sm font-medium">Create an account</div>
              </button>
            </form>
            </div>
          )
        }
        
      </div>
    </div>
  );
}