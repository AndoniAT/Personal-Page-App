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
        await deleteUser( username );
    } catch( error:any ) {
        throw new Error( 'Failed to delete user: ' + error?.message );
    }
}

async function deleteUser( username:string ) {
    await sql`DELETE FROM USERS WHERE username = ${username}`;
}