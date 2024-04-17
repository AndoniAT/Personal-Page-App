import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';
import { requiresSessionUserProperty } from "@/app/lib/actions";
import { sql } from "@vercel/postgres";
import { Section } from "@/app/lib/definitions";
import { insertMedia } from "@/app/lib/media/actions";

export async function POST( req: Request, context:any ) {
  noStore();
  const { params } = context;
  const data = await req.formData()
  const image = data.get('image');
  const block_id = data.get('block_id') as string;
  let username = data.get('username') as string;

    if( !username || !block_id || !image) {
        throw new Error( 'Some params are missing' );
    }

  let media_url = '';
  try {
    await requiresSessionUserProperty( username );

    let res = await sql`SELECT * FROM SECTION WHERE 
                    section_id IN( SELECT section_id FROM BLOCK
                        WHERE block_id = ${block_id} AND
                        resume_id IN (SELECT resume_id FROM RESUME
                            WHERE user_id IN(SELECT user_id FROM USERS
                                WHERE username = ${username}
                            )
                        )
                    )`;
    let section = res.rows[ 0 ] as Section;
    if( !section ) throw new Error('No block found in section for user!');

    let media_id = await insertMedia( section.section_id, data ) as string;

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

  return NextResponse.json( { url: media_url } )

}