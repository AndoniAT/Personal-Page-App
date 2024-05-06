import { SectionsNavBar } from '@/app/resumes/[username]/interfaces';
import { CreateHomeLink, CreateSectionsLink, EditUserPencilLink, FollowButton, GetUsernameSection, MainLinks } from './client/components';
import { auth } from '@/auth';
import { Button } from '../../components/button';
import { User } from '@/app/lib/definitions';
import { revalidateTag } from 'next/cache';
import { customRevalidateTag } from '@/app/lib/actions';

interface ParamsProps {
  home?: SectionsNavBar
  sections?: SectionsNavBar[],
  mode?: 'edit',
  user?: User,
  currentSection?: SectionsNavBar,
  session_username?: string
}

export default async function NavLinks( { params } : Readonly<{ params: ParamsProps }>) {
  const { 
    user,
    mode,
    sections, 
    home, 
    currentSection,
    session_username
  } = params;

  let session = await auth();
  
  let isUsersSessionProfile = !( !session || session.user?.email != user?.email);
  let isEdit = ( mode == 'edit');

  return (
    <div className='w-full flex-none'>
      <div className='grid grid-rows-* gap-1'>
        {<MainLinks/>}
      </div>
      <div className='grid grid-rows-* gap-1 mt-10'>
        <div className={`font-bold text-lg flex
        text-gray-600 
        dark:text-white
        items-center
        `}>
          {<GetUsernameSection/>}
          { ( isUsersSessionProfile && isEdit ) ? <EditUserPencilLink/> : <></>}
          { ( user && !isUsersSessionProfile ) ? 
            <FollowButton user_session={session_username}/>:
            <></> 
          }
        </div>
        {
          ( currentSection ) ?
            <>
              { 
                ( home ) ? 
                  <CreateHomeLink home={home} current={currentSection.section_id == home.section_id}></CreateHomeLink> : <></>
              }

              <CreateSectionsLink sections={sections} currentSection={currentSection}></CreateSectionsLink>
            </>
          
          :<></>
        }
      </div>
    </div>
    
  );
}