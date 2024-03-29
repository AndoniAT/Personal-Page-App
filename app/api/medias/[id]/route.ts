import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';
import { Media } from "@/app/lib/definitions";
import { unstable_noStore as noStore } from 'next/cache';

export async function GET(req:Request, context:any) {
    noStore();
    let { params } = context;
    
    try {
        let result = await sql`SELECT * FROM MEDIA
                                  WHERE 
                                  media_id = ${params.id}`;
        if( result.rows.length == 0 ) {
            throw new Error('Not found media')
        } else {
            let media = result.rows[ 0 ] as Media;
            return NextResponse.json( media )
        }
    } catch ( err ) {
        throw new Error('Error searching media')
    }

}