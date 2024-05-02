import { UserClient, SectionsClient, BlockClient } from '../interfaces'
import clsx from 'clsx';
import { TabsResponsive } from './client/blocks';
import TrashButton from '../../../components/trash-button';
import { ButtonPlus, NameEditSectionIcon, ShowHeader } from './client/components';
import CustomSection from '@/app/ui/components/custom-section';
import { revalidateTag } from 'next/cache';
import { deleteSection } from '@/app/lib/section/actions';
import { redirect } from 'next/navigation';
import { customRevalidateTag } from '@/app/lib/actions';
import { MyTooltip } from '@/app/ui/components/tooltip';

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

    let css_string = section.css;
    let css = JSON.parse( css_string );
    let backgroundColor = css.backgroundColor ?? 'rgba(0,0,0,0)';

    let handlerCreateBlock = async () => {
      'use server'
      await section?.actions?.addBlock();
      revalidateTag('edit');
    }

    let deleteThisSection = async () => {
      'use server'
      await deleteSection( section.section_id );
      redirect(`/resumes/${user.username}/`);
    }

    return (
      <div>
        <div className='flex bg-slate-600	flex justify-center'>
          <NameEditSectionIcon
            section={ { section_id: section.section_id, name:section.name } }
            customRevalidateTag={customRevalidateTag}
          />
        </div> 
        {
          <CustomSection style={{ backgroundColor: backgroundColor, minHeight:'90vh' }}
            className={clsx({
              ['w-full']: true,
              ['h-fit pb-10']: true
            })} >
            <div>
              { 
                ( user.showheader && ( section.ishome ) ) ?
                <ShowHeader hero={user.url_hero ?? ''} user_photo_profile={user.url_profile ?? ''}/>
                : <></>
              }
                  <div>
                    <TabsResponsive blocks={section.blocks}/>
                  </div>
            </div>
          </CustomSection>
        }
        {
          ( !section.ishome ) ?
          <div className='flex bg-slate-600	fixed bottom-0 w-full'>
            <TrashButton  
            cancel={async () => {
              'use server'
            }} 
            deleteElement={ deleteThisSection }
            confirmation={{
              title:'Delete Section',
              question:'Are you sure you want to delete this section?'
            }}/> 
            <p className='mt-3 flex items-center text-white'>
              Delete Section
            </p>
          </div> 
          : <></>
          
        }
      </div>
    );
}