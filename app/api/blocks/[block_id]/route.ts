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

    // DELETE ELEMENT
    await sql`DELETE FROM BLOCK WHERE block_id = ${block.block_id} OR block_id_ref = ${block.block_id} OR block_id = ${block.block_id_ref}`;
    console.log('Deleted !');
    return NextResponse.json({
        message: 'Deleted'
    }, {
        status: 200,
      });
}

export async function PUT( req: Request, context:any) {
  'use server'
  noStore();

  let { params } = context;
  let { block_id } = params;
  const block = (await sql`SELECT * FROM BLOCK WHERE block_id = ${block_id}`).rows[0] as Block;
  const data = await req.formData();
  const action = data.get('action');

  if( !block ) {
    return NextResponse.json({
        message: null,
        error: 'No Block Found'
    }, {
        status: 400,
      });
  }

  /*const user = await verifyUserForBlock( block.block_id );
  if( !user ) {
    return NextResponse.json({
        message: null,
        error: 'Not user found for this block'
    }, {
        status: 400,
      });
  }*/

  /*try {
    await requiresSessionUserProperty( user.username );
  } catch( err:any ) {
      return NextResponse.json({
          message: null,
          error: err?.message
      }, {
          status: 400,
        });
  }*/
  let numlines = block.numlines;

  switch( action ) {
    case 'remove_row': {
      numlines--;
      let checkLines = (await sql`SELECT * FROM ELEMENT WHERE
                block_id = ${block_id}
                AND 
                (linefrom >= ${numlines}
                OR 
                lineto >= ${numlines}
                ) `).rowCount;

      if( checkLines > 0 ) {
        return NextResponse.json({
          message: null,
          error: 'Delete elements in this row before removing it'
        }, {
            status: 400,
          });
      }
      break;
    }
    case 'add_row': {
      numlines++;
      break;
    }
  }

  await sql`UPDATE BLOCK
                  SET numlines = ${numlines}
                  WHERE block_id = ${block_id}`;

  let block_return = (await sql`SELECT * FROM BLOCK where block_id = ${block_id}`).rows[ 0 ] as Block;
  await setElementsForBlocks( [ block_return ] );
  return NextResponse.json({
    block: block_return,
}, {
    status: 200,
  });
}

async function setElementsForBlocks( blocks:Block[] ) {
  for (const block of blocks) {
    let res = await sql`SELECT * FROM ELEMENT WHERE
                          block_id = ${block.block_id}`;
    block.elements = res.rows as ElementBlock[];
  };
return blocks;
}