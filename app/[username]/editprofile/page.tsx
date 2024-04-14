import { requiresSessionUserProperty } from "@/app/lib/actions";
import { getUserByUsername } from "@/app/lib/data";
import EditProfileForm from "@/app/ui/user/editProfileForm";
import { signOut} from "@/auth";
import { notFound } from "next/navigation";
import TrashButton from "@/app/ui/components/trash-button";
import { deleteUserByUsername } from "@/app/lib/user/actions";

export default async function Page(
  { 
    params 
  }: Readonly<{ 
    params: { 
      username: string 
    } 
  }>){
    const user = await getUserByUsername( params.username );
    if(!user) notFound();
    await requiresSessionUserProperty( params.username );
    
    const cancel = async () => {
      'use server'
    }

    const deleteUser = async () => {
      'use server'
      await deleteUserByUsername( params.username );
      await signOut( { redirect:true, redirectTo:'/'});
    }

    return (
        <main className="flex items-center justify-center md:h-screen h-screen">
          <div className="relative mx-auto flex w-full flex-col space-y-2.5 p-4 md:-mt-32">
            <EditProfileForm user={user}/>
            <TrashButton 
            cancel={cancel} 
            deleteElement={deleteUser}
            confirmation={
              {
                title:'Delete User',
                question: 'Are you sure you want to delete your account?'
              }
            }/>
          </div>
        </main>
      );

}