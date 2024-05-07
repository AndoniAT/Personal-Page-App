import { unstable_noStore as noStore } from 'next/cache';
import { requiresSessionUserProperty, requiresSessionUserPropertySection } from '../actions';
import { getSectionByIdForUser } from '../user/actions';
import { Block, ElementBlock, Media, Section } from '../definitions';
import { sql } from '@vercel/postgres';
import { utapi } from '@/server/uploadthing';

const fsp = require('fs').promises

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
      await updateElement( block_id, element, form );
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
        let phoneBlocks = await getBlocksForScreen( section_id, 'def') as Block[];
        await setElementsForBlocks( phoneBlocks );

        let mdBlocks = await getBlocksForScreen( section_id, 'md') as Block[];
        await  setElementsForBlocks( mdBlocks );

        let lgBlocks = await getBlocksForScreen( section_id, 'lg') as Block[];
        await setElementsForBlocks( lgBlocks );

        let xlBlocks = await getBlocksForScreen( section_id, 'xl') as Block[];
        await setElementsForBlocks( xlBlocks );

        let _2xlBlocks = await getBlocksForScreen( section_id, '2xl') as Block[];
        await setElementsForBlocks( _2xlBlocks );
        
        return {
          phone: phoneBlocks,
          md: mdBlocks,
          lg: lgBlocks,
          xl: xlBlocks,
          _2xl: _2xlBlocks
        }

    } catch( error:any ) {
        throw new Error( 'Failed to find a blocks for section: ' + error?.message );
      }
}

export async function deleteSection( section_id:string ) {
  'use server'
  noStore();

  try {
    let { username } = ( await sql`SELECT username FROM USERS WHERE
                        user_id IN(SELECT user_id FROM RESUME 
                            WHERE resume_id IN(SELECT resume_id FROM SECTION
                                WHERE section_id = ${section_id}
                            )
                        )`).rows[ 0 ];
    await requiresSessionUserProperty( username );

    await sql`DELETE FROM SECTION WHERE section_id = ${section_id}`;

  } catch( error:any ) {
    throw new Error( 'Failed to delete section: ' + error?.message );
  }
}

export async function changeCssSection( id:string, css_to_change:string ) {
  'use server';
  noStore();
  await requiresSessionUserPropertySection( id );

  try {
    let new_css = JSON.parse( css_to_change );
    let { css } = (await sql`SELECT css FROM SECTION WHERE section_id = ${id}`).rows[ 0 ];
    let old_css_obj = JSON.parse( css );

    for ( const [ prop, value ] of Object.entries( new_css ) ) {
      old_css_obj[ prop ] =  value
    }
    
    await sql`UPDATE SECTION
              SET css = ${JSON.stringify(old_css_obj)} WHERE section_id =${id};`;
    return css;
  } catch( e ) {
    console.log(e);
    throw new Error( 'Failed to change the css' );
  }
}

async function setElementsForBlocks( blocks:Block[] ) {
  'use server';
  noStore();
    for (const block of blocks) {
      let res = await sql`SELECT * FROM ELEMENT WHERE
                            block_id = ${block.block_id}`;
      block.elements = res.rows as ElementBlock[];
    };
return blocks;
}

async function getBlocksForScreen( section_id:string, screen:string ) {
  return (await sql`
              SELECT * FROM BLOCK WHERE section_id = ${section_id}
              AND screen = ${screen}
              `).rows;
}

async function updateElement( block_id:string, element:ElementBlock, form:FormData ) {
  let target = form.get('target') as string;

  switch( target ) {
      case 'content': {    
        let content = form.get('content') as string;
        await sql`UPDATE ELEMENT
        SET content = ${content}
        WHERE block_id = ${block_id} AND element_id = ${element.element_id}`;
        break;
      }
      case 'link': {
        let link = form.get('link') as string;
        await sql`UPDATE ELEMENT
        SET link = ${link}
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
      case 'heightContent':
      case 'widthContent':
      case 'paddingLeft':
      case 'paddingTop':
      case 'paddingRight':
      case 'paddingBottom':
        await getAndUpdateFormAttribute( target, block_id, element, form, '%' );
        break;
      case 'fontSize':
      case 'marginLeft':
      case 'marginTop':
      case 'marginRight':
      case 'marginBottom':
      case 'borderTopLeftRadius':
      case 'borderBottomLeftRadius':
      case 'borderTopRightRadius':
      case 'borderBottomRightRadius':
      case 'borderWidth':
      case 'height':
        await getAndUpdateFormAttribute( target, block_id, element, form, 'rem' );
        break;
      case 'customclassname': {
        let newCustomClass = form.get('customclassname') as string;
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

async function getAllMediaSection( section_id:string ):Promise<Media[]> {
  return (await sql`SELECT * FROM MEDIA WHERE section_id = ${section_id}`).rows as Media[]
}

export function transformHexaColor( color?:string, alpha?:number, rgba?:{r:number, g:number, b:number, a:number} ) {
  const rgba_current = rgba ?? { r:0, g:0, b:0, a:1};

  if( color ) {
    let { r, g, b } = hexToRgba( color );
    rgba_current.r = r;
    rgba_current.g = g;
    rgba_current.b = b;
  }
  
  if( alpha ) {
    rgba_current.a = alpha;
  }

  let new_rgba = rgbaToString( rgba_current );
  return new_rgba;
}

export function hexToRgba( hex:string ) {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const a = 1;
  return { r, g, b, a};
}


export function rgbaToString( rgb:{r:number, g:number, b:number, a:number} ) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
}

/**
 * Transforms a color string in a rgba object
 * @param colorString a rgba or hexa color
 * @returns 
 */
export function colorStringToObjectRGBA( colorString:string ) {
  if( !colorString ) colorString = `rgba(0, 0, 0, 0)`;

  if( colorString.includes('#')) {
      let rgba = hexToRgba( colorString );
      colorString = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  } else if( !colorString.startsWith( 'rgba(' ) && !colorString.endsWith(')') ) {
      colorString = `rgba(0, 0, 0, 0)`;
  } else {
      let string = colorString.split('rgba(').slice(-1)[0];
      string = string.split( ')' )[ 0 ];
      let values =  string.split(',');
      let r = !isNaN(parseFloat(values[ 0 ])) ? values[ 0 ] : 0;
      let g = !isNaN(parseFloat(values[ 1 ])) ? values[ 1 ] : 0;
      let b = !isNaN(parseFloat(values[ 2 ])) ? values[ 2 ] : 0;
      let a = !isNaN(parseFloat(values[ 3 ])) ? values[ 3 ] : 0;
      colorString = `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  let string = colorString.split('(')[ 1 ].split(')')[ 0 ];
  const rgbaValues = string.split(',');
  let rgba = { r:0, g:0, b:0, a:0};
  const r = rgbaValues[0] ? parseInt(rgbaValues[0].trim()) : rgba.r;
  const g = rgbaValues[1] ? parseInt(rgbaValues[1].trim()) :rgba.g;
  const b = rgbaValues[2] ? parseInt(rgbaValues[2].trim()) : rgba.b;
  const a = rgbaValues[3] ? parseFloat(rgbaValues[3].trim()) : rgba.a;
  return { r, g, b, a };
}

export function colorStringToRGBAString( color:string ) {
  let objectRGBA = colorStringToObjectRGBA( color );
  return rgbaToString( objectRGBA );
}