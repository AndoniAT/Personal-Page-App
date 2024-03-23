import { lusitana } from '@/app/ui/fonts';

export default async function CardUserWrapper() {
    await new Promise( ( resolve, reject ) => {
        setTimeout(()=> {
            resolve(true);
        }, 5000);
    });
  
    return (
      <>
        <CardUser/>
        <CardUser/>
        <CardUser/>
        <CardUser/>
      </>
    );
}

export function CardUser() {
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <h3 className="ml-2 text-sm font-medium"></h3>
        </div>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
        </p>
      </div>
    );
  }

