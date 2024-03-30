import Link from 'next/link';
import NavLinks from '@/app/ui/resumes/nav-links';
import { SectionsNavBar } from '@/app/resumes/[username]/interfaces';

import { Section, User } from '../../lib/definitions'; 
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, UserCircleIcon, PencilSquareIcon, EyeIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from '@/auth';
import { goToLogin } from '@/app/lib/actions';
import { redirect } from 'next/dist/server/api-utils';

export default async function SideNav( { sections, user, mode } : { sections: Section[]|[], user: User|null, mode?: 'edit'|never } ) {

  if( sections.length == 0 ) {
    return await createSideNav( { home:null, sections:[], user: null } )
  }

  const home = sections.find( s => s.type == 'Home' );
  if( !home ) throw new Error('No home page');

  const homeSend = constructSection( home );

  // Other sections
  sections = sections.filter( s => s.type != 'Home' ).filter( s => s.public );
  const sectionsSend = sections.filter( s => s.public ).map( s => constructSection( s ) );

  const paramsSend = {
    home: homeSend,
    sections: sectionsSend,
    user: user,
    mode: mode
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
  user: User|null
  mode?: 'edit'|never
}) {
  let { user, mode } = paramsSend;

  let session = await auth();
  
  let isUsersSessionProfile = !( !session || session.user?.email != user?.email);

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
        {
          (isUsersSessionProfile) ? 
              
                (mode == 'edit' ) ?
                <>
                  <Link href={`/resumes/${user?.username}`}>
                    <div className='flex content-center gap-2 cursor-pointer'>
                      <EyeIcon className='stroke-slate-700 w-5'/> 
                      <span className='inline-block text-black align-middle h-fit content-center place-self-center m-l-10'>
                        Visual mode
                      </span>
                    </div>
                  </Link>
                </>
                :
                <>
                  <Link href={`/resumes/${user?.username}/edit/section`}>
                    <div className='flex content-center gap-2 cursor-pointer'>
                      <PencilSquareIcon className='stroke-slate-700 w-5'/> 
                      <span className='inline-block text-black align-middle h-fit content-center place-self-center m-l-10'>
                        Edit mode
                      </span>
                    </div>
                  </Link>
                </>
          : <></>
        }
        <div className="hidden h-auto w-full grow rounded-md myBackgroundPage md:block"></div>
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