import { Media } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET( request: Request, context:any) {
    noStore();
    let { params } = context;
    let { media_id } = params;

    let res = await sql`SELECT * FROM MEDIA 
                        WHERE media_id = ${media_id}`;

    let media = res.rows[ 0 ] as Media;

    return NextResponse.json({
      media: media
    });
}