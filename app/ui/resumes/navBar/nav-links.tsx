import { SectionsNavBar } from '@/app/resumes/[username]/interfaces';
import { User } from 'next-auth';
import { CreateHomeLink, CreateSectionsLink, EditUserPencilLink, GetUsernameSection, MainLinks } from './client/components';
import { auth } from '@/auth';

interface ParamsProps {
  home  :SectionsNavBar|null
  sections:SectionsNavBar[]|[],
  mode?: 'edit',
  user: User|null,
  currentSection:SectionsNavBar|null
}

export default async function NavLinks( { params } : Readonly<{ params: ParamsProps }>) {
  const { 
    user,
    mode,
    sections, 
    home, 
    currentSection
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
        dark:text-white`}>
          {<GetUsernameSection/>}
          { ( isUsersSessionProfile && isEdit ) ? <EditUserPencilLink/> : <></>}
        </div>
        {
          ( currentSection ) ?
            <>
              { ( home ) ? <CreateHomeLink home={home} current={currentSection.section_id == home.section_id}></CreateHomeLink> : <></>}
              <CreateSectionsLink sections={sections} currentSection={currentSection}></CreateSectionsLink>
            </>
          
          :<></>
        }
      </div>
    </div>
    
  );
}