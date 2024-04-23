import { auth } from '@/auth';
import CreateAccountForm from '../ui/user/session/create-account-form';
import { getUserByEmail } from '../lib/data';
import { redirect } from 'next/navigation';
 
export default async function CreateAccountPage() {
  let session = await auth();
  if( session && session?.user?.email ) {
    const user = await getUserByEmail( session.user.email );
  
    if( user ) {
      redirect( '/resumes/' + user.username)
    }
  }

  return (
    <main className="flex items-center justify-center md:h-screen h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <CreateAccountForm />
      </div>
    </main>
  );
}