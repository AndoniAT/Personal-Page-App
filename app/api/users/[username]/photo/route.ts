import { unstable_noStore as noStore } from 'next/cache';
import { sql } from "@vercel/postgres";
import { requiresSessionUserProperty } from '@/app/lib/actions';
import { NextResponse } from 'next/server';

export async function PUT( req: Request, context:any ) {
  noStore();
  const { params } = context;
  const { username } = params;
    try {
      await requiresSessionUserProperty( username );

      const data = await req.formData()
      const url = data.get('url') as string;
      const attr = data.get('attr') as string;

      if( !url ) {
        throw new Error( 'Some params are missing' );
      }

      if( attr != 'url_hero' && attr != 'url_profile' ) {
        throw new Error( 'No valid attribute photo' + attr );
      }

      let res:any = '';

      switch( attr ) {
        case 'url_hero':
            res = await sql`UPDATE USERS
                  SET url_hero = ${url}
                  WHERE username = ${username}`;
            break;
        case 'url_profile':
            res = await sql`UPDATE USERS
                  SET url_profile = ${url}
                  WHERE username = ${username}`;
      }
  
      
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