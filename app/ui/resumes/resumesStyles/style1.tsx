'use client'
import { UserClient, SectionsClient } from './interfaces'
import clsx from 'clsx';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation'

/**
 * Style 1 for home page
 * @returns 
 */
export function Style1Wrapper( 
  {
    data 
  } : Readonly<{
    data : {
        user: UserClient,
        section: SectionsClient
      }
    }>) {

    const user = data.user;
    const home = data.section;
    const hero = home.medias.find( m => m.ishero );

    return (
      <div style={{ backgroundColor: home.backgroundcolor }} className='w-full p-1'>
        <div className="w-full bg-gray-200 h-80">
                  <div className="grid grid-cols-1 gap-4 h-full">
                      <div className="grid grid-cols-12 h-full">
                          <div className="col-span-9 p-1 rounded-l-xl">
                            <div className={`h-full bg-gray-300 rounded-xl`}
                              style={ (hero?.url) ? { backgroundImage: `url(${hero?.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } : {} }
                            ></div>
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

export function Style1EditView( 
  {
    data 
  } : Readonly<{
    data : {
        user: UserClient,
        section: SectionsClient,
        putHomeHeroForUser: Function
      }
    }>) {

    const paramsUrl = useParams<{ username: string }>()
    const heroInputRef = useRef<HTMLInputElement>(null);
    const profileInputRef = useRef<HTMLInputElement>(null);
    const [ photoProfile, setPhotoProfile ] = useState<string|undefined>( undefined );

    const user = data.user;
    const home = data.section;
    const hero = home.medias.find( m => m.ishero );

    const putHomeHeroForUser = data.putHomeHeroForUser;

    const handleHeroClick = () => {
      if (heroInputRef.current) {
        heroInputRef.current.click();
      }
    };

    const handleProfileClick = () => {
      if (profileInputRef.current) {
        profileInputRef.current.click();
      }
    };

    const handleHeroChange = () => {
      if ( heroInputRef?.current?.files && heroInputRef.current.files.length > 0 ) {
        const formData = new FormData();
        formData.append( 'image', heroInputRef.current.files[ 0 ] );
        putHomeHeroForUser( user.username, formData );
      }
    };

    const handleProfileChange = async () => {
      if ( profileInputRef?.current?.files && profileInputRef.current.files.length > 0 ) {
        const formData = new FormData();
        formData.append( 'image', profileInputRef.current.files[ 0 ] );

        const response = await fetch(`/api/users/${paramsUrl.username}/profileImage`, {
          method: 'POST',
          body: formData
        });
        let { media_id } = await response.json();
        setPhotoProfile( media_id );
      }
    };

    useEffect(() => {
      (async () => {
        if( user.photo_profile_id ) {
          let result = await fetch(`/api/medias/${user.photo_profile_id}`);
          const data = await result.json();

          setPhotoProfile(data.url);
        }

      })()
    }, [ photoProfile ]);

    return (
      <div style={{ backgroundColor: home.backgroundcolor }} className='w-full p-1'>
        <div className="w-full bg-gray-200 h-fit">
                  <div className="grid grid-cols-1 gap-4 h-full">
                      <div className="grid grid-cols-12 h-full">
                          <div className="col-span-9 p-1 rounded-l-xl cursor-pointer hidden h-80 xl:block" onClick={handleHeroClick}>
                            <div className={`h-full bg-gray-300 rounded-xl`}
                              style={ (hero?.url) ? { backgroundImage: `url(${hero?.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } : {} }
                            >
                                <input
                                    ref={heroInputRef}
                                    type="file"
                                    id="image"
                                    name="image"
                                    required
                                    onChange={handleHeroChange}
                                    style={{ display: 'none' }}
                                />
                              </div>
                          </div>
                          <div className="col-span-3 rounded-r-xl cursor-pointer">
                              <div className='h-full p-1 w-full flex justify-center  items-center	'>
                                <div className={`bg-gray-300 rounded-full size-4/6 cursor-pointer`} onClick={handleProfileClick}
                                style={ (photoProfile) ? { backgroundImage: `url(${photoProfile})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } : {} }
                                >
                                    <input
                                          ref={profileInputRef}
                                          type="file"
                                          id="imageProfile"
                                          name="imageProfile"
                                          required
                                          onChange={handleProfileChange}
                                          style={{ display: 'none' }}
                                      />
                                </div>
                              </div>
                          </div>
                      </div>
                  </div>
        </div>
      </div>
    );
}
