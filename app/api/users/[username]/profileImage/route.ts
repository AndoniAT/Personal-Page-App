import { NextResponse } from 'next/server'
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { deleteImage, uploadImage } from '@/app/lib/images';
import { getUserByUsername } from '@/app/lib/data';
import { sql } from '@vercel/postgres';
import { Media } from '@/app/lib/definitions';

export async function POST( req: Request, prm:any ) {
  noStore();
  const data = await req.formData();
  
  const { params } = prm;
  let media_id = await putProfilePhotoForUser( params.username, data );
  return NextResponse.json( { media_id: media_id} )

}

export async function putProfilePhotoForUser( username: string, formData: FormData ) {
    'use server'
    noStore();
    let blob = await uploadImage( formData );
  
    try {
      const user = await getUserByUsername( username );
  
      const medias = await sql`SELECT * FROM MEDIA
                                  WHERE 
                                  media_id = ${user?.photo_profile_id}`;

      if( medias && medias.rows.length > 0 ) {
        // Update Hero
        const media = medias.rows[ 0 ] as Media;
        await sql`UPDATE MEDIA
                  SET 
                  filename = ${blob.pathname},
                  url = ${blob.url},
                  downloadUrl = ${blob.downloadUrl},
                  contentType = ${blob.contentType} 
                  WHERE media_id = ${media.media_id};`;
        
        const formData = new FormData();
        formData.append( 'url', media.url );
        await deleteImage( formData );
        return media.media_id;
      } else {
        // Create Profile Image
        let inserted = await sql`INSERT INTO MEDIA (
          filename,
          url,
          downloadUrl,
          contentType
          )
  
          VALUES ( ${blob.pathname}, ${blob.url}, ${blob.downloadUrl}, ${blob.contentType})
          RETURNING media_id;`;
          let photoMedia = inserted.rows[ 0 ] as Media;

        await sql`UPDATE USERS
        SET 
        photo_profile_id = ${photoMedia.media_id}
        WHERE user_id = ${user.user_id};`
        return photoMedia.media_id;
      }

    } catch ( error ) {
      console.error( 'Failed set new photo profile:', error );
      throw new Error( 'Failed set new photo profile:' );
    }
  }