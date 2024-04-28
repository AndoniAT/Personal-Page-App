import Link from 'next/link';
import NavLinks from '@/app/ui/resumes/navBar/nav-links';
import { SectionsNavBar } from '@/app/resumes/[username]/interfaces';

import { Section, User } from '../../../lib/definitions';
import { PowerIcon, UserCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from '@/auth';
import { goToCreateAccount, goToLogin, goToMyresume } from '@/app/lib/actions';
import EditModeNavBar from './editModeNavBar';
import { MySideNav } from './client/components';

export default async function SideNav( { 
  sections, user, mode, currentSection 
} : { 
  sections: Section[]|[], user?: User, mode?: 'edit', currentSection?:Section 
} ) {
  const home = sections.find( s => s.ishome );
  
  if( sections.length == 0 || !user || !currentSection || !home ) {
    return await createSideNav({});
  }

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
  home?: SectionsNavBar,
  sections?: SectionsNavBar[],
  user?: User,
  mode?: 'edit',
  currentSection?: SectionsNavBar
}) {

  let { user, mode, currentSection } = paramsSend;

  let session = await auth();
  
  let isUsersSessionProfile = !( !session || session.user?.email != user?.email);

  let visualModeNavBar = () => {
    return (
      <Link href={`/resumes/${user?.username}/edit/${currentSection?.section_id}`} className='hidden md:block'>
        <div className='flex content-center gap-2 cursor-pointer dark:text-white'>
          <PencilSquareIcon className='stroke-slate-700 w-5 dark:stroke-white'/> 
          <span className='inline-block text-black dark:text-white align-middle h-fit content-center place-self-center'>
            Edit mode
          </span>
        </div>
      </Link>
    );
  }

  let editModeNavBar = () => {
    if( user ) {
      return <EditModeNavBar data={ { user:user, currentSection: currentSection } }></EditModeNavBar>
    } else {
      return <></>
    }
  };

  return (
      <MySideNav>
        <NavLinks params={paramsSend}/>
        { // Edit or visual section mode 
          (isUsersSessionProfile) ? 
          ( 
            (mode == 'edit') ? editModeNavBar() : visualModeNavBar()
          )
          :
          <></>
        }

        <div className="hidden h-auto w-full grow rounded-md myBackgroundPage md:block invisible
        "></div>
          <div className='w-full dark:bg-slate-200 rounded-lg' style={{margin: '10px 0px 0px 0px'}}>

          { // Nav bar footer 
            session?.user ? (
                    <div className='grid grid-cols-2'>
                        <form
                          action={async () => {
                            'use server';
                            await signOut({ redirect: true, redirectTo:'/'} );
                          }}
                          className='flex justify-center'
                        >
                          <button className="sessionIconsNavBar">
                            <PowerIcon className="w-6 text-blue-600 mr-5" />
                            <div className="text-session-btn">Sign Out</div>
                          </button>
                      </form>
                      <form action={goToMyresume}
                      className='flex justify-center'
                      >
                        <button className="sessionIconsNavBar">
                          <UserCircleIcon className="w-6 text-blue-600 mr-5" />
                          <div className="text-session-btn">My page</div>
                        </button>
                      </form>
                    </div>
            ) : 
            (
              <div className='grid grid-cols-2'>
                  <form action={goToLogin}>
                    <button className="sessionIconsNavBar">
                      <PowerIcon className="w-6 text-blue-600 mr-5" />
                      <div className="text-session-btn">Login</div>
                    </button>
                  </form>
                  <form action={goToCreateAccount}>
                    <button className="sessionIconsNavBar">
                      <UserCircleIcon className="w-10 text-blue-600 mr-5" />
                      <div className="text-session-btn">Create an account</div>
                    </button>
                  </form>
              </div>
            )
          }
          </div>
      </MySideNav>
  );
}

/**
 * Prepare section to send to client
 * @param section 
 */
function constructSection( section:Section ) {
  return {
    section_id: section.section_id,
    name: section.name,
    created: section.created,
    ishome: section.ishome,
    css: section.css
  }
}