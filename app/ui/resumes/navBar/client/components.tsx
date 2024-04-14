"use client"

import { SectionsNavBar } from "@/app/resumes/[username]/interfaces";
import { ClipboardDocumentCheckIcon, HomeIcon, PencilSquareIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface LinkParam {
    name: string,
    href: string,
    icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;
}

/**
 * Links on the top of the nav bar to go to Home app page
 * or Resumes page
 * @returns 
 */
export function MainLinks() {
    const mainLinksObj = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Resumes', href: '/resumes', icon: ClipboardDocumentCheckIcon }
      ];
    return mainLinksObj.map( link => makeLink( link ) );
}

/**
 * @param home : Section home
 * @returns {Link}
 */
export function CreateHomeLink( {home}:{home:SectionsNavBar} ) {
    const pathname = usePathname();
    const homeObj = { name: home.name, href: `${pathname}/`, icon: HomeIcon }
    let homeLink = makeLink( homeObj );
    return homeLink;
}
  
/**
 * 
 * @param sections : Collection of other sections for user
 * @returns {Link[]}
 */
export function CreateSectionsLink( {sections}:{sections:SectionsNavBar[]}) {
    const pathname = usePathname();
  
    const sectionsObj = sections.map( s => {
      return { name: s.name, href: `${pathname}/${s.id}`, icon: Squares2X2Icon }
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
  
    return (
      <Link
        key={link.name}
        href={link.href}
        className={clsx(
          'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium',
          'bg-gray-50 bg-sky-100 text-blue-600',
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