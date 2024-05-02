import { getUserByUsername, getUserSection } from '@/app/lib/data';
import { Metadata } from 'next';
import { Suspense } from 'react';
import MenuResumeUserSkeleton from '@/app/ui/resumes/sekeletons';
import CustomEditView from '@/app/ui/resumes/custom/editMode/curstomResume';
import { requiresSessionUserProperty } from '@/app/lib/actions';
import { BlockClient, BlocksScreenClient } from '@/app/ui/resumes/custom/interfaces';
import { revalidatePath } from 'next/cache';
import { getBlocksSection } from '@/app/lib/section/actions';
import { createNewBlock } from '@/app/lib/blocks/actions';
import { createElementInBlock } from '@/app/lib/elements/actions';

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
    let blocks = await getBlocksSection( section.section_id ) as BlocksScreenClient;

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
    for (const [screen, blocksScreen] of Object.entries(blocks)) {

      blocksScreen.forEach( ( block:BlockClient ) => {
        const createElement = async ( type:string, form:FormData ) => {
          'use server'
          return new Promise( (resolve, reject) => {
            createElementInBlock.call( { section_id: section.section_id, username: user.username, block_id: block.block_id, form: form, type:type } )
            .then( () => {
              resolve(true);
              revalidatePath(`/resumes/${user.username}/edit/${section.section_id}`);
            })
            .catch( err => {
              reject( err );
            });
          })
        }
  
        /*block.elements = block.elements.map( element => {
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
        });*/
  
        block.actions = {
          addElement: createElement
        }

        return block;
      })
    }

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
        section_id:section.section_id,
        name: section.name,
        created: section.created,
        public: section.public,
        ishome: section.ishome,
        css: section.css,
        blocks: blocks,
        actions: {
          addBlock: createBlockBind
        }
      }
    }

    return (
      <main>
        <Suspense fallback={<MenuResumeUserSkeleton />}>
          {
            <CustomEditView data={sendData}/>
          }
        </Suspense>
      </main>
    );
  }