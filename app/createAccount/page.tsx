import AcmeLogo from '@/app/ui/acme-logo';
import CreateAccountForm from '../ui/session/create-account-form';
import { HomeIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

 
export default function CreateAccountPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3">
          <div className="w-32 text-white md:w-36">
                  <div
              className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
            >
              <HomeIcon className="h-12 w-12 rotate-[15deg]" />
              <p className="text-[44px]">Resumes</p>
            </div>
          </div>
        </div>
        <CreateAccountForm />
      </div>
    </main>
  );
}