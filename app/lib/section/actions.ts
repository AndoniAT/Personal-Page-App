import { unstable_noStore as noStore } from 'next/cache';
import { requiresSessionUserProperty } from '../actions';
import { getSectionByIdForUser } from '../user/actions';
import { Block, ElementBlock, FusionElementsBlock, Section } from '../definitions';
import { sql } from '@vercel/postgres';
import { insertMedia } from '@/app/lib/media/actions';
import { utapi } from '@/server/uploadthing';

const fsp = require('fs').promises

const TYPESELEMENT = {
  text: 'text',
  media: 'media',
  linkvideo: 'linkvideo',
  html: 'html'
}

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

export async function createElementBlock(this:{ section_id:string, username:string, block_id:string, form:FormData, type:string } ) {
  'use server'
    noStore();
    let { section_id, username, block_id, form, type } = this;
    let fusionBlocks = JSON.parse( form.get('fusionBlocks') as string ) as FusionElementsBlock;
    
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

      let newPositionsToOcupe = getOcupedPositions( positions );

      // GET ELEMENTS FOR BLOCK
      let res = await sql`SELECT * FROM ELEMENT WHERE block_id=${block_id}`;
      
      if( res.rowCount > 0 ) {
        let elements = res.rows as ElementBlock[];
        let currentOcupedPositions:{line:number, col:number}[] = [];
        
        elements.forEach( el => {
          currentOcupedPositions = [ ...currentOcupedPositions, ...getOcupedPositions( el ) ];
        } );
        
        let Collision = !checkNoCollisionOfElements( newPositionsToOcupe, currentOcupedPositions );
        if( Collision ) {
          throw new Error( 'Collision of blocks' );
        }

      }

      let content = form.get('content') as string;
      const defClassName = 'h-full';
      let css = `{}`
      let media_id = null;
      switch( type ) {
        case TYPESELEMENT.text:
          /*let size = form.get('size') as string;*/
          css = `{"fontSize": "1rem", "wordWrap": "break-word", "display": "inline-flex", "height": "100%", "width":"100%"}`;
          break;
        case TYPESELEMENT.media:
          /*css = `{"position": "unset", "objectFit": "cover" }`;*/
          media_id = await insertMedia(section_id, form ) as string;
          break;
        case TYPESELEMENT.html:
          css = `{"height": "100%"}`;
          break;
        case TYPESELEMENT.linkvideo:
          // doing nothing
          break;
        default: {
          throw new Error('Not recognized type');
        }
      }

      //const css = `{"fontSize": "${size}rem", "wordWrap": "break-word"}`

      await sql`INSERT INTO ELEMENT(
        linefrom,
        lineto,
        colfrom,
        colto,
        defclassname,
        css,
        content,
        type,
        block_id,
        media_id
      ) VALUES ( 
        ${positions.linefrom}, ${positions.lineto}, 
        ${positions.colfrom}, ${positions.colto},
        ${defClassName},
        ${css},
        ${content},
        ${type},
        ${block_id},
        ${media_id}
      )`

    } catch( error:any ) {
      throw new Error( 'Failed to create the element for block : ' + error?.message );
    }
    

}

export async function updateElementBlock(this:{ section_id:string, username:string, block_id:string, element_id:string, form:FormData } ) {
  'use server'
  noStore();
  let { section_id, username, block_id, element_id, form } = this;

  try {
    await requiresSessionUserProperty( username );

    // Select section
    let section = await getSectionByIdForUser( username, section_id ) as Section|undefined;

    if( !section ) {
      throw new Error( 'Section not found for user' );
    }

    let element_res = await sql`SELECT * FROM ELEMENT WHERE element_id = ${element_id}`;
    let element = element_res.rows[ 0 ] as ElementBlock;

    if( element ) {
      await updateElementText( block_id, element, form );
      /*switch( element.type ) {
      case TYPESELEMENT.text : {
      case TYPESELEMENT.media : {
          break;
        }
      }*/
    }

  } catch( error:any ) {
      throw new Error( 'Failed to update the element for block : ' + error?.message );
  }
  
}

