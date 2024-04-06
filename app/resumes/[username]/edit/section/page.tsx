import { getUserByUsername, getHomeUserSection, getMediasForSection, putHomeHeroForUser, putProfilePhotoForUser, getProfilePhotoForUser } from '@/app/lib/data';
import { Metadata } from 'next';
import { Suspense } from 'react';
import MenuResumeUserSkeleton from '@/app/ui/resumes/sekeletons';
import { Style1EditView } from '@/app/ui/resumes/resumesStyles/style1';
import { requiresSessionUserProperty } from '@/app/lib/actions';
import { BlockClient, MediaClient } from '@/app/ui/resumes/resumesStyles/interfaces';
import { revalidatePath } from 'next/cache';
import { createElementTextBlock, createNewBlock, getBlocksSection } from '@/app/lib/section/actions';
import { Block } from '@/app/lib/definitions';

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
    let blocks = await getBlocksSection( home.section_id ) as BlockClient[]|[];

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

    const createBlockBind = async () => {
      'use server'
      try {
        await createNewBlock.call( { section_id: home.section_id, username: user.username } );
        revalidatePath(`/resumes/${user.username}/edit/section`);
      } catch( err ) {
        console.log( 'err', err );
      }
    }

    // Create function actions for each block (adding or edit an element)
    blocks = blocks.map( block => {
      const createElement = async ( type:string , form:FormData ) => {
        'use server'
        return new Promise( (resolve, reject) => {
          let fn = null;
          switch( type ) {
            case 'text':
              fn = createElementTextBlock;
              break;
            case 'media':
              break;
            case 'linkvideo':
              break;
            case 'html':
              break;
          }
  
          if ( fn ) {
            fn.call( { section_id: home.section_id, username: user.username, block_id: block.block_id, form: form } )
            .then( () => {
              resolve(true);
              revalidatePath(`/resumes/${user.username}/edit/section`);
            })
            .catch( err => {
              reject( err );
            });
          } else {
            reject( 'No function' );
          }

        })
      }
      block.actions = {
        addElement: createElement
      }
      return block;
    })

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
        medias: medias,
        blocks: blocks,
        actions: {
          addBlock: createBlockBind
        }
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