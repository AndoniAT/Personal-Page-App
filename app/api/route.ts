 //== API EXEMPLES == 
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextResponse } from 'next/server';

export async function GET(request: Request ) {

  //revalidatePath(`/resumes/${username}/edit/resume`); //  clear the client cache and make a new server request.
  return NextResponse.json({
    hello:'word'
  });
}


/*export async function POST( req: Request, context:any ) {
  noStore();
  const { params } = context;
  let media_url = '';
  try {
    await requiresSessionUserProperty( params.username );
    const data = await req.formData();
    
    media_url = await putProfilePhotoForUser( params.username, data );
  } catch ( e:any ) {
    return NextResponse.json( { error: e?.message } )
  }

  return NextResponse.json( { url: media_url } )

}*/