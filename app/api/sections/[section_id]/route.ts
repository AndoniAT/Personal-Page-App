import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';
import { requiresSessionUserProperty } from "@/app/lib/actions";
import { sql } from "@vercel/postgres";
import { Section } from "@/app/lib/definitions";
import { insertMedia } from "@/app/lib/media/actions";

export async function PUT( req: Request, context:any ) {
  noStore();
  const { params } = context;
  const { section_id } = params;

  const data = await req.formData()
  const name = data.get('name');

  if( !name ) {
      throw new Error( 'Some params are missing' );
  }

  try {
    let { username } = (await sql`SELECT username FROM USERS as u
                                    INNER JOIN RESUME as r ON(u.user_id = r.user_id)
                                    INNER JOIN SECTION as s ON(s.resume_id = r.resume_id)
                                    WHERE section_id = ${section_id}`).rows[ 0 ];

    await requiresSessionUserProperty( username );

    // Get section
    let sec = (await sql`SELECT * FROM SECTION WHERE section_id = ${section_id}`).rows[ 0] ;
    sec.name = name;

    let res = await sql`UPDATE SECTION
            SET name = ${sec.name}
            WHERE section_id = ${sec.section_id}`;
    
    return NextResponse.json( { response: res  } )
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