import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { requiresSessionUserProperty } from '@/app/lib/actions';
import { User } from '@/app/lib/definitions';

export async function GET( request: Request, context:any) {
    noStore();
    let { params } = context;
    let { username,  usernamefollow } = params;
    console.log(`checking if ${username} follows ${usernamefollow}`);

    let res = (await sql`SELECT * FROM USER_FOLLOW_USER 
      WHERE user_id IN(SELECT user_id FROM USERS WHERE username = ${username}) AND
      user_id_followed IN(SELECT user_id FROM USERS WHERE username = ${username})`).rowCount

    return NextResponse.json({
      follows: res > 0
    });
}

export async function POST( req: Request, context:any ) {
  noStore();
  let { params } = context;
  let { username,  usernamefollow } = params;
  
  if( !username || !usernamefollow ) {
    throw new Error( 'Some params are missing' );
  }

  try {
    await requiresSessionUserProperty( username );

    let user = (await sql`SELECT * FROM USERS WHERE username = ${username}`).rows[ 0 ] as User;
    let follow_user = (await sql`SELECT * FROM USERS WHERE username = ${usernamefollow}`).rows[ 0 ] as User;
    
    if( !user ) {
      throw new Error( `${follow_user} does not exists`);
    }

    if( !follow_user ) {
      throw new Error( `${follow_user} does not exists`);
    }

    await sql`INSERT INTO USER_FOLLOW_USER
    (
      user_id,
      user_id_followed
    )
    VALUES
    (
      ${user.user_id},
      ${follow_user.user_id}
    )`

    return NextResponse.json( { follows: true } )

  } catch ( e:any ) {
    console.log('Error!', e);
    return NextResponse.json({
        message: null,
        error:e?.message
    }, {
        status: 400,
      });
  }  
}

export async function DELETE( req: Request, context:any ) {
  noStore();
  let { params } = context;
  let { username,  usernamefollow } = params;
  
  if( !username || !usernamefollow ) {
    throw new Error( 'Some params are missing' );
  }

  try {
    await requiresSessionUserProperty( username );

    let user = (await sql`SELECT * FROM USERS WHERE username = ${username}`).rows[ 0 ] as User;
    let follow_user = (await sql`SELECT * FROM USERS WHERE username = ${usernamefollow}`).rows[ 0 ] as User;
    
    if( !user ) {
      throw new Error( `${follow_user} does not exists`);
    }

    if( !follow_user ) {
      throw new Error( `${follow_user} does not exists`);
    }

    await sql`DELETE FROM USER_FOLLOW_USER
    WHERE
      user_id = ${user.user_id} AND
      user_id_followed = ${follow_user.user_id}`;

    return NextResponse.json( { follows: false } )

  } catch ( e:any ) {
    console.log('Error!', e);
    return NextResponse.json({
        message: null,
        error:e?.message
    }, {
        status: 400,
      });
  }  
}