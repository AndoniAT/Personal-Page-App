import { getUserByUsername, getHomeUserSection, getMediasForSection } from '@/app/api/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import MenuResumeUserSkeleton from '@/app/ui/resumes/sekeletons';
import Style1Wrapper from '@/app/ui/resumes/resumesStyles/style1';
import { putHomeHeroForUser } from '@/app/api/data';

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

    const sendData = {
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        photo: user.photo,
        email: user.email,
      },
      section: {
        name: home.name,
        created: home.created,
        type: home.type,
        backgroundcolor: home.backgroundcolor,
        backgroundimage: home.backgroundimage,
        medias: medias
      },
      putHomeHeroForUser: putHomeHeroForUser
    }

    return (
      <main>
        <Suspense fallback={<MenuResumeUserSkeleton />}>
          <Style1Wrapper data={sendData}/>
        </Suspense>
      </main>
    );
}