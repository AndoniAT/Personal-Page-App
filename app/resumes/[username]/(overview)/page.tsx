import { getUserByUsername, getHomeUserSection, getMediasForSection, getProfilePhotoForUser } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import MenuResumeUserSkeleton from '@/app/ui/resumes/sekeletons';
import CustomView from '@/app/ui/resumes/custom/visualMode/customResume';
import { getBlocksSection } from '@/app/lib/section/actions';
import { BlockClient } from '@/app/ui/resumes/custom/interfaces';

export const metadata: Metadata = {
  title: 'Resume User',
};

export default async function Page(
  { 
    params 
  }: Readonly<{ 
    params: { 
      username: string 
    }
  }>) {

    const username = params.username;

    const user = await getUserByUsername( username );

    if ( !user ) {
      notFound();
    }

    const home = await getHomeUserSection( username );
    const medias = await getMediasForSection( home.section_id );
    let photo_profile = await getProfilePhotoForUser( user.username );
    const blocks = await getBlocksSection( home.section_id ) as BlockClient[]|[];

    const sendData = {
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        photo: user.photo,
        email: user.email,
        showheader: user.showheader,
        photo_profile: photo_profile
      },
      section: {
        name: home.name,
        created: home.created,
        type: home.type,
        backgroundcolor: home.backgroundcolor,
        backgroundimage: home.backgroundimage,
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