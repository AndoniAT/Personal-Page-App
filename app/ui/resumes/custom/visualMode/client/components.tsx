'use client'
import clsx from "clsx";
import Image from "next/image";
import { showHeaderStyles } from "@/app/ui/cssComponents/styles";
export function ShowHeader({
    photoProfile,
    heroUrl
}:Readonly<{
    photoProfile?:string,
    heroUrl?:string
}>){
    return (
<div className="w-full bg-gray-200 bg-opacity-50 h-fit p-5">
              <div className="grid grid-cols-1 gap-4 h-full">
                <div className="grid grid-cols-12 h-full">
                  { /* Hero */}
                  <div className={clsx({
                    [showHeaderStyles.custom.hero.gral]: true,
                    [showHeaderStyles.custom.hero.withProfilePhoto]: !!photoProfile,
                    [showHeaderStyles.custom.hero.withoutProfilePhoto]: !photoProfile
                  })}>
                    {
                      (heroUrl) ?
                        <div className={showHeaderStyles.custom.hero.imageContainer}>
                          <Image
                            src={heroUrl}
                            layout='fill'
                            alt="Hero"
                            className={showHeaderStyles.custom.hero.image}
                          />
                        </div>
  
                        : <div className={showHeaderStyles.custom.hero.noImage}></div>
                    }
                  </div>
  
  
                  { /* Profile photo */}
                  {
                    photoProfile ?
                      <div className={showHeaderStyles.custom.profilePhoto.principalContainer}>
                        <div className="flex h-full w-full">
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
                      <></>
                  }
                </div>
              </div>
            </div>

    )
}