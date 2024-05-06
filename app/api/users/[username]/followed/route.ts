import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET( request: Request, context:any) {
    noStore();
    let { params } = context;
    let { username } = params;

    let res = (await sql`SELECT username, url_profile FROM USERS
    WHERE user_id IN(SELECT user_id FROM USER_FOLLOW_USER 
        WHERE
        user_id_followed IN(SELECT user_id FROM USERS 
            WHERE username = ${username})
    )`).rows;

    return NextResponse.json({
      followed: res
    });
}
