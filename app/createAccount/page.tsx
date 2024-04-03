import CreateAccountForm from '../ui/session/create-account-form';
 
export default function CreateAccountPage() {
  return (
    <main className="flex items-center justify-center md:h-screen h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <CreateAccountForm />
      </div>
    </main>
  );
}