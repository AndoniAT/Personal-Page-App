import { sql } from '@vercel/postgres';
import { User, Section } from './definitions';

export async function getUserByUsername( username: string ) {
  try {
    const user = await sql`SELECT * FROM USERS WHERE username=${username}`;
    
    return user.rows[ 0 ] as User;

  } catch ( error ) {
    console.error( 'Failed to fetch user:', error );
    throw new Error( 'Failed to fetch user.' );
  }
}

export async function getAllUserSections( username: string) {
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
