
import { lusitana } from '@/app/ui/fonts';
import { UserClient, SectionsClient } from './interfaces'
import clsx from 'clsx';

export default async function Style1Wrapper( 
  {
    data 
  } : Readonly<{
    data : {
        user: UserClient,
        section: SectionsClient
      }
    }>) {

      const home = data.section;

    await new Promise( ( resolve, reject ) => {
        setTimeout(()=> {
            resolve(true);
        }, 1000);
    });  

    return (
      <>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-black`}
        style={{ backgroundColor: home.backgroundcolor }}>

          Load style1
        </h1>
        <div></div>
      </>
    );
}