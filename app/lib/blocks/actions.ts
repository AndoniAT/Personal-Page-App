import { unstable_noStore as noStore } from 'next/cache';
import { requiresSessionUserProperty } from '../actions';
import { getSectionByIdForUser } from '../user/actions';
import { Section } from '../definitions';
import { sql } from '@vercel/postgres';

export async function createNewBlock(this:{ section_id:string, username:string}) {
    'use server'
    noStore();
    let { section_id, username } = this;
  
    try {
      //await requiresSessionUserProperty( username );
  
      // Select section
      let section = await getSectionByIdForUser( username, section_id ) as Section|undefined;
  
      if( !section ) {
        throw new Error( 'Section not found for user' );
      }
  
      // Get the block with the bigger place
      let { block_id } = await insertBlock( section_id, undefined, 'def', 12, 4 );
      await insertBlock( section_id, block_id, 'md', 12, 6 );
      await insertBlock( section_id, block_id, 'lg', 12, 8 );
      await insertBlock( section_id, block_id, 'xl', 12, 10 );
      await insertBlock( section_id, block_id, '2xl', 12, 12 );
  
    } catch( error:any ) {
      throw new Error( 'Failed to create a block: ' + error?.message );
    }
}

async function insertBlock( section_id:string, block_id:string|undefined, screen:string, lines:number, cols:number ) {
  let defClassName = `w-full h-fit`;

  return (await sql`INSERT INTO BLOCK(
    numlines,
    numcols,
    defclassName,
    screen,
    section_id,
    block_id_ref
    ) VALUES ( 
      ${lines}, 
      ${cols},
      ${defClassName}, 
      ${screen},
      ${section_id},
      ${block_id}
    )
    RETURNING block_id`).rows[ 0 ];
}