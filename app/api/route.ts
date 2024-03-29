import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export async function GET(request: Request, context: { params: Params }) {

  //revalidatePath(`/resumes/${username}/edit/resume`); //  clear the client cache and make a new server request.
  /*return res.json({
    hello:'word'
  });
}