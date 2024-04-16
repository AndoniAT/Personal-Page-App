import { UserClient, SectionsClient, BlockClient } from '../interfaces'
import clsx from 'clsx';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { BuildBlocksEditMode } from './client/blocks';
import TrashButton from '../../../components/trash-button';
import { ButtonPlus, ShowHeader } from './client/components';
import CustomSection from '@/app/ui/components/custom-section';
import { SectionType } from '@/app/lib/definitions';
import { revalidateTag } from 'next/cache';

export default function CustomEditView(
  {
    data
  }: Readonly<{
    data: {
      user: UserClient,
      section: SectionsClient
    }
  }>) {
  const user = data.user;
  const section = data.section;
  const hero = section.medias.find(m => m.ishero);
  let blocks = section.blocks as BlockClient[];

  let handlerCreateBlock = async () => {
    'use server'
    await section?.actions?.addBlock();
    await revalidateTag('edit');
  }

  /*let deleteSection = async () => {
    'use server'
    console.log('delete section');
  }*/

  return (
    <div>
      <CustomSection style={{ backgroundColor: section.backgroundcolor, minHeight:'90vh' }}
        className={clsx({
          ['w-full']: true,
          ['h-fit pb-10']: true
        })} >
        <div>
          { 
            ( user.showheader && ( section.type == 'Home' as SectionType ) ) ?
            <ShowHeader hero={hero} user_photo_profile={user?.photo_profile ?? undefined}/>
            : <></>
          }
              <div className='p-5'>
                {
                    <BuildBlocksEditMode blocks={blocks}/>
                }
              </div>
        </div>
        <div className='grid grid-cols-12 grid-rows-1 h-20'>
          <div className='col-start-6 col-span-2 text-center flex justify-center'>
              <ButtonPlus handler={handlerCreateBlock}/>
          </div>
        </div>
      </CustomSection>
      {
        /*
        <div className='flex bg-slate-600	'>
          <TrashButton  
          cancel={async () => {
            'use server'
          }} 
          deleteElement={ async () => {
            'use server'
            
          }}
          confirmation={{
            title:'Delete Section',
            question:'Are you sure you want to delete this section?'
          }}/> 
          <label className='mt-3 flex items-center text-white'>
            Delete Section
          </label>
        </div> 
        */
      }
    </div>
  );
}