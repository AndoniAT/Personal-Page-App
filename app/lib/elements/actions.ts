
import { unstable_noStore as noStore } from 'next/cache';
import { Block, ElementBlock, FusionElementsBlock, Section } from '../definitions';
import { requiresSessionUserProperty } from '../actions';
import { getSectionByIdForUser } from '../user/actions';
import { sql } from '@vercel/postgres';
import { insertMedia } from '../media/actions';

const TYPESELEMENT = {
    text: 'text',
    media: 'media',
    linkvideo: 'linkvideo',
    html: 'html',
    ref: 'ref'
}

interface positions {
    linefrom:number,
    lineto:number,
    colfrom:number,
    colto:number
}

export async function createElementInBlock(this:{ section_id:string, username:string, block_id:string, form:FormData, type:string } ) {
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

        const block = (await sql`SELECT * FROM BLOCK WHERE block_id = ${block_id}`).rows[ 0 ] as Block;

        if( !section ) {
          throw new Error( 'Block not found' );
        }

        const positions = await getPositionsForBlock( fusionBlocks, block_id );

        let content = form.get('content') as string;
        let ref = undefined;

        let defClassName = 'h-full';
        let css = `{}`
        switch( type ) {
          case TYPESELEMENT.text:
            css = `{"fontSize": "1rem", "wordWrap": "break-word", "display": "inline-flex", "height": "100%", "width":"100%"}`;
            break;
          case TYPESELEMENT.media:
            break;
          case TYPESELEMENT.html:
            css = `{"height": "100%"}`;
            break;
          case TYPESELEMENT.ref:
            ref = form.get('ref') as string;
            let elementReference = (await sql`SELECT * FROM ELEMENT WHERE element_id = ${ref}`).rows[ 0 ] as ElementBlock;

            if( !elementReference ) {
              throw new Error( 'No element to reference' );
            }
            type = elementReference.type;
            defClassName = elementReference.defclassname;
            css = elementReference.css;
            content = elementReference.content;
            break;
          case TYPESELEMENT.linkvideo:
            // doing nothing
            break;
          default: {
            throw new Error('Not recognized type');
          }
        }

        let { element_id } = await insertElement( positions, defClassName, css, content, type, block_id, ref );
        return element_id;

      } catch( error:any ) {
        throw new Error( 'Failed to create the element for block : ' + error?.message );
      }
}

async function insertElement( 
    positions:positions, 
    defClassName:string, 
    css:string, 
    content:string,
    type:string,
    block_id:string,
    element_id_ref?:string
) {
    return (await sql`INSERT INTO ELEMENT(
        linefrom,
        lineto,
        colfrom,
        colto,
        defclassname,
        css,
        content,
        type,

        block_id,
        element_id_ref
      ) VALUES ( 
        ${positions.linefrom}, ${positions.lineto}, 
        ${positions.colfrom}, ${positions.colto},
        ${defClassName},
        ${css},
        ${content},
        ${type},

        ${block_id},
        ${element_id_ref}
      )
      RETURNING element_id`).rows[ 0 ];
}
  
async function getPositionsForBlock(fusionBlocks:FusionElementsBlock, block_id:string ) {
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
    return positions;

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