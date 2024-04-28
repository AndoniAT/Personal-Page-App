
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
export async function insertMedia( username:string, formData: FormData ) {
    'use server'
    noStore();
  
    const imageFile = formData.get('image') as File;
    const response = await utapi.uploadFiles([imageFile]);
    const image = response[ 0 ].data;

    try {
      let { user_id } = ( await sql`SELECT user_id FROM USERS WHERE username = ${username}`).rows[ 0 ];
      if(!user_id) throw new Error( 'No found user' );

      let inserted = await sql`INSERT INTO MEDIA (
          filename,
          key,
          url,
          size,
          contentType,
          user_id
          )
  
          VALUES (
            ${image?.name}, 
            ${image?.key}, 
            ${image?.url}, 
            ${image?.size}, 
            ${image?.type}, 
            ${user_id}
          )
          RETURNING url;`;
        
        let media = inserted.rows[ 0 ] as Media;
        return media.url;
    } catch ( error:any ) {
      console.error( 'Failed insert media:', error );
      throw new Error( 'Failed insert media:' + error?.message );
    }
}