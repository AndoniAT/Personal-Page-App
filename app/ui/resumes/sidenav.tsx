import Link from 'next/link';
import NavLinks from '@/app/ui/resumes/nav-links';
import { SectionsNavBarClient } from '@/app/resumes/[username]/interfaces';

import { Section } from '../../lib/definitions'; 

import AcmeLogo from '@/app/ui/acme-logo';

export default function SideNav( { sections } : { sections: Section[] } ) {

  if( !sections ) {
    return createSideNav( { home:null, sections:[]} )
  }

  const home = sections.find( s => s.type == 'Home' );
  if( !home ) throw new Error('No home page');

  const homeSend = constructSection( home );

  // Other sections
  sections = sections.filter( s => s.type != 'Home' ).filter( s => s.visible );
  const sectionsSend = sections.filter( s => s.visible ).map( s => constructSection( s ) );

  const paramsSend = {
    home: homeSend,
    sections: sectionsSend
  }

  return createSideNav( paramsSend )
}

/**
 * Prepare section to send to client
 * @param section 
 */
function constructSection( section:Section ) {
  return {
    id: section.section_id,
    name: section.name,
    created: section.created,
    type: section.type
  }
}

function createSideNav( paramsSend : {
  home: SectionsNavBarClient|null,
  sections: SectionsNavBarClient[]|[]
}) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-slate-800 p-4 md:h-30"
        href="/"
      >
        <div className="w-32 text-white md:w-60">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks params={paramsSend}/>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}