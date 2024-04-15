import { SectionsNavBar } from "@/app/resumes/[username]/interfaces";
import { EyeIcon  } from "@heroicons/react/24/outline";
import Link from "next/link";
import { User } from "@/app/lib/definitions";
import { CreateButtonNewSection, CreateCustomColorButton, RadioButton } from "./client/components";
import { revalidateTag } from "next/cache";
import { changeBackgroundSection } from "@/app/lib/data";
import { customRevalidateTag } from "@/app/lib/actions";
import { changeShowHeader } from "@/app/lib/user/actions";

export default function EditModeNavBar(  {
    data 
  } : Readonly<{
    data : {
        user: User,
        currentSection: SectionsNavBar|null,
      }
    }>) 
    {
    let { currentSection, user } = data;

    let updateBg = async ( newColor:string ) => {
      'use server'
      if( currentSection ) {
        await changeBackgroundSection( currentSection.id, newColor, user.username )
        revalidateTag( 'edit' );
      }
    }
    let showHeader = user.showheader;

    let updateShowHeader = async ( show:boolean ) => {
      'use server'
      await changeShowHeader( user.username, show );
      revalidateTag( 'edit' );
    }

    return ( 
      <div>
        <Link href={`/resumes/${user.username}`}>
          <div className='flex content-center gap-2 cursor-pointer'>
            <EyeIcon className='stroke-slate-700 w-5'/> 
            <span className='inline-block text-black align-middle h-fit content-center place-self-center m-l-10'>
              Visual mode
            </span>
          </div>
        </Link>
        <div className=' w-full text-black mt-5 pt-1 border-t border-t-gray-300 '>
          <div className="grid grid-cols-2 grid-rows-3 grid-flow-col content-start">
            {
              <div className='w-full grid grid-cols-2 col-span-2 h-fit mb-2'>
                <CreateCustomColorButton label="Background" update={updateBg} defaul_value={currentSection ? currentSection.background.color : '#000000'}/>
              </div>
            }

            {
            <div className='w-full grid grid-cols-2 col-span-2 h-fit content-center'>
              <CreateButtonNewSection customRevalidateTag={customRevalidateTag}  label={'New Section'}/>
            </div>
            }

            {
              ( currentSection?.type == 'Home') ? 
                <RadioButton label={'Show Home Header'} default_value={showHeader} update={updateShowHeader}/>
              :<></>
            }

          </div>
        </div>
      </div>
    )
}