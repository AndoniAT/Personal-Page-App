import { sql } from '@vercel/postgres';
import { User, Section, Media } from '../lib/definitions';
import { deleteImage, uploadImage } from './images';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUserByUsername( username: string ) {
  noStore();
  try {
    const user = await sql`SELECT * FROM USERS WHERE username=${username}`;
    
    return user.rows[ 0 ] as User;

  } catch ( error ) {
    console.error( 'Failed to fetch user:', error );
    throw new Error( 'Failed to fetch user.' );
  }
}

export async function getAllUserSections( username: string) {
  noStore();
  try {
    const sections = await sql`SELECT * FROM SECTION
                                  WHERE resume_id in( SELECT resume_id  FROM RESUME
                                      WHERE user_id in( SELECT user_id FROM USERS 
                                        WHERE username = ${username}))`;

    return sections.rows as [ Section ];

  } catch ( error ) {
    console.error( 'Failed to fetch sections:', error );
    throw new Error( 'Failed to fetch sections.' );
  }
}

export async function getHomeUserSection( username: string) {
  noStore();

  let type = 'Home';

  try {
    const sections = await sql`SELECT * FROM SECTION
                                  WHERE 
                                  type = ${type} AND
                                  resume_id in( SELECT resume_id  FROM RESUME
                                      WHERE user_id in( SELECT user_id FROM USERS 
                                        WHERE username = ${username}))`;
    const home = sections.rows[ 0 ] as Section;
    return home;

  } catch ( error ) {
    console.error( 'Failed to fetch section home:', error );
    throw new Error( 'Failed to fetch section home.' );
  }
}

export async function getMediasForSection( section_id: string ) {
  noStore();

  try {
    const medias = await sql`SELECT * FROM MEDIA
                              WHERE 
                              section_id = ${section_id} AND
                              isHero is True`;
    return medias.rows as Media[];

  } catch ( error ) {
    console.error( 'Failed to fetch medias of section:', error );
    throw new Error( 'Failed to fetch medias of section.' );
  }
}

export async function putHomeHeroForUser( username: string, formData: FormData ) {
  'use server'
  noStore();
  let blob = await uploadImage( formData );
  
  try {
    const home = await getHomeUserSection( username );

    const medias = await sql`SELECT * FROM MEDIA
                                WHERE 
                                section_id = ${home.section_id} AND
                                isHero is True;`;
    
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
    } else {
      // Create Hero
      await sql`INSERT INTO MEDIA (
        filename,
        url,
        downloadUrl,
        contentType,
        position,
        isHero,
        section_id,
        project_id )

        VALUES ( ${blob.pathname}, ${blob.url}, ${blob.downloadUrl}, ${blob.contentType}, 1, TRUE, ${home.section_id}, null )
        ON CONFLICT ( media_id ) DO NOTHING;`
    }
    revalidatePath(`/resumes/${username}/`); //  clear the client cache and make a new server request.
  } catch ( error ) {
    console.error( 'Failed set new photo hero home:', error );
    throw new Error( 'Failed set new photo hero home:' );
  }
}