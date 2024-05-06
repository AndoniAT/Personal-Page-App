import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { User } from '@/app/lib/definitions';

export async function GET( request: Request, context:any) {
    noStore();
    let { params } = context;
    let { username } = params;

    let res = (await sql`SELECT username, url_profile FROM USERS
    WHERE user_id IN(SELECT user_id_followed FROM USER_FOLLOW_USER 
        WHERE
        user_id IN(SELECT user_id FROM USERS 
            WHERE username = ${username})
    )`).rows;

    return NextResponse.json({
      follows: res
    });
}
