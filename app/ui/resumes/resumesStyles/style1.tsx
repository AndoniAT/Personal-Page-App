'use client'

/*import { lusitana } from '@/app/ui/fonts';*/
import { UserClient, SectionsClient } from './interfaces'
import clsx from 'clsx';
import { useRef } from 'react';

/**
 * Style 1 for home page
 * @param param0 
 * @returns 
 */
export default function Style1Wrapper( 
  {
    data 
  } : Readonly<{
    data : {
        user: UserClient,
        section: SectionsClient,
        putHomeHeroForUser: Function
      }
    }>) {
    const heroInputRef = useRef<HTMLInputElement>(null);
    const user = data.user;
    const home = data.section;
    const hero = home.medias.find( m => m.ishero );

    const putHomeHeroForUser = data.putHomeHeroForUser;

    const handleHeroClick = () => {
      if (heroInputRef.current) {
        heroInputRef.current.click();
      }
    };

    const handleChange = () => {
      if ( heroInputRef?.current?.files && heroInputRef.current.files.length > 0 ) {
        const formData = new FormData();
        formData.append( 'image', heroInputRef.current.files[ 0 ] );
        putHomeHeroForUser( user.username, formData );
      }
    };

    return (
      <div style={{ backgroundColor: home.backgroundcolor }} className='w-full p-1'>
        <div className="w-full bg-gray-200 h-80">
                  <div className="grid grid-cols-1 gap-4 h-full">
                      <div className="grid grid-cols-12 h-full">
                          <div className="col-span-9 p-1 rounded-l-xl" onClick={handleHeroClick}
                          >
                            <div className={`h-full bg-gray-300 rounded-xl`}
                              style={{ backgroundImage: `url(${hero?.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } }
                            >
                                <input
                                    ref={heroInputRef}
                                    type="file"
                                    id="image"
                                    name="image"
                                    required
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                />
                              </div>
                          </div>
                        <div className="col-span-3 p-10 rounded-r-xl">
                          <div className={`bg-gray-300 rounded-full h-full`}>
                          </div>
                        </div>
                      </div>
                  </div>
        </div>
      </div>
    );
  }
  /*<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-black`}
  style={{ backgroundColor: home.backgroundcolor }}>

    Load style1
  </h1>*/