import { BlockClient, SectionsClient, UserClient } from "../interfaces";
import clsx from "clsx";
import { BuildBlocks, VisualResponsive } from "./client/blocks";
import { ShowHeader } from "./client/components";
import CustomSection from "@/app/ui/components/custom-section";

/**
 * Style 1 for home page
 * @returns 
 */
export default function CustomView(
    {
      data
    }: Readonly<{
      data: {
        user: UserClient,
        section: SectionsClient
      }
    }>) {
  
    const user = data.user;
    const section = data.section;
    let css_string = section.css;
    let css = JSON.parse( css_string );
    let backgroundColor = css.backgroundColor ?? 'rgba( 0, 0, 0, 0)';

    return (
      <CustomSection style={{ backgroundColor: backgroundColor }} className={clsx({
        ['w-full min-h-screen']: true,
        ['h-fit pb-10']: true,
      })}>
        <div>
          {
            ( user.showheader && section.ishome ) ?
            <ShowHeader heroUrl={user.url_hero} photoProfile={user.url_profile}/>
            : <></>
          }
          <div>
            { <VisualResponsive blocks={section.blocks}></VisualResponsive> }
          </div>
        </div>
      </CustomSection>
    );
  }