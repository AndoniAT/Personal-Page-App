
import { utapi } from '@/server/uploadthing';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Media } from '../definitions';

/**
 * 
 * @param section_id 
 * @param formData 
 * @returns 
 */
export async function insertMedia( section_id:string, formData: FormData ) {
    'use server'
    noStore();
  
    const imageFile = formData.get('image') as File;
    const response = await utapi.uploadFiles([imageFile]);
    const image = response[ 0 ].data;

    try {
      let inserted = await sql`INSERT INTO MEDIA (
          filename,
          key,
          url,
          size,
          contentType,
          isHero,
  
          section_id,
          project_id )
  
          VALUES ( ${image?.name}, ${image?.key}, ${image?.url}, ${image?.size}, ${image?.type}, FALSE, ${section_id}, null )
          RETURNING media_id;`;
        
        let media = inserted.rows[ 0 ] as Media;
        return media.media_id;
    } catch ( error:any ) {
      console.error( 'Failed insert media:', error );
      throw new Error( 'Failed insert media:' + error?.message );
    }
}