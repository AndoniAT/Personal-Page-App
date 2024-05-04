import { SectionsNavBar } from "@/app/resumes/[username]/interfaces";
import { User } from "@/app/lib/definitions";
import { MyEditSideNav } from "./client/components";
import { revalidateTag } from "next/cache";
import { changeCssSection } from "@/app/lib/section/actions";
import { customRevalidateTag } from "@/app/lib/actions";
import { changeShowHeader } from "@/app/lib/user/actions";

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

    let updateBg = async ( newColor:string ) => {
      'use server'
      if( currentSection ) {
        let css_send = {
          ...css,
          backgroundColor: newColor
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

    return ( 
      <>
        {
          (currentSection) ?
            <MyEditSideNav
            currentSection={currentSection}
            customRevalidateTag={customRevalidateTag}
            updateBg={updateBg}
            showHeader={showHeader}
            updateShowHeader={updateShowHeader}
            >
              <></>
            </MyEditSideNav> 
          :
          <></>
        }
      </>
    )
}
