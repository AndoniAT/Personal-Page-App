import { SectionsNavBar } from "@/app/resumes/[username]/interfaces";
import { EyeIcon  } from "@heroicons/react/24/outline";
import Link from "next/link";
import { User } from "@/app/lib/definitions";
import { CreateButtonNewSection, CreateCustomColorButton, RadioButton } from "./client/components";
import { revalidateTag } from "next/cache";
import { changeBackgroundSection } from "@/app/lib/section/actions";
import { customRevalidateTag } from "@/app/lib/actions";
import { changeShowHeader } from "@/app/lib/user/actions";
import { InputValueButton } from "../../components/value-input";
import { colorStringToObjectRGBA } from "@/app/lib/section/actions";

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
    let rgb = currentSection ? colorStringToObjectRGBA( currentSection.background.color ) : {r:0,g:0,b:0,a:0};

    let defaultBgInput = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    let updateBg = async ( newColor:string ) => {
      'use server'
      if( currentSection ) {
        await changeBackgroundSection( currentSection.section_id, newColor )
        revalidateTag( 'edit' );
      }
    }

    let showHeader = user.showheader;

    let updateShowHeader = async ( show:boolean ) => {
      'use server'
      await changeShowHeader( user.username, show );
      revalidateTag( 'edit' );
    }

    let updateAlpha = async( newAlpha:number ) => {
      'use server'
      if( currentSection ) {
        await changeBackgroundSection( currentSection.section_id, undefined, newAlpha );
        revalidateTag( 'edit' );
      }
    }

    let link = ( currentSection?.type == 'Home' ) ? `/resumes/${user.username}` : `/resumes/${user.username}/${currentSection?.section_id}`
    return ( 
      <div>
        <Link href={link}>
          <div className='flex content-center gap-2 cursor-pointer'>
            <EyeIcon className='stroke-slate-700 w-5'/> 
            <span className='inline-block text-black align-middle h-fit content-center place-self-center m-l-10'>
              Visual mode
            </span>
          </div>
        </Link>
        <div className=' w-full text-black mt-5 pt-1 border-t border-t-gray-300 '>
          <div className="grid grid-cols-2 grid-rows-4 grid-flow-col content-start">
            {
              <div className='w-full grid grid-cols-2 col-span-2 h-fit mb-2'>
                <CreateCustomColorButton label="Background" update={updateBg} defaul_value={defaultBgInput}/>
              </div>
            }
            {
              <div className='w-full grid grid-cols-2 col-span-2 h-fit mb-2'>
                 <InputValueButton 
                    defaultVal={rgb.a}
                    handlerValueChange={updateAlpha}
                    min={0}
                    step={0.1}
                    title='Opacity'
                  />
              </div>
            }

            {
            <div className='w-full grid grid-cols-2 col-span-2 h-fit content-center'>
              <CreateButtonNewSection customRevalidateTag={customRevalidateTag}  label={'New Section'}/>
            </div>
            }

            {
              ( currentSection?.type == 'Home') ? 
                <div className='w-full grid grid-cols-2 col-span-2 h-fit content-center'>
                <RadioButton label={'Show Home Header'} default_value={showHeader} update={updateShowHeader}/>
                </div>
              :<></>
            }

          </div>
        </div>
      </div>
    )
}
