'use client'
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { showHeaderStyles } from "@/app/ui/cssComponents/styles";
import Image from "next/image";
import clsx from "clsx";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { LoadScreen } from "@/app/ui/components/loading-modal";
import { UpdateSectionModal } from "./modals";
import { MyTooltip } from "@/app/ui/components/tooltip";
import { Gallery } from "../../../navBar/client/components";

export function ShowHeader({
    hero,
    user_photo_profile
}:Readonly<{
    hero:string,
    user_photo_profile:string
}>) {
    const { username } = useParams();
    const [heroPhoto, setHeroPhoto] = useState<string>(hero);
    const [photoProfile, setPhotoProfile] = useState<string>(user_photo_profile);
    const [ showGallery, setShowGallery ] = useState<boolean>(false);
    const paramsUrl = useParams<{ username: string }>()
    const [loading, setLoading] = useState<boolean>(false);
    const [ imageToChange, setImageToChange ] = useState<string|undefined>();

    const handleHeroClick = () => {
      setImageToChange('url_hero');
      setShowGallery(true);
    }

    const handleProfileClick = () => {
      setImageToChange('url_profile');
      setShowGallery(true);
    }

    const pickImage = async ( url:string ) => { 
      try {
        setLoading(true);
        const formData = new FormData();
          formData.append('url', url);
          formData.append('attr', imageToChange as string );
          await fetch(`/api/users/${username}/photo`, {
              method: 'PUT',
              body: formData
            } );
            
          if( imageToChange == 'url_hero') setHeroPhoto( url );
          if( imageToChange == 'url_profile') setPhotoProfile( url );
          setImageToChange( undefined );
          setLoading( false );
          setShowGallery( false );

        } catch( e ) {
        console.log( 'Error', e );
         setLoading(false);
      }
    }

    return (
        <>
          <div className="w-full bg-gray-200 bg-opacity-50 h-fit p-5">
                <div className="grid grid-cols-1 gap-4 h-full">
                  <div className="grid grid-cols-12 h-full">
                    { /* Hero */}
                    <div className={clsx({
                      [showHeaderStyles.custom.edit.hover]: !loading,
                      [showHeaderStyles.custom.hero.gral]: true,
                      [showHeaderStyles.custom.hero.withProfilePhoto]: true,
                      [showHeaderStyles.custom.status.loading]: loading
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
                  </div>
                </div>
          </div>
          {
            ( showGallery ) ? 
            <Gallery pick={pickImage} close={() => setShowGallery( false )}/>
            :
            <></>

          }
        </>
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
                className={
                  `h-20 cursor-pointer hover:scale-105 rounded-full mt-5 
                  border border-2 border-zinc-800	
                  bg-slate-300 text-zinc-800	
                  dark:bg-gray-700 dark:text-gray-400
                  `
                }
                />
      }
    </>
    
            )
}

export function NameEditSectionIcon({
  section,
  customRevalidateTag
}: Readonly<{
  section:{section_id:string, name:string},
  customRevalidateTag:Function
}>) {
  const [ editNameShow, setEditNameShow ] = useState<boolean>( false );

  return (
    <>
      {
        (editNameShow ) ?
        <UpdateSectionModal customRevalidateTag={customRevalidateTag} 
        section={section}
        cancel={() => { setEditNameShow( false )}}/>
        :
        <>
          <MyTooltip content='Edit name section' className='flex'>
            <PencilSquareIcon className="w-6 ml-3 cursor-pointer text-white"
              onClick={() => setEditNameShow(true)} 
            /> 
          </MyTooltip>
          <p className='m-3 flex items-center text-white'>
            { section.name}
          </p>
        </>
        
      }
    </>
  )
}