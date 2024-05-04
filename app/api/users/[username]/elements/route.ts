import { ElementBlock } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET( request: Request, context:any) {
    noStore();
    let { params } = context;
    let { username } = params;

    let elements = (await sql`SELECT * FROM ELEMENT
    WHERE 
        element_id_ref IS NULL AND
        block_id IN(SELECT block_id FROM BLOCK
                    WHERE section_id IN(SELECT section_id FROM SECTION
                            WHERE resume_id IN(SELECT resume_id FROM RESUME
                                    WHERE user_id IN(SELECT user_id FROM USERS
                                        WHERE username = ${username}
                                    )
                            )
                    )
    )
    `).rows as ElementBlock[];

    let allElements = {
        'text': [] as ElementBlock[],
        'media': [] as ElementBlock[],
        'linkvideo': [] as ElementBlock[],
        'html':[] as ElementBlock[]
    }

    elements.forEach( el => {
        allElements[el.type].push( el ) 
    })

    return NextResponse.json({
        elements: allElements
    });
}