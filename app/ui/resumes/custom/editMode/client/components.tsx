'use client'
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { showHeaderStyles } from "@/app/ui/cssComponents/styles";
import Image from "next/image";
import { MediaClient } from "../../interfaces";
import clsx from "clsx";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { LoadScreen } from "@/app/ui/components/loading-modal";

export function ShowHeader({
    hero,
    user_photo_profile
}:Readonly<{
    hero?:MediaClient,
    user_photo_profile?:MediaClient
}>) {
    const [heroPhoto, setHeroPhoto] = useState<string>('');
    const [photoProfile, setPhotoProfile] = useState<string>('');

    const paramsUrl = useParams<{ username: string }>()
    const heroInputRef = useRef<HTMLInputElement>(null);
    const profileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

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

    
    useEffect(() => {
        if (user_photo_profile?.url && !photoProfile) {
        setPhotoProfile(user_photo_profile?.url);
        }
    }, [photoProfile, user_photo_profile]);
    
    useEffect(() => {
        if (hero && !heroPhoto && hero.url) {
          setHeroPhoto(hero.url);
        }
      }, [heroPhoto, hero]);

    const handleHeroChange = async () => {
        if (hero?.update && heroInputRef?.current?.files && heroInputRef.current.files.length > 0) {
          const formData = new FormData();
          formData.append('image', heroInputRef.current.files[0]);
          setLoading(true);
          let url = await hero?.update(paramsUrl.username, formData)
          setHeroPhoto(url);
          setLoading(false);
        }
      };
    
      const handleProfileChange = async () => {
        if (user_photo_profile?.update && profileInputRef?.current?.files && profileInputRef.current.files.length > 0) {
          const formData = new FormData();
          formData.append('image', profileInputRef.current.files[0]);
          setLoading(true);
          let url = await user_photo_profile.update( paramsUrl.username, formData );
          setPhotoProfile(url);
          setLoading(false);
        }
      };

    return (
        <div className="w-full bg-gray-200 bg-opacity-50 h-fit p-5">
              <div className="grid grid-cols-1 gap-4 h-full">
                <div className="grid grid-cols-12 h-full">
                  { /* Hero */}
                  <div className={clsx({
                    [showHeaderStyles.custom.edit.hover]: !loading,
                    [showHeaderStyles.custom.hero.gral]: true,
                    [showHeaderStyles.custom.hero.withProfilePhoto]: true
                  })}
                    onClick={handleHeroClick}>
                    {
                      (heroPhoto) ?
                        <div className={showHeaderStyles.custom.hero.imageContainer}>
                          <Image
                            src={heroPhoto}
                            layout='fill'
                            alt="Hero"
                            className={showHeaderStyles.custom.hero.image}
                          />
                        </div>

                        : <div className={showHeaderStyles.custom.hero.imageContainer + ' border border-slate-950'}>
                        </div>
                    }
                    <input
                      ref={heroInputRef}
                      type="file"
                      id="imageHero"
                      name="imageHero"
                      required
                      onChange={handleHeroChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                  { /* Profile photo */}
                  {
                    (photoProfile) ?
                      <div className={showHeaderStyles.custom.profilePhoto.principalContainer}>
                        <div className={clsx({
                          ['cursor-pointer flex h-full w-full']: true,
                          [showHeaderStyles.custom.edit.hover]: true,
                          [showHeaderStyles.custom.status.loading]: loading
                        })}
                          onClick={handleProfileClick}>
                          <div className={showHeaderStyles.custom.profilePhoto.imageContainer}>
                            <Image
                              src={photoProfile}
                              width={500}
                              height={500}
                              alt="Profile"
                              className={showHeaderStyles.custom.profilePhoto.image}
                            />
                          </div>
                        </div>
                      </div>
                      :
                      <div className="col-span-3 rounded-r-xl cursor-pointer">
                        <div className='h-full p-1 w-full flex justify-center  items-center	'>
                          <div className={clsx({
                            [showHeaderStyles.custom.edit.hover]: !loading,
                            ['bg-gray-300 rounded-full size-4/6  border border-slate-950']: true,

                          })} onClick={handleProfileClick}>
                          </div>
                        </div>
                      </div>
                  }
                  {
                    <input
                      ref={profileInputRef}
                      type="file"
                      id="imageProfile"
                      name="imageProfile"
                      required
                      onChange={handleProfileChange}
                      style={{ display: 'none' }}
                    />
                  }
                </div>
              </div>
            </div>
    )
}

export function ButtonPlus({
  handler
}:Readonly<{
  handler:Function
}>) {
  const [ loading, setLoading ] = useState<boolean>(false);

  return ( 
    <>
      {
      (loading) ?
      <LoadScreen/>
      :
        <PlusCircleIcon 
                onClick={ async () => { 
                  setLoading( true );
                  await handler();
                  setLoading( false );
                }
                } 
                className={clsx({
                  ['h-20 cursor-pointer hover:scale-105 bg-blue-300 rounded-full border bg-slate-700 mt-5']:true
                })}
                />
      }
    </>
    
            )
}