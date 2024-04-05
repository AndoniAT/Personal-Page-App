import { unstable_noStore as noStore } from 'next/cache';
import { requiresSessionUserProperty } from '../actions';
import { getSectionByIdForUser } from '../user/actions';
import { Block, Section } from '../definitions';
import { sql } from '@vercel/postgres';

export async function createNewBlock(this:{ section_id:string, username:string}) {
    'use server'
    noStore();
    let { section_id, username } = this;
  
    try {
      await requiresSessionUserProperty( username );
  
      // Select section
      let section = await getSectionByIdForUser( username, section_id ) as Section|undefined;
  
      if( !section ) {
        throw new Error( 'Section not found for user' );
      }
  
      // Get the block with the bigger place
      const defClassName = 'w-full min-h-80 h-fit grid grid-rows-12 grid-cols-12';
  
      await sql`INSERT INTO BLOCK(
        defclassName,
        section_id
      ) VALUES ( ${defClassName}, ${section_id} )`
  
    } catch( error:any ) {
      throw new Error( 'Failed to create a block: ' + error?.message );
    }
}

export async function getBlocksSection( section_id:string ) {
    'use server'
    noStore();
    
    try {
        let res = await sql`SELECT * FROM BLOCK WHERE section_id = ${section_id}`;
        let blocks = res.rows as Block[]|[]

        blocks.forEach( async ( block ) => {
            let res = await sql`SELECT * FROM ELEMENT WHERE
                                    block_id = ${block.block_id}`;
            block.elements = res.rows as Element[];
        } );

        return blocks;

    } catch( error:any ) {
        throw new Error( 'Failed to find a blocks for section: ' + error?.message );
      }
}