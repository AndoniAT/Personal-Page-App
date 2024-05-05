import { getUserByUsername, getHomeUserSection, getProfilePhotoForUser } from '@/app/lib/data';
import { getMediasForUser } from '@/app/lib/user/actions';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import MenuResumeUserSkeleton from '@/app/ui/resumes/sekeletons';
import CustomView from '@/app/ui/resumes/custom/visualMode/customResume';
import { getBlocksSection } from '@/app/lib/section/actions';
import { BlockClient, BlocksScreenClient } from '@/app/ui/resumes/custom/interfaces';

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
    const blocks = await getBlocksSection( home.section_id ) as BlocksScreenClient;

    const sendData = {
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        showheader: user.showheader,
        url_profile: user.url_profile,
        url_hero: user.url_hero,
      },
      section: {
        section_id: home.section_id,
        name: home.name,
        created: home.created,
        public: home.public,
        ishome: home.ishome,
        css: home.css,
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