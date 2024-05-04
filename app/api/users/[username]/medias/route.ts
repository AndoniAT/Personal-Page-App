import { requiresSessionUserProperty } from '@/app/lib/actions';
import { Media } from '@/app/lib/definitions';
import { insertMedia } from '@/app/lib/media/actions';
import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET( request: Request, context:any) {
    noStore();
    let { params } = context;
    let { username } = params;

    let res = await sql`SELECT * FROM MEDIA 
                        WHERE user_id IN (SELECT user_id FROM USERS 
                            WHERE username = ${username}
                        )`;

    let medias = res.rows as Media[];

    return NextResponse.json({
      medias: medias
    });
}

export async function POST( req: Request, context:any ) {
  noStore();
  const { params } = context;
  let { username } = params;
  const data = await req.formData();
  const image = data.get('image');

    if( !username || !image) {
        throw new Error( 'Some params are missing' );
    }

  let media_url = '';
  try {
    await requiresSessionUserProperty( username );

    media_url = ( await insertMedia( username, data ) );
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

  return NextResponse.json( { 
    url: media_url,
  } )

}