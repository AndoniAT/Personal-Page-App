import { requiresSessionUserProperty } from '@/app/lib/actions';
import { Media, User } from '@/app/lib/definitions';
import { utapi } from '@/server/uploadthing';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { NextResponse } from 'next/server';

export async function DELETE( request: Request, context:any) {
    noStore();
    let { params } = context;
    let { media_id, username } = params;

    try {
        await requiresSessionUserProperty( username );

        let user = (await sql`SELECT * FROM USERS WHERE username = ${username}`).rows[0] as User;
        
        let media = (await sql`SELECT * FROM MEDIA 
        WHERE media_id = ${media_id} AND user_id IN (SELECT user_id FROM USERS
            WHERE username = ${username})`).rows[ 0 ] as Media;

        if( user.url_hero == media.url ) {
            (await sql`UPDATE USERS SET url_hero = null WHERE username = ${username}`);
        }

        if( user.url_profile == media.url ) {
            (await sql`UPDATE USERS SET url_profile = null WHERE username = ${username}`);
        }

        if( !media ) {
            throw new Error( 'No media found for this user' );
        }

        await utapi.deleteFiles(media.key);
        let res = await sql`DELETE FROM MEDIA WHERE media_id = ${media.media_id}`
        
        return NextResponse.json(res, { status: 200 });
    } catch( e:any ) {
      return NextResponse.json({
        message: null,
        error: 'Failed delete media:' + e?.message
      }, {
          status: 400,
        });
    }
  }