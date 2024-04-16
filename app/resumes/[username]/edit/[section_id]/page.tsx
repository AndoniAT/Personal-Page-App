import { getUserByUsername, getMediasForSection, putHomeHeroForUser, putProfilePhotoForUser, getProfilePhotoForUser, getUserSection } from '@/app/lib/data';
import { Metadata } from 'next';
import { Suspense } from 'react';
import MenuResumeUserSkeleton from '@/app/ui/resumes/sekeletons';
import CustomEditView from '@/app/ui/resumes/custom/editMode/curstomResume';
import { requiresSessionUserProperty } from '@/app/lib/actions';
import { BlockClient, MediaClient } from '@/app/ui/resumes/custom/interfaces';
import { revalidatePath } from 'next/cache';
import { createElementBlock, createNewBlock, deleteElementBlock, getBlocksSection, updateElementBlock } from '@/app/lib/section/actions';
import { SectionType } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Edit User\'s Section',
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
    await requiresSessionUserProperty( params.username );

    const { username, section_id } = params;
    const user = await getUserByUsername( username );

    let section = await getUserSection( username, section_id );
    //const home = await getHomeUserSection( username );

    const medias = await getMediasForSection( section.section_id ) as MediaClient[];
    let blocks = await getBlocksSection( section.section_id ) as BlockClient[]|[];

    let heroInMedia = medias.find( m => m.ishero );
    
    if( section.type == "Home" as SectionType ) {
      if( heroInMedia ) {
        heroInMedia.update = putHomeHeroForUser;
      } else {
        let hero = { update: putHomeHeroForUser, ishero:true, section_id: section.section_id } as MediaClient;
        medias.push( hero );
      }
    }

    let photo_profile = await getProfilePhotoForUser( user.username ) as MediaClient

    if( section.type == "Home" as SectionType ) {
      if( photo_profile ) {
        photo_profile.update = putProfilePhotoForUser;
      } else {
        photo_profile = { update: putProfilePhotoForUser  } as MediaClient;
      }
    }

    const createBlockBind = async () => {
      'use server'
      try {
        await createNewBlock.call( { section_id: section.section_id, username: user.username } );
        //revalidatePath(`/resumes/${user.username}/edit/${section.section_id}`);
      } catch( err ) {
        console.log( 'err', err );
      }
    }

    // Create function actions for each block (adding or edit an element)
    blocks = blocks.map( block => {
      const createElement = async ( type:string, form:FormData ) => {
        'use server'
        return new Promise( (resolve, reject) => {
          createElementBlock.call( { section_id: section.section_id, username: user.username, block_id: block.block_id, form: form, type:type } )
          .then( () => {
            resolve(true);
            revalidatePath(`/resumes/${user.username}/edit/${section.section_id}`);
          })
          .catch( err => {
            reject( err );
          });
        })
      }

      block.elements = block.elements.map( element => {
        // Create update function for elements
        let updateElement = async ( form:FormData ) => {
          'use server'
          return new Promise( (resolve, reject) => {
            let fn = updateElementBlock;
    
            if ( fn ) {
              fn.call( { section_id: section.section_id, username: user.username, block_id: block.block_id, element_id:element.element_id, form: form } )
              .then( () => {
                resolve(true);
                revalidatePath(`/resumes/${user.username}/edit/${section.section_id}]`);
              })
              .catch( err => {
                reject( err );
              });
            } else {
              reject( 'No function' );
            }
  
          });
        }

        let deleteElement = async () => {
          'use server'
          return new Promise( (resolve, reject) => {
            deleteElementBlock.call( { section_id: section.section_id, username: user.username, block_id: block.block_id, element_id:element.element_id } )
            .then( () => {
              resolve(true);
              revalidatePath(`/resumes/${user.username}/edit/${section.section_id}`);
            })
            .catch( err => {
              reject( err );
            });
          });
        }

        element.actions = {
          updateElement: updateElement,
          deleteElement: deleteElement
        }
        return element;
      });

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
        showheader: user.showheader,
        photo_profile: photo_profile
      },
      section: {
        name: section.name,
        created: section.created,
        type: section.type,
        backgroundcolor: section.backgroundcolor,
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
            <CustomEditView data={sendData}/>
        </Suspense>
      </main>
    );
  }