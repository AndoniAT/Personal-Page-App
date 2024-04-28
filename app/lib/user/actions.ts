import { sql } from '@vercel/postgres';
import { Media, Section } from '../definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { requiresSessionUserProperty } from '../actions';
import { utapi } from '@/server/uploadthing';
import { UUID } from 'crypto';

export async function getSectionByIdForUser(username:string, section_id:string) {
    noStore();
    return new Promise( (resolve, reject) => {

        let section = sql`SELECT * FROM SECTION WHERE
                        section_id = ${section_id} AND
                        resume_id IN( SELECT resume_id FROM RESUME 
                        WHERE user_id IN( SELECT user_id FROM USERS
                            WHERE username = ${username}
                            ) )`;
        section.then( res => {
            resolve( res.rows[ 0 ] as Section );
        })
        .catch( err => {
            reject( err );
        })
    })
}

export async function getMediasForUser( user_id: string ) {
    noStore();
  
    try {
      const medias = await sql`SELECT * FROM MEDIA
                                WHERE 
                                user_id = ${user_id}`;
  
      return medias.rows as Media[];
  
    } catch ( error ) {
      console.error( 'Failed to fetch medias for user:', error );
      throw new Error( 'Failed to fetch medias for user.' );
    }
  }

export async function changeShowHeader( username:string, show:boolean ) {
    noStore();
    try {
        await requiresSessionUserProperty( username );

       let res = ( await sql`UPDATE USERS
       SET showheader = ${show}
       WHERE username = ${username}`).rowCount;
       return res;
    } catch( error:any ) {
        throw new Error( 'Failed to set showHeader: ' + error?.message );
    }
}

export async function deleteUserByUsername( username:string ) {
    'use server'
    noStore();
    try {
        await requiresSessionUserProperty( username );

       await retirePofilePhoto( username );
       await deleteSectionsMedia( username );
       await deleteUser( username );
    } catch( error:any ) {
        throw new Error( 'Failed to delete user: ' + error?.message );
    }
}

async function retirePofilePhoto( username:string ) {
    let photoprofile = (await sql`SELECT * FROM MEDIA
        WHERE media_id IN(SELECT photo_profile_id FROM USERS
            WHERE username = ${username}
        )`).rows[ 0 ];

    await sql`UPDATE USERS
    SET photo_profile_id = NULL
    WHERE username = ${username};`

    if( photoprofile ) {            
        let { key, media_id } = photoprofile;
        await sql`DELETE FROM MEDIA WHERE media_id = ${media_id}`;
        await utapi.deleteFiles([key]); // From uploadthing
    }
}

async function deleteSectionsMedia( username:string ) {
    let sectionMedias = (await sql`SELECT * FROM MEDIA
    WHERE section_id IN (SELECT section_id FROM SECTION WHERE
        resume_id IN(SELECT resume_id FROM RESUME
            WHERE user_id IN(SELECT user_id FROM USERS
                WHERE username = ${username}
            )
        )
    )`).rows;

   if( sectionMedias.length > 0 ) {
    let keys = sectionMedias.map( m => m.key );
    let ids = sectionMedias.map( m => m.media_id ) as UUID[];

    for ( const id of ids) {
        await sql`DELETE FROM MEDIA WHERE media_id = ${id}`;
    }

    await utapi.deleteFiles(keys); // From uploadthing
   }
}

async function deleteUser( username:string ) {
    await sql`DELETE FROM USERS WHERE username = ${username}`;
}