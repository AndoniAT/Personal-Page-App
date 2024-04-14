'use client'
import { SectionsNavBar } from "@/app/resumes/[username]/interfaces";
import { EyeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRef, useState } from "react"
import { CreateSectionModal } from "./modals";

export default function EditModeNavBar(  {
    data 
  } : Readonly<{
    data : {
        username:string
        currentSection: SectionsNavBar|null,
        customRevalidateTag:Function
      }
    }>) 
    {
    let { currentSection } = data;
    const username = data?.username;
    const [ showCreateSection, setShowCreateSection] = useState<boolean>(false);

    const colorInputRef = useRef<HTMLInputElement>(null);

    const handleColorClick = () => {
      if (colorInputRef.current) {
        colorInputRef.current.click();
      }
    };

    const handleColorChange = async () => {
      if ( colorInputRef?.current && currentSection?.background?.update && username ) {
        let newColor = colorInputRef.current.value;
        currentSection.background.update( currentSection.id, newColor, username )
      }
    };

    return ( 
      <div>
        <Link href={`/resumes/${username}`}>
          <div className='flex content-center gap-2 cursor-pointer'>
            <EyeIcon className='stroke-slate-700 w-5'/> 
            <span className='inline-block text-black align-middle h-fit content-center place-self-center m-l-10'>
              Visual mode
            </span>
          </div>
        </Link>
        <div className=' w-full text-black mt-5 pt-1 border-t border-t-gray-300 '>
          <div className='w-full flex'>
            <span>Background</span>
            <div
              style={{ backgroundColor: currentSection ? currentSection.background.color : '' }} 
              className='h-5 w-5 border border-gray-600 self-center rounded-full ml-2' onClick={handleColorClick}></div>
            <input 
            ref={colorInputRef}
            type="color"
            id='colorBg'
            name="colorBg"
            onChange={handleColorChange}
            value={currentSection ? currentSection.background.color : 0}
            className='w-5 -ml-5 invisible'
            />
          </div>

          <div className='w-full flex mt-5'>
            <span>New Section</span>
              <div className='text-center flex justify-center'>
                <PlusCircleIcon onClick={() => { setShowCreateSection(true)}}  className='h-5 cursor-pointer stroke-white hover:scale-105 bg-blue-300 rounded-full border bg-slate-700 mt-1 ml-3'></PlusCircleIcon>
              </div>
          </div>

          { 
            showCreateSection ?
            <CreateSectionModal customRevalidateTag={data.customRevalidateTag} cancel={() => {setShowCreateSection(false)}}></CreateSectionModal>
            :
            <></>
          }
        </div>
      </div>
    )
}