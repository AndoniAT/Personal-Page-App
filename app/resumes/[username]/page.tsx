import { getUserByUsername, getHomeUserSection } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import MenuResumeUserSkeleton from '@/app/ui/resumes/sekeletons';
import Style1Wrapper from '@/app/ui/resumes/resumesStyles/style1';

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
    console.log('check gome')
    const sendData = {
      user: {
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
        backgroundimage: home.backgroundimage
      }
    }

    console.log('send data!!!');
    console.log(sendData.section);

    return (
      <main>
        <Suspense fallback={<MenuResumeUserSkeleton />}>
          <Style1Wrapper data={sendData}/>
        </Suspense>
      </main>
    );
}