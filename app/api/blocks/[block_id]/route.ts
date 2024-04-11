import { requiresSessionUserProperty } from '@/app/lib/actions';
import { Block, ElementBlock } from '@/app/lib/definitions';
import { deleteElementBlock } from '@/app/lib/section/actions';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { NextResponse } from 'next/server';

export async function DELETE( request: Request, context:any) {
    'use server'
    noStore();
    let { params } = context;
    let { block_id } = params;

    const block = (await sql`SELECT * FROM BLOCK WHERE block_id = ${block_id}`).rows[0] as Block;

    if( !block ) {
        return NextResponse.json({
            message: null,
            error: 'No Block Found'
        }, {
            status: 400,
          });
    }

    const user = (await sql`SELECT username FROM USERS
    WHERE user_id IN(SELECT user_id FROM RESUME
      WHERE resume_id IN( SELECT resume_id FROM SECTION
        WHERE section_id IN (SELECT section_id FROM BLOCK
          WHERE block_id = ${block.block_id}
        )
      )
    )`).rows[0];

    if( !user ) {
        return NextResponse.json({
            message: null,
            error: 'Not user found for this block'
        }, {
            status: 400,
          });
    }

    try {
        await requiresSessionUserProperty( user.username );
    } catch( err:any ) {
        return NextResponse.json({
            message: null,
            error: err?.message
        }, {
            status: 400,
          });
    }

    let elements = (await sql`SELECT * FROM ELEMENT
                                WHERE block_id = ${block.block_id}`).rows as ElementBlock[];

    for( const element of elements ) {
        let $this =  { 
            section_id:block.section_id, 
            username:user.username, 
            block_id:block.block_id.toString(), 
            element_id:element.element_id 
        };

        await deleteElementBlock.call( $this );
    }

    // DELETE ELEMENT
    await sql`DELETE FROM BLOCK WHERE block_id = ${block.block_id}`;
    console.log('Deleted !');
    return NextResponse.json({
        message: 'Deleted'
    }, {
        status: 200,
      });
  }