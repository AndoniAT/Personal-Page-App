import { SectionsNavBar } from "@/app/resumes/[username]/interfaces";
import { EyeIcon  } from "@heroicons/react/24/outline";
import Link from "next/link";
import { User } from "@/app/lib/definitions";
import { CreateButtonNewSection, RadioButton } from "./client/components";
import { revalidateTag } from "next/cache";
import { changeCssSection } from "@/app/lib/section/actions";
import { customRevalidateTag } from "@/app/lib/actions";
import { changeShowHeader } from "@/app/lib/user/actions";
import { ColorButtons } from "../custom/editMode/client/customButtons";

export default function EditModeNavBar(  {
    data 
  } : Readonly<{
    data : {
        user: User,
        currentSection?: SectionsNavBar,
      }
    }>) 
    {
    let { currentSection, user } = data;
    let css = currentSection?.css ? JSON.parse( currentSection.css ) : {};
    let background = css.backgoroundColor;


    let updateBg = async ( newColor:string ) => {
      'use server'
      if( currentSection ) {
        let css_send = {
          ...css,
          backgoroundColor: newColor
        }

        await changeCssSection( currentSection.section_id, JSON.stringify( css_send ) )
        revalidateTag( 'edit' );
      }
    }

    let showHeader = user.showheader;

    let updateShowHeader = async ( show:boolean ) => {
      'use server'
      await changeShowHeader( user.username, show );
      revalidateTag( 'edit' );
    }

    let link = ( currentSection?.ishome ) ? `/resumes/${user.username}` : `/resumes/${user.username}/${currentSection?.section_id}`

    return ( 
      <div>
        <Link href={link}>
          <div className='flex content-center gap-2 cursor-pointer'>
            <EyeIcon className='w-5 stroke-slate-700 dark:stroke-white'/> 
            <span className={`
              inline-block align-middle h-fit content-center place-self-center m-l-10
              text-black
              dark:text-white
              `}>
              Visual mode
            </span>
          </div>
        </Link>
        <div className=' w-full mt-5 pt-1 border-t border-t-gray-300 '>
          <div className="flex flex-col">
            {
              <div className='w-full grid grid-cols-1 col-span-2 h-fit mb-2'>
                
                <ColorButtons
                title='Background'
                defaultColor={background}
                handleColorBgChange={updateBg}
                showAlpha={true}
                showTransparency={true}
                vertical={true}
                />
              </div>
            }

            {
            <div className='w-full grid grid-cols-2 col-span-2 h-fit content-center mt-3'>
              <CreateButtonNewSection customRevalidateTag={customRevalidateTag}  label={'New Section'}/>
            </div>
            }

            {
              
              ( currentSection?.ishome ) ? 
                <div className='w-full grid grid-cols-2 col-span-2 h-fit content-center mt-3'>
                <RadioButton label={'Show Home Header'} default_value={showHeader} update={updateShowHeader}/>
                </div>
              :<></>
            }

          </div>
        </div>
      </div>
    )
}
