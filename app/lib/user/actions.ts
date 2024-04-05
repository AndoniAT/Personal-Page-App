import { sql } from '@vercel/postgres';
import { Section } from '../definitions';

export async function getSectionByIdForUser(username:string, section_id:string) {
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