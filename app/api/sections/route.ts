import { requiresSessionUserProperty } from '@/app/lib/actions';
import { Resume, Section } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST( req: Request, context:any ) {
    noStore();
    const data = await req.formData()
    let username = data.get('username') as string;
    let name = data.get('name') as string;
    
    if( !username || !name ) {
      throw new Error( 'Some params are missing' );
    }
  
    let media_url = '';
    try {
      await requiresSessionUserProperty( username );

      let resume = ( await sql`SELECT * FROM RESUME 
                            WHERE user_id IN (SELECT user_id FROM USERS
                            WHERE username = ${username}
                            )`).rows[ 0 ] as Resume;
      if( !resume ) {
        throw new Error(`No resume found for user ${username}`);
      }

      let sec = (await sql`INSERT INTO SECTION ( 
        name, 
        public, 
        type, 
        style,
        resume_id 
      )
      VALUES (
        ${name}, 
        ${true}, 
        ${'Custom'}, 
        ${1}, 
        ${resume.resume_id}
      ) RETURNING section_id
      `).rows[ 0 ] as Section;

      return NextResponse.json( { section_id: sec.section_id } )

    } catch ( e:any ) {
      console.log('Error!', e);
      //return NextResponse.json( { error: e?.message } )
      return NextResponse.json({
          message: null,
          error:e?.message
      }, {
          status: 400,
        });
    }  
  }