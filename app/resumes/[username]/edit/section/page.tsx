import { getUserByUsername, getHomeUserSection, getMediasForSection, putHomeHeroForUser, putProfilePhotoForUser, getProfilePhotoForUser } from '@/app/lib/data';
import { Metadata } from 'next';
import { Suspense } from 'react';
import MenuResumeUserSkeleton from '@/app/ui/resumes/sekeletons';
import { Style1EditView } from '@/app/ui/resumes/resumesStyles/style1';
import { requiresSessionUserProperty } from '@/app/lib/actions';
import { MediaClient } from '@/app/ui/resumes/resumesStyles/interfaces';

export const metadata: Metadata = {
  title: 'Edit User\'s Section',
};

export default async function Page(
  { 
    params 
  }: Readonly<{ 
    params: { 
      username: string 
    } 
  }>) {
    await requiresSessionUserProperty( params.username );

    const username = params.username;
    const user = await getUserByUsername( username );

    const home = await getHomeUserSection( username );
    const medias = await getMediasForSection( home.section_id ) as MediaClient[];

    
    let heroInMedia = medias.find( m => m.ishero );
    
    if( heroInMedia ) {
      heroInMedia.update = putHomeHeroForUser;
    } else {
      let hero = { update: putHomeHeroForUser, ishero:true, section_id: home.section_id } as MediaClient;
      medias.push( hero );
    }

    let photo_profile = await getProfilePhotoForUser( user.username ) as MediaClient
  
    if( photo_profile ) {
      photo_profile.update = putProfilePhotoForUser;
    } else {
      photo_profile = { update: putProfilePhotoForUser  } as MediaClient;
    }

    const sendData = {
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        photo: user.photo,
        email: user.email,
        photo_profile: photo_profile
      },
      section: {
        name: home.name,
        created: home.created,
        type: home.type,
        backgroundcolor: home.backgroundcolor,
        backgroundimage: home.backgroundimage,
        medias: medias
      }
    }

    return (
      <main>
        <Suspense fallback={<MenuResumeUserSkeleton />}>
            <Style1EditView data={sendData}/>
        </Suspense>
      </main>
    );
  }