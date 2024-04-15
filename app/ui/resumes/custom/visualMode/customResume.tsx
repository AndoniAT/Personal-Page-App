import { BlockClient, SectionsClient, UserClient } from "../interfaces";
import clsx from "clsx";
import { BuildBlocks } from "./client/blocks";
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
    const home = data.section;
    const hero = home.medias.find(m => m.ishero);
    let blocks = home.blocks as BlockClient[];
  
    return (
      <CustomSection style={{ backgroundColor: home.backgroundcolor }} className={clsx({
        ['w-full min-h-screen']: true,
        ['h-fit pb-10']: true,
      })}>
        <div>
          {
            ( user.showheader ) ?
            <ShowHeader heroUrl={hero?.url || undefined} photoProfile={user?.photo_profile?.url || undefined}/>
            : <></>
          }
          <div className='p-5'>
            { <BuildBlocks blocks={blocks}></BuildBlocks> }
          </div>
        </div>
      </CustomSection>
    );
  }