export async function deleteElementBlock(this:{ section_id:string, username:string, block_id:string, element_id:string } ) {
  'use server'
  noStore();
  let { section_id, username, block_id, element_id } = this;

  try {
    await requiresSessionUserProperty( username );

    // Select section
    let section = await getSectionByIdForUser( username, section_id ) as Section|undefined;

    if( !section ) {
      throw new Error( 'Section not found for user' );
    }
    
    let { media_id } = (await sql`SELECT media_id FROM ELEMENT WHERE element_id=${element_id}`).rows[ 0 ];
    let media = (await sql`SELECT key FROM MEDIA WHERE media_id=${media_id}`).rows[ 0 ];

    if( media ) {
      let { key } = media;
      // DELETE media releated
      await sql`DELETE FROM MEDIA WHERE media_id = ${media_id}`; // From database
      console.log('delete file', key);
      await utapi.deleteFiles([key]); // From uploadthing
    }

    let res = await sql`DELETE FROM ELEMENT WHERE element_id = ${element_id} AND
    block_id = ${block_id}`;
    return res;

  } catch( error:any ) {
    throw new Error( 'Failed to delete the element for block : ' + error?.message );
  }
}

export async function getBlocksSection( section_id:string ) {
    'use server'
    noStore();
    
    try {
        let res = await sql`SELECT * FROM BLOCK WHERE section_id = ${section_id}`;
        let blocks = res.rows as Block[]|[]

        for (let index = 0; index < blocks.length; index++) {
          const block = blocks[index];
         
            let res = await sql`SELECT * FROM ELEMENT WHERE
                                    block_id = ${block.block_id}`;
            block.elements = res.rows as Element[];
        };
        return blocks;

    } catch( error:any ) {
        throw new Error( 'Failed to find a blocks for section: ' + error?.message );
      }
}

/**
 * 
 */
function getOcupedPositions( positions:{linefrom:number, lineto:number, colfrom:number, colto:number} ) {
  let newPositionsToOcupe:{line:number, col:number}[] = [];
  for (let line = positions.linefrom; line <= positions.lineto; line++) {
    for (let col = positions.colfrom; col <= positions.colto; col++) {
      let pos = { line: line, col: col};
      newPositionsToOcupe.push( pos );
    }
  }
  return newPositionsToOcupe;
}

/**
 * Detect a collition between two elements and avoid to create the block
 * @param element1
 * @param element2
 * @returns 
 */
function checkNoCollisionOfElements( element1:{line:number, col:number}[], element2:{line:number, col:number}[]) {
  let accept = true;
  for (let i = 0; i < element2.length; i++) {
    let pos = element2[ i ];
    let collition = element1.some( e => e.line == pos.line && e.col == pos.col );
    if( collition ) {
      accept = false;
      break;
    }
  }
  return accept;
}

async function updateElementText( block_id:string, element:ElementBlock, form:FormData ) {
  let target = form.get('target') as string;

  switch( target ) {
      case 'content': {    
        let content = form.get('content') as string;
        await sql`UPDATE ELEMENT
        SET content = ${content}
        WHERE block_id = ${block_id} AND element_id = ${element.element_id}`;
        break;
      }
      case 'backgroundColor':
      case 'color':
      case 'borderColor':
      case 'justifyContent':
      case 'alignItems':
        await getAndUpdateFormAttribute( target, block_id, element, form, '' );
        break;
      case 'fontSize':
      case 'paddingLeft':
      case 'paddingTop':
      case 'paddingRight':
      case 'paddingBottom':
      case 'borderTopLeftRadius':
      case 'borderBottomLeftRadius':
      case 'borderTopRightRadius':
      case 'borderBottomRightRadius':
      case 'borderWidth':
        console.log('check', element);
        await getAndUpdateFormAttribute( target, block_id, element, form, 'rem' );
        break;
      case 'customclassname': {
        let newCustomClass = form.get('customclassname') as string;
        console.log('new custom', newCustomClass + 'j');

        const regex =  /^[a-zA-Z0-9- ]+$/;
        
        if (regex.test(newCustomClass)) {
          await sql`UPDATE ELEMENT
          SET customclassname = ${newCustomClass}
          WHERE block_id = ${block_id} AND element_id = ${element.element_id}`; 
        } else {
          throw new Error('No valid expression')
        }
        break;
      }
  }
}

/**
 * 
 * @param attr 
 * @param block_id 
 * @param element 
 * @param form 
 * @param unity 
 * @returns 
 */
function getAndUpdateFormAttribute( attr:string, block_id:string, element:ElementBlock, form:FormData, unity:string ) {
  let attributeValue = form.get(attr) as string;
  let css = ( element.css ) ? JSON.parse( element.css ) : {};
  css[ attr ] = attributeValue+unity;
  css = JSON.stringify(css);
  return updateBlockCss( block_id, element.element_id, css );
}

/**
 * 
 * @param block_id 
 * @param element_id 
 * @param newcss
 * @returns 
 */
function updateBlockCss( block_id:string, element_id:string, newcss:string ) {
  return sql`UPDATE ELEMENT
        SET css = ${newcss}
        WHERE block_id = ${block_id} AND element_id = ${element_id}`; 
}