import { BlockClient, SectionsClient, UserClient } from "../interfaces";
import clsx from "clsx";
import { BuildBlocks } from "./client/blocks";
import { ShowHeader } from "./client/components";
import CustomSection from "@/app/ui/components/custom-section";
import { SectionType } from "@/app/lib/definitions";

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
    const hero = section.medias.find(m => m.ishero);
    let blocks = section.blocks as BlockClient[];
  
    return (
      <CustomSection style={{ backgroundColor: section.backgroundcolor }} className={clsx({
        ['w-full min-h-screen']: true,
        ['h-fit pb-10']: true,
      })}>
        <div>
          {
            ( user.showheader && section.type == 'Home' as SectionType ) ?
            <ShowHeader heroUrl={hero?.url ?? undefined} photoProfile={user?.photo_profile?.url ?? undefined}/>
            : <></>
          }
          <div>
            { <BuildBlocks blocks={blocks}></BuildBlocks> }
          </div>
        </div>
      </CustomSection>
    );
  }