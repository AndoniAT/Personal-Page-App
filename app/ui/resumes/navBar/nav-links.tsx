import { SectionsNavBar } from '@/app/resumes/[username]/interfaces';
import { User } from 'next-auth';
import { CreateHomeLink, CreateSectionsLink, EditUserPencilLink, GetUsernameSection, MainLinks } from './client/components';
import { auth } from '@/auth';

interface ParamsProps {
  home  :SectionsNavBar|null
  sections:SectionsNavBar[]|[],
  mode?: 'edit',
  user: User|null,
}

export default async function NavLinks( { params } : Readonly<{ params: ParamsProps }>) {
  const sections = params.sections;
  const home = params.home;
  
  let { user, mode } = params;

  let session = await auth();
  
  let isUsersSessionProfile = !( !session || session.user?.email != user?.email);
  let isEdit = ( mode == 'edit');

  return (
    <div className='w-full flex-none'>
      <div className='grid grid-rows-* gap-1'>
        {<MainLinks/>}
      </div>
      <div className='grid grid-rows-* gap-1 mt-10'>
        <div className='text-gray-600 font-bold text-lg flex'>
          {<GetUsernameSection/>}
          { ( isUsersSessionProfile && isEdit ) ? <EditUserPencilLink/> : <></>}
        </div>
        { home ? <CreateHomeLink home={home}></CreateHomeLink> : <></>}
        { <CreateSectionsLink sections={sections}></CreateSectionsLink> }
      </div>
    </div>
    
  );
}