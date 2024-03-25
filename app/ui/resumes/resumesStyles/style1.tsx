
import { lusitana } from '@/app/ui/fonts';

export default async function Style1Wrapper() {
    await new Promise( ( resolve, reject ) => {
        setTimeout(()=> {
            resolve(true);
        }, 1000);
    });
  
    return (
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-black`}>
        Load style1
      </h1>
    );
}