"use client"

import { SectionsNavBar } from "@/app/resumes/[username]/interfaces";
import { ClipboardDocumentCheckIcon, HomeIcon, PencilSquareIcon, PlusCircleIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { CreateSectionModal } from "./modals";
import { useDebouncedCallback } from "use-debounce";
import { LoadScreen } from "@/app/ui/components/loading-modal";

interface LinkParam {
    name: string,
    href: string,
    icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;
    current: boolean
}

/**
 * Links on the top of the nav bar to go to Home app page
 * or Resumes page
 * @returns 
 */
export function MainLinks() {
  let path = usePathname();
    const mainLinksObj = [
        { name: 'Home', href: '/', icon: HomeIcon, current:(path == '/') },
        /*{ name: 'Resumes', href: '/resumes', icon: ClipboardDocumentCheckIcon, current:(path == '/resumes') }*/
      ];
    return mainLinksObj.map( link => makeLink( link ) );
}

/**
 * @param home : Section home
 * @returns {Link}
 */
export function CreateHomeLink( {
  home,
  current
}:{
  home:SectionsNavBar,
  current:boolean
} ) {
    let { username } = useParams();
    const homeObj = { name: home.name, href: `/resumes/${username}/`, icon: HomeIcon, current:current }
    let homeLink = makeLink( homeObj );
    return homeLink;
}
  
/**
 * 
 * @param sections : Collection of other sections for user
 * @returns {Link[]}
 */
export function CreateSectionsLink( {
  sections,
  currentSection
}:{
  sections:SectionsNavBar[],
  currentSection:SectionsNavBar
}) {
    //const pathname = usePathname();
    let { username } = useParams();
    const sectionsObj = sections.map( s => {
      let current = s.section_id == currentSection.section_id ? true : false;
      return { name: s.name, href: `/resumes/${username}/${s.section_id}`, icon: Squares2X2Icon, current:current }
    } );

    const sectionsLinks = sectionsObj.map( section => makeLink( section ) );
    return sectionsLinks;
}

/**
 * Get the username in path
 * @returns {string}
 */
export function GetUsernameSection() {
  let { username } = useParams();
  return username;
}

export function RadioButton({
  label,
  default_value,
  update
}: Readonly<{
  label:string,
  update:Function,
  default_value:boolean
}>) {
  let [ showHeader, setShowHeader ] = useState<boolean>(default_value);
  let [ click, setClick ] = useState<boolean>( false );

  let handler = async () => {
    setClick(true);
    await update( !showHeader );
    setShowHeader( !showHeader );
    setClick(false);
  }

  return (
    <>
      <div className="dark:text-white">
        <span>{label}</span>
      </div>
        <div className='text-center flex justify-left pl-3'>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer"/>
            <div 
            onClick={handler}
            className={clsx({
                            ["rounded-full peer"]:true,
                            ["relative w-11 h-5 peer-focus:outline-none"]:true,
                            ["peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400"]:true,
                            ["peer-checked:after:border-white after:content-['']"]:true,
                            ["dark:border-gray-600"]:true,
                            ["bg-blue-300"]:true,

                            ["dark:bg-slate-200 bg-gray-700"]:!showHeader,
                            ["peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"]:!showHeader && click,
                            ["after:absolute after:top-[2px] after:start-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all after:bg-slate-300 after:dark:bg-gray-700"]:!showHeader,
                            
                            ["peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full"]:showHeader && click,
                            ["after:absolute after:top-[2px] after:start after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all after:bg-slate-300 after:dark:bg-gray-700"]:showHeader,

                          })}
            ></div>
          </label>
        </div>
    </>
  )
}

export function CreateButtonNewSection({
  label,
  customRevalidateTag
}:Readonly<{
  label:string,
  customRevalidateTag:Function
}>) {
  const [ showCreateSection, setShowCreateSection] = useState<boolean>(false);

  return (
    <>
      <div className="flex">
        <div className="dark:text-white">
          <span>{label}</span>
        </div>
        <div className='text-center justify-left content-center pl-3'>
          <PlusCircleIcon onClick={() => { setShowCreateSection(true)}}  
          className={`
          h-6 cursor-pointer hover:scale-105 rounded-full
          border border-2 border-zinc-800
          
          text-gray-400 bg-gray-700 
          dark:text-zinc-800	dark:bg-slate-300
          `}>

          </PlusCircleIcon>
        </div>
      </div>
      {
        showCreateSection ?
        <CreateSectionModal customRevalidateTag={customRevalidateTag} cancel={() => {setShowCreateSection(false)}}></CreateSectionModal>
        :
        <></>
      }
    </>
  )
}

/**
 * Create the link for the button to edit profile
 * @returns {Link}
 */
export function EditUserPencilLink() {
  let { username } = useParams();
  return (
    <Link
        key={'edit profile'}
        href={`/${username}/editprofile/`}
    >
      <PencilSquareIcon className="w-6 ml-3"/>
  </Link>
  )
}

/**
 * Create the link with the information in element
 * @param link
 * @returns {Link} Element to put in the nav bar
 */
function makeLink( link:LinkParam ) {
    const LinkIcon = link.icon;
    const current = link.current ? 'bg-sky-300' : 'bg-sky-100'
    return (
      <Link
        key={link.name}
        href={link.href}
        className={clsx(
          'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium',
          `${current} text-blue-600`,
          'hover:bg-sky-100 hover:text-blue-600',
          'md:flex-none md:justify-start md:p-2 md:px-3',
          'border-solid border-2 border-slate-400',
          'transition ease-in-out delay-75 bg-blue-500 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300 '
        )}
      >
        <LinkIcon className="w-6" />
            <p className="block">{link.name}</p>
      </Link>
    );
  
}