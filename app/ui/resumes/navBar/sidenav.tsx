import Link from 'next/link';
import NavLinks from '@/app/ui/resumes/nav-links';
import { SectionsNavBar } from '@/app/resumes/[username]/interfaces';

import { Section, User } from '../../../lib/definitions'; 
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, UserCircleIcon, PencilSquareIcon, EyeIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from '@/auth';
import { goToCreateAccount, goToLogin, goToMyresume } from '@/app/lib/actions';
import { redirect } from 'next/dist/server/api-utils';
import EditModeNavBar from './editModeNavBar';
import { changeBackgroundSection } from '@/app/lib/data';

export default async function SideNav( { sections, user, mode, currentSection } : { sections: Section[]|[], user: User|null, mode?: 'edit'|never, currentSection:Section|null } ) {

  if( sections.length == 0 || !user || !currentSection ) {
    return await createSideNav({ home:null, sections:[], user:null, currentSection:null });
  }

  const home = sections.find( s => s.type == 'Home' );
  if( !home ) throw new Error('No home page');

  // Other sections
  sections = sections.filter( s => s.section_id != home.section_id ).filter( s => s.public );

  const homeSend = constructSection( home );
  const currentSectionSend = constructSection( currentSection );
  const sectionsSend = sections.filter( s => s.public ).map( s => constructSection( s ) );

  const paramsSend = {
    home: homeSend,
    sections: sectionsSend,
    user: user,
    mode: mode,
    currentSection: currentSectionSend
  }

  return await createSideNav( paramsSend )
}

async function createSideNav( paramsSend : {
  home: SectionsNavBar|null,
  sections: SectionsNavBar[]|[],
  user: User|null,
  mode?: 'edit',
  currentSection: SectionsNavBar|null
}) {
  let { user, mode, currentSection } = paramsSend;

  let session = await auth();
  
  let isUsersSessionProfile = !( !session || session.user?.email != user?.email);

  let visualModeNavBar = () => {
    return (
      <Link href={`/resumes/${user?.username}/edit/section`}>
        <div className='flex content-center gap-2 cursor-pointer'>
          <PencilSquareIcon className='stroke-slate-700 w-5'/> 
          <span className='inline-block text-black align-middle h-fit content-center place-self-center'>
            Edit mode
          </span>
        </div>
      </Link>
    );
  }

  let editModeNavBar = () => {
    if( currentSection )
    currentSection.background.update = currentSection ? changeBackgroundSection : currentSection
    return <EditModeNavBar data={ { username:user?.username || '', currentSection: currentSection } }></EditModeNavBar>
  };

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
            ( 
              (mode == 'edit') ? editModeNavBar() : visualModeNavBar()
            )
          :
           <></>
        }

        <div className="hidden h-auto w-full grow rounded-md myBackgroundPage md:block"></div>
        {
          session?.user ? (
                <div className='grid grid-cols-2'>
                    <form
                      action={async () => {
                        'use server';
                        await signOut();
                      }}
                    >
                      <button className="sessionIconsNavBar">
                        <PowerIcon className="w-6" />
                        <div className="text-blue-600 text-sm font-medium">Sign Out</div>
                      </button>
                  </form>
                  <form action={goToMyresume}>
                    <button className="sessionIconsNavBar">
                      <UserCircleIcon className="w-6" />
                      <div className="text-blue-600 text-sm font-medium">My resume</div>
                    </button>
                  </form>
                </div>
          ) : 
          (
            <div className='grid grid-cols-2'>
              <form action={goToLogin}>
                <button className="sessionIconsNavBar">
                  <PowerIcon className="w-6" />
                  <div className="text-blue-600 text-sm font-medium">Login</div>
                </button>
              </form>
              <form action={goToCreateAccount}>
                <button className="sessionIconsNavBar">
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

/**
 * Prepare section to send to client
 * @param section 
 */
function constructSection( section:Section ) {
  return {
    id: section.section_id,
    name: section.name,
    created: section.created,
    type: section.type,
    background: {
      color: section.backgroundcolor
    }
  }
}