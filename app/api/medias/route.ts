import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';
import { requiresSessionUserProperty } from "@/app/lib/actions";
import { sql } from "@vercel/postgres";
import { Section } from "@/app/lib/definitions";
import { insertMedia } from "@/app/lib/media/actions";

export async function POST( req: Request, context:any ) {
  noStore();

  const { params } = context;
  const data = await req.formData();
  const image = data.get('image');
  let username = data.get('username') as string;

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