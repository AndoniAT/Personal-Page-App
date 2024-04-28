import { sql } from '@vercel/postgres';
import { User, Section, Media } from './definitions';
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

export async function getUserByEmail( email: string ) {
  noStore();
  try {
    const user = await sql`SELECT * FROM USERS WHERE email=${email}`;

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

  try {
    const sections = await sql`SELECT * FROM SECTION
                                  WHERE 
                                  ishome = ${true} AND
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

export async function getUserSection( username: string, section_id: string ) {
  noStore();
  try {
    const sections = await sql`SELECT * FROM SECTION
                                  WHERE 
                                  section_id = ${section_id} AND
                                  resume_id IN( SELECT resume_id  FROM RESUME
                                      WHERE user_id IN( SELECT user_id FROM USERS 
                                        WHERE username = ${username}))`;
    const section = sections.rows[ 0 ] as Section;
    return section;

  } catch ( error ) {
    console.error( 'Failed to fetch section:', error );
    throw new Error( 'Failed to fetch section.' );
  }
}