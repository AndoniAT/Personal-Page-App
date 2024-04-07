'use client'
import { SectionsNavBar } from "@/app/resumes/[username]/interfaces";
import { EyeIcon } from "@heroicons/react/24/outline";
import { User } from "next-auth";
import Link from "next/link";
import { useRef } from "react"

export default function EditModeNavBar(  {
    data 
  } : Readonly<{
    data : {
        username:string
        currentSection: SectionsNavBar|null
      }
    }>) 
    {
    let { currentSection } = data;
    const username = data?.username;

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
        </div>
      </div>
    )
}