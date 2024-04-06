import { unstable_noStore as noStore } from 'next/cache';
import { requiresSessionUserProperty } from '../actions';
import { getSectionByIdForUser } from '../user/actions';
import { Block, FusionElementsBlock, Section } from '../definitions';
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

export async function createElementTextBlock(this:{ section_id:string, username:string, block_id:string, form:FormData } ) {
  'use server'
    noStore();
    let { section_id, username, block_id, form } = this;
    let content = form.get('content') as string;
    let size = form.get('size') as string;
    let fusionBlocks = JSON.parse( form.get('fusionBlocks') as string ) as FusionElementsBlock;
    console.log('content', content);
    console.log('size', size);
    console.log('fusionBlocks', fusionBlocks);
    
    try {
      await requiresSessionUserProperty( username );

      // Select section
      let section = await getSectionByIdForUser( username, section_id ) as Section|undefined;

      if( !section ) {
        throw new Error( 'Section not found for user' );
      }

      if( !fusionBlocks.from || !fusionBlocks.to ) {
        throw new Error('Not positions given');
      }

      let positions = {
        linefrom: Math.min( fusionBlocks.from.line, fusionBlocks.to.line ),
        lineto: Math.max( fusionBlocks.from.line, fusionBlocks.to.line ),
        colfrom: Math.min( fusionBlocks.from.col, fusionBlocks.to.col ),
        colto: Math.max( fusionBlocks.from.col, fusionBlocks.to.col )
      }

      const defClassName = 'h-full';
      const css = `font-size: ${size}rem;`

      await sql`INSERT INTO ELEMENT(
        linefrom,
        lineto,
        colfrom,
        colto,
        defclassname,
        css,
        content,
        type,
        block_id
      ) VALUES ( 
        ${positions.linefrom}, ${positions.lineto}, 
        ${positions.colfrom}, ${positions.colto},
        ${defClassName},
        ${css},
        ${content},
        ${'text'},
        ${block_id}
      )`

    } catch( error:any ) {
      throw new Error( 'Failed to create the element for block : ' + error?.message );
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