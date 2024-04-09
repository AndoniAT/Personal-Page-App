import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';
import { requiresLogin, requiresSessionUserProperty } from "@/app/lib/actions";
import { utapi } from "@/server/uploadthing";
import { sql } from "@vercel/postgres";
import { Block, Media, Section } from "@/app/lib/definitions";
import { NextApiRequest } from "next";

export async function POST( req: Request, context:any ) {
  noStore();
  const { params } = context;
  const data = await req.formData()
  const image = data.get('image');
  const block_id = data.get('block_id') as string;
  let username = data.get('username') as string;

    if( !username || !block_id || !image) {
        throw new Error( 'Some params are missing' );
    }

  let media_url = '';
  try {
    await requiresSessionUserProperty( username );

    let res = await sql`SELECT * FROM SECTION WHERE 
                    section_id IN( SELECT section_id FROM BLOCK
                        WHERE block_id = ${block_id} AND
                        resume_id IN (SELECT resume_id FROM RESUME
                            WHERE user_id IN(SELECT user_id FROM USERS
                                WHERE username = ${username}
                            )
                        )
                    )`;
    let section = res.rows[ 0 ] as Section;
    if( !section ) throw new Error('No block found in section for user!');

    let media_id = await insertMedia( section.section_id, data );

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

  return NextResponse.json( { url: media_url } )

}

/**
 * 
 * @param section_id 
 * @param formData 
 * @returns 
 */
export async function insertMedia( section_id:string, formData: FormData ) {
    'use server'
    noStore();
  
    const imageFile = formData.get('image') as File;
    const response = await utapi.uploadFiles([imageFile]);
    const image = response[ 0 ].data;
  
    try {
      let id = await sql`INSERT INTO MEDIA (
          filename,
          key,
          url,
          size,
          contentType,
          isHero,
  
          section_id,
          project_id )
  
          VALUES ( ${image?.name}, ${image?.key}, ${image?.url}, ${image?.size}, ${image?.type}, FALSE, ${section_id}, null )
          RETURNING media_id;`;
        let media = id.rows[ 0 ] as Media;
        console.log('checking media', media);
        return media.media_id
    } catch ( error ) {
      console.error( 'Failed set new photo hero home:', error );
      throw new Error( 'Failed set new photo hero home:' );
    }
  }