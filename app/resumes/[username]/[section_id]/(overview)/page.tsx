import { getUserByUsername, getHomeUserSection, getMediasForSection, getProfilePhotoForUser, getUserSection } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import MenuResumeUserSkeleton from '@/app/ui/resumes/sekeletons';
import CustomView from '@/app/ui/resumes/custom/visualMode/customResume';
import { getBlocksSection } from '@/app/lib/section/actions';
import { BlockClient } from '@/app/ui/resumes/custom/interfaces';

export const metadata: Metadata = {
  title: 'Resume Section User',
};

export default async function Page(
  { 
    params 
  }: Readonly<{ 
    params: { 
      username: string,
      section_id: string
    }
  }>) {

    const { username, section_id } = params;

    const user = await getUserByUsername( username );

    if ( !user ) {
      notFound();
    }

    const section = await getUserSection( username, section_id );
    const medias = await getMediasForSection( section.section_id );
    const blocks = await getBlocksSection( section.section_id ) as BlockClient[]|[];

    const sendData = {
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        photo: user.photo,
        email: user.email,
        showheader: user.showheader
      },
      section: {
        section_id: section.section_id,
        name: section.name,
        created: section.created,
        type: section.type,
        backgroundcolor: section.backgroundcolor,
        medias: medias,
        blocks: blocks,
      }
    }

    return (
      <main>
        <Suspense fallback={<MenuResumeUserSkeleton />}>
            {
            <CustomView data={sendData}/>
            }
        </Suspense>
      </main>
    );
